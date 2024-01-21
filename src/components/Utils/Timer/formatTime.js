/**
 * Convierte una cantidad de segundos en un formato legible de tiempo.
 * @param {number} seconds - La cantidad de segundos a formatear.
 * @returns {string} - Una cadena formateada representando el tiempo en horas, minutos y segundos.
 */
const formatTime = (seconds) => {
  // Calcula las horas, minutos y segundos
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = '';

  // Agrega las horas al resultado si son mayores que 0
  if (hours > 0) {
    formattedTime += `${hours} ${hours === 1 ? 'h' : 'h'} `;
  }

  // Agrega los minutos al resultado si son mayores que 0
  if (minutes > 0) {
    formattedTime += `${minutes} ${minutes === 1 ? 'm' : 'm'} `;
  }

  // Agrega los segundos al resultado si son mayores que 0
  if (remainingSeconds > 0) {
    formattedTime += `${remainingSeconds} ${remainingSeconds === 1 ? 's' : 's'}`;
  }

  // Si no se agregaron horas, minutos ni segundos, establece el tiempo como "0 segundos"
  if (formattedTime.trim() === '') {
    formattedTime = '0 s';
  }

  return formattedTime.trim();
};


/**
 * Agrupa las tareas completadas por día de la semana (este elemento nos auida a poder agregar en un arreglo las tareas que se realizaron en un dia para poder realizar una grafica de ellas).
 * @param {Array} tasks - Un array de tareas completadas.
 * @returns {Object} - Un objeto que contiene listas de tareas agrupadas por día de la semana.
 */
const handleTaskWeekWork = (tasks) => {
  // objeto que almacena las tareas finalizadas en una arreglo de acuerdo a su dia de la semana
  const tasksByDayOfWeek = {
    domingo: [],
    lunes: [],
    martes: [],
    miércoles: [],
    jueves: [],
    viernes: [],
    sábado: [],
  };

  // recorrecmo las tareas con un for
  tasks.forEach(task => {
    // en caso de que esa tarea ya este finalizada podremos asignarla ya a un dia de la semana
    if (task.timeFinished) {
      // Convierte la cadena de fecha en un array de números correspondientes a año, mes y día.
      const dateArray = task.timeFinished.split('-').map(Number);
      //Convierte el array de fecha en un objeto de fecha formateado.
      const formattedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
      //Obtiene el día de la semana en español a partir del objeto de fecha.
      const dayOfWeek = formattedDate.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();

      // Asegura que el dayOfWeek esté en el formato correcto
      if (tasksByDayOfWeek[dayOfWeek] !== undefined) {
        tasksByDayOfWeek[dayOfWeek].push(task);
      }
    }
  });

  return tasksByDayOfWeek;
};

export { formatTime, handleTaskWeekWork };
