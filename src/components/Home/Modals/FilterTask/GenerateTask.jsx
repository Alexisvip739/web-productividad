/**
 * Genera un tiempo aleatorio en minutos entre 1 y 120 (2 hroas).
 *
 * @returns {number} - Número aleatorio entre 1 y 120.(2horas)
 */
const generateRandomTime = () => {
  return Math.floor(Math.random() * 120) + 1;
};

/**
 * Crea un objeto que representa una tarea aleatoria.
 *
 * @param {number} index - Índice de la tarea.
 * @returns {Object} - Objeto que representa la tarea.
 * @property {number} id - Identificador único de la tarea.
 * @property {string} title - Título de la tarea.
 * @property {string} description - Descripción de la tarea.
 * @property {boolean} finished - Indica si la tarea está completada.
 * @property {number} initialTime - Tiempo inicial de la tarea en minutos.
 * @property {number} completionTime - Tiempo de finalización de la tarea en minutos.
 */
const createTask = (index) => {
  const time = generateRandomTime();
  return {
    id: index + 1,
    title: `Tarea ${index + 1}`,
    description: `Descripción de la tarea ${index + 1}`,
    finished: true,
    initialTime: time,
    completionTime: time - Math.floor(Math.random() * time),
  };
};

export { generateRandomTime, createTask };
