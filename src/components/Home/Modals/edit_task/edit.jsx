import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { fetchPATCHapi } from "../../../Utils/API/fetchAPi";

function Edit({ isOpen, onClose, task }) {
  const { id, title, description, timerTask } = task;
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const [customTime, setCustomTime] = useState({ hours: 0, minutes: 0 });
  const [selectedTimeOption, setSelectedTimeOption] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleCustomTimeChange = (field, value) => {
    setCustomTime((prevCustomTime) => ({
      ...prevCustomTime,
      [field]: parseInt(value) || 0,
    }));
    setSelectedTimeOption(null);
  };

  const handleOptionChange = (value) => {
    setSelectedTimeOption(value);
    setCustomTime({ hours: 0, minutes: 0 });
  };

  const handleModalClick = async (e) => {
    e.stopPropagation();

    if (!descriptionEdit || (!selectedTimeOption && (customTime.hours === 0 && customTime.minutes === 0))) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      setEditing(true);

      let updatedData = {};

      if (descriptionEdit !== description) {
        updatedData.description = descriptionEdit;
      }

      if (selectedTimeOption !== null) {
        updatedData.time = parseInt(selectedTimeOption);
      } else {
        const totalTime = customTime.hours * 60 + customTime.minutes;
        if (totalTime !== timerTask) {
          updatedData.time = totalTime;
        }
      }

      if (Object.keys(updatedData).length > 0) {
        const data = await fetchPATCHapi(`https://api-productividad-task-production-8231.up.railway.app/api/${id}`, {
          ...updatedData,
          finished: false,
        });

        console.log('Tarea editada con éxito:', data);
        onClose();
        window.location.reload();
      } else {
        console.log('No se realizaron cambios en la tarea.');
      }
    } catch (error) {
      console.error('Error al editar la tarea:', error);
    } finally {
      setEditing(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={'modal-content'} >
        <div className="content-text">
          <h2 className="edit-task-titke">{editing ? 'Editando tarea...' : `📝${title}`}</h2>
          <FontAwesomeIcon icon={faTimes} onClick={onClose} className={'icon-close-container'} />
        </div>
        <div className={'form-post-task'}>
          <div className={'label-input'}>
            <label>Descripción</label>
            <textarea
              type="text"
              placeholder={'Ingresa la descripción de tu tarea'}
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
              required={true}
            />
          </div>
          <div className={'label-input'}>
            <label>Tiempo</label>
          </div>
          <div className="time-options">
            <label>
              <input
                type="radio"
                name="time"
                value="30"
                checked={selectedTimeOption === '30'}
                onChange={() => handleOptionChange('30')}
              />
              30 min
            </label>
            <label>
              <input
                type="radio"
                name="time"
                value="45"
                checked={selectedTimeOption === '45'}
                onChange={() => handleOptionChange('45')}
              />
              45 min
            </label>
            <label>
              <input
                type="radio"
                name="time"
                value="60"
                checked={selectedTimeOption === '60'}
                onChange={() => handleOptionChange('60')}
              />
              1 hora
            </label>
            <label>
              <input
                type="radio"
                name="time"
                value="custom"
                checked={selectedTimeOption === null}
                onChange={() => handleOptionChange(null)}
              />
              Personalizado
            </label>
          </div>
          {selectedTimeOption === null && (
            <div className="custom-time-inputs">
              <label>
                Horas:
                <input
                  type="number"
                  min="1"
                  max="23"
                  value={customTime.hours}
                  onChange={(e) => handleCustomTimeChange('hours', e.target.value)}
                />
              </label>
              <label>
                Minutos:
                <input
                  type="number"
                  min="1"
                  max="59"
                  value={customTime.minutes}
                  onChange={(e) => handleCustomTimeChange('minutes', e.target.value)}
                />
              </label>
            </div>
          )}
          <button className={'button-add'} onClick={handleModalClick}>
            Editar Tarea
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
