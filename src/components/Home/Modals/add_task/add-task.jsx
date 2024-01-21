import React, { useState } from 'react';
import '../../../../styles/Modals/add-task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { fetchPOSTapi } from '../../../Utils/API/fetchAPi';

/**
 * Componente ModalAdd:
 * Modal para agregar nuevas tareas.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element|null} - El elemento React renderizado o null si no está abierto.
 */
function ModalAdd({ isOpen, onClose }) {
  // Estados para manejar el formulario
  const [title, setTitle] = useState(''); // Estado para el título de la tarea
  const [description, setDescription] = useState(''); // Estado para la descripción de la tarea
  const [customTime, setCustomTime] = useState({ hours: 0, minutes: 0 }); // Estado para el tiempo personalizado de la tarea
  const [selectedTimeOption, setSelectedTimeOption] = useState(null); // Estado para la opción de tiempo seleccionada en el formulario
  const [loading, setLoading] = useState(false);

  // Función para agregar una nueva tarea
  const handleAddTask = async () => {
    // Validaciones
    if (!title || !description || (!(selectedTimeOption) && (customTime.hours === 0 && customTime.minutes === 0))) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    // nos regresa el tiempo minutos (después cuando mostramos el tiempo en el home lo convertimos en horas si es que el tiempo es de 60min para adelante)
    const totalTime = selectedTimeOption ? parseInt(selectedTimeOption) : customTime.hours * 60 + customTime.minutes;

    if (totalTime > 120) {
      alert('El tiempo de la tarea no puede superar las dos horas.');
      return;
    }

    try {
      setLoading(true);
      // Enviar la solicitud POST para agregar la tarea
      await fetchPOSTapi('https://api-productividad-task-production-8231.up.railway.app/api', {
        title,
        description,
        time: totalTime,
        // como solo se agregó entonces aún no está finalizada
        finished: false,
      });
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: La solicitud ha tardado más de 3 segundos')), 3000);
      });
      onClose();
      window.location.reload(); // Recargar la página para reflejar los cambios
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en las opciones de tiempo
  const handleOptionChange = (value) => {
    setSelectedTimeOption(value);
    setCustomTime({ hours: 0, minutes: 0 });
  };

  // Función para manejar cambios en el tiempo personalizado
  const handleCustomTimeChange = (field, value) => {
    setCustomTime((prevCustomTime) => ({
      ...prevCustomTime,
      [field]: parseInt(value) || 0,
    }));
    setSelectedTimeOption(null); // Reinicia la opción de tiempo seleccionada
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={'modal-content'} onClick={(e) => e.stopPropagation()}>
        <div className="content-text">
          <h2>
            {loading ? (
              <span>
                Agregando tu tarea
                <span className="loading-dots">...</span>
              </span>
            ) : (
              'Agrega tu nueva tarea 📝'
            )}
          </h2>
          <FontAwesomeIcon icon={faTimes} onClick={onClose} className={'icon-close-container'} />
        </div>
        <div className={'form-post-task'}>
          {/* Formulario para agregar tarea */}
          <div className={'label-input'}>
            <label>Titulo</label>
            <input
              type="text"
              placeholder={'Ingresa el título de tu tarea'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
          </div>
          <div className={'label-input'}>
            <label>Descripción</label>
            <textarea
              type="text"
              placeholder={'Ingresa la descripción de tu tarea'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
          </div>
          <div className={'label-input'}>
            <label>Tiempo</label>
          </div>
          <div className="time-options">
            {/* Opciones de tiempo */}
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
          {(selectedTimeOption === 'custom' || selectedTimeOption === null) && (
            <div className="custom-time-inputs">
              <label>
                Horas:
                <input
                  type="number"
                  min="0"
                  max="2"
                  value={customTime.hours}
                  onChange={(e) => handleCustomTimeChange('hours', e.target.value)}
                />
              </label>
              <label>
                Minutos:
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customTime.minutes}
                  onChange={(e) => handleCustomTimeChange('minutes', e.target.value)}
                />
              </label>
            </div>
          )}
          {/* Botón para agregar tarea */}
          <button className={'button-add'} onClick={handleAddTask}>
            Agregar Tarea
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAdd;
