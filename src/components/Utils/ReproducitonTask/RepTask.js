/**
 * ActionTypes: Un objeto que contiene tipos de acciones para la reproduccion  de tareas.
 * Se utilizan para identificar el tipo de acción en las funciones que actualizan el estado al momento
 * de realizar una tarea.
 */
const ActionTypes = {
  SET_TIMER: 'SET_TIMER',
  TOGGLE_ACTIVE: 'TOGGLE_ACTIVE',
  SET_COMPLETED: 'SET_COMPLETED',
  RESET: 'RESET',
};

/**
 * taskReducer: Un reducer que maneja las acciones y actualiza el estado de la tarea en
 * @param {Object} state - El estado actual de la tarea.
 * @param {Object} action - La acción que se está ejecutando.
 * @returns {Object} - El nuevo estado de la tarea después de aplicar la acción.
 */
const taskReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TIMER:
      // Establece el temporizador de la tarea con el valor proporcionado en la acción.
      return { ...state, timer: action.payload };
    case ActionTypes.TOGGLE_ACTIVE:
      // Cambia el estado de activación de la tarea (activo/inactivo).
      return { ...state, isActive: !state.isActive };
    case ActionTypes.SET_COMPLETED:
      // Marca la tarea como completada.
      return { ...state, isCompleted: true };
    case ActionTypes.RESET:
      // Reinicia el estado de la tarea con los valores proporcionados en la acción.
      return { ...state, isActive: false, timer: action.payload, isCompleted: false };
    default:
      // Devuelve el estado sin cambios si la acción no es reconocida.
      return state;
  }
};

// Exporta el objeto ActionTypes y la función taskReducer para su uso en otros módulos.
export { ActionTypes, taskReducer };
