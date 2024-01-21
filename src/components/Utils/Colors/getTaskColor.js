/**
 * Devuelve un color basado en el índice proporcionado, utilizando una lista predefinida de variables de color.
 * Estos colores ya estan definidos en el app.css
 * 
 * @param {number} index - El índice que determina el color a obtener.
 * @returns {string} - Una cadena que representa el color en formato CSS variable.
 */
function getTaskColor(index) {
  // Lista de variables de color predefinidas
  const colors = [
    '--color-random-1',
    '--color-random-2',
    '--color-random-3',
    '--color-random-4',
  ];

  // Devuelve una cadena que representa el color utilizando la variable CSS correspondiente al índice
  return `var(${colors[index % colors.length]})`;
}

// Exporta la función para su uso en otros módulos
export default getTaskColor;
