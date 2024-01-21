import React, { useReducer, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlay, faStop, faUndo } from '@fortawesome/free-solid-svg-icons';
import { formatTime } from '../../../Utils/Timer/formatTime';
import { ActionTypes, taskReducer } from '../../../Utils/ReproducitonTask/RepTask';
import { fetchPATCHapi } from '../../../Utils/API/fetchAPi';
import './task.css';

/**
 * Componente Task que representa una tarea con temporizador.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal de la tarea está abierto.
 * @param {Function} props.onClose - Función para cerrar el modal de la tarea.
 * @param {Object} props.task - Objeto que contiene los detalles de la tarea.
 */
const Task = ({ isOpen, onClose, task }) => {
  // Desestructuración de las propiedades de la tarea.
  const { id, title, description, time, color, finished, timeRemaining } = task;

  // Referencia al botón de finalización para simular un clic.
  const finishButtonRef = useRef();

  // Estado del componente gestionado por useReducer.
  const [state, dispatch] = useReducer(taskReducer, {
    timer: time * 60,
    isActive: false,
    isCompleted: false,
  });

  /**
   * Efecto para resetear el temporizador cuando la tarea cambia o el modal se abre.
   */
  useEffect(() => {
    dispatch({ type: ActionTypes.RESET, payload: time * 60 });
  }, [isOpen, time]);

  /**
   * Efecto para manejar la lógica del temporizador.
   */
  useEffect(() => {
    // Inicialización de una variable para almacenar el identificador del intervalo del temporizador.
    let interval;

    // Verifica si el temporizador está activo y hay tiempo restante.
    if (state.isActive && state.timer > 0) {
      // Establece un intervalo que disminuirá el tiempo restante cada segundo.
      interval = setInterval(() => {
        // Despacha una acción para actualizar el temporizador.
        dispatch({ type: ActionTypes.SET_TIMER, payload: state.timer - 1 });
      }, 1000);
    } else if (state.timer === 0) {
      // Si el temporizador llega a cero, despacha una acción para marcar la tarea como completada.
      dispatch({ type: ActionTypes.SET_COMPLETED });
      // Simula un clic en el botón de finalización usando la referencia del botón.
      finishButtonRef.current.click();
    } else {
      // Si el temporizador no está activo o ya no hay tiempo restante, detiene el intervalo.
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state.isActive, state.timer]);

  /**
   * Maneja el inicio del temporizador.
   */
  const handlePlay = () => {
    dispatch({ type: ActionTypes.TOGGLE_ACTIVE });
  };

  /**
   * Maneja la pausa/detención del temporizador.
   */
  const handleStop = () => {
    dispatch({ type: ActionTypes.TOGGLE_ACTIVE });
  };

  /**
   * Maneja la reinicialización del temporizador.
   */
  const handleReset = () => {
    dispatch({ type: ActionTypes.RESET, payload: time * 60 });
  };

  /**
   * Maneja la finalización de la tarea.
   */
  const handleFinish = async () => {
    // Obtiene la fecha actual para registrarla como tiempo final.
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    try {
      // Realiza una solicitud PATCH para marcar la tarea como finalizada.
      await fetchPATCHapi(`https://api-productividad-task-production-8231.up.railway.app/api/${id}`, {
        finished: true,
        timeFinished: formattedDate,
        timeRemaining: state.timer,
      });
      // Cierra el modal y recarga la página para reflejar los cambios.
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al finalizar la tarea:', error);
    }
  };

  // Si el modal no está abierto, no renderiza nada.
  if (!isOpen) {
    return null;
  }

  return (
    <div className={'modal-overlay '}>
      <div className={'modal-content '} onClick={(e) => e.stopPropagation()} style={{ backgroundColor: color }}>
        <div className="content-text">
          <h2 className={'title_task'}>📝{title}</h2>
          <FontAwesomeIcon icon={faTimes} onClick={onClose} className={'icon-close-container'} />
        </div>
        <div className='conteiner-description'>
          <p className={'description-task-container'}>{description}</p>
        </div>

        <div className="timer-controls">
          {!finished ? (
            <>
              <button className={'play'} onClick={handlePlay}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button className={'stop'} onClick={handleStop}>
                <FontAwesomeIcon icon={faStop} />
              </button>
              <button className={'reset'} onClick={handleReset}>
                <FontAwesomeIcon icon={faUndo} />
              </button>
            </>
          ) : (
            <>
              <p>¡Ya realizaste esta tarea! 🥳</p>
            </>
          )}
        </div>

        <div className={'container-times'}>
          <p className={'title-task-container'}>Tiempo: {formatTime(state.timer)}</p>
          {finished && (
            <p className={'title-task-container'}>
              Tiempo Final: {formatTime(timeRemaining)}
            </p>
          )}
        </div>

        {finished ? (
          <button ref={finishButtonRef} className={'completed'} onClick={handleFinish} hidden={true}>
            Finalizar
          </button>
        ) : (
          <button ref={finishButtonRef} className={'completed'} onClick={handleFinish}>
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
