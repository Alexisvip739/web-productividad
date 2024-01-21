import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createTask } from './GenerateTask'
import '../../../../styles/Modals/FilterTime.css'
/**
 * Componente para el modal de generación de tareas aleatorias.
 *
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element|null} - Elemento JSX que representa el modal de generación de tareas aleatorias.
 */
export const FilterTIme = ({ isOpen, onClose }) => {
  // Crea un array de 50 tareas aleatorias utilizando la función createTask.
  const tasks = Array.from({ length: 50 }, (_, index) => createTask(index));

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={'modal-generate modal-content'} onClick={(e) => e.stopPropagation()}>
        <div className="content-text">
          <h2>Listado de Tareas Random 📝</h2>
          <FontAwesomeIcon icon={faTimes} className={'icon-close-container'} onClick={onClose} />
        </div>
        <div className='tasks'>
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Tiempo Inicial: {task.initialTime} minutos</p>
              <p>Tiempo de Completación: {task.completionTime} minutos</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTIme;