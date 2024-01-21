import React, { useEffect, useState } from "react";
import { handleTaskWeekWork } from '../Utils/Timer/formatTime';
import { fetchGET } from "../Utils/API/fetchAPi";
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';
import '../../styles/Grafico.css';

/**
 * Componente Grafico:
 * Componente que muestra un gráfico de tareas finalizadas en la última semana, agrupadas por día.
 * Utiliza la librería Victory para visualizar el gráfico.
 * @returns {JSX.Element} - El elemento React renderizado.
 */
function Grafico() {
  // Estado para almacenar las tareas agrupadas por día de la semana
  const [tasksByDayOfWeek, setTasksByDayOfWeek] = useState({});

  // Días de la semana en orden
  const allDaysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  // Obtener datos de tareas finalizadas al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGET('https://api-productividad-task-production-8231.up.railway.app/api');
        // Filtrar las tareas finalizadas
        const finishedTasks = result.tasks.filter(task => task.finished === true);
        // Agrupar tareas por día de la semana
        const resultWeek = handleTaskWeekWork(finishedTasks);
        setTasksByDayOfWeek(resultWeek);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  /**
   * Función para obtener el formato de las etiquetas del eje x.
   * @param {string} day - Día de la semana.
   * @param {number} index - Índice del día.
   * @returns {string} - El formato de las etiquetas del eje x.
   */
  const getTickFormat = (day, index) => {
    if (window.innerWidth <= 420) {
      return day.substring(0, 2); // cuando estamos en web se muestra toda la palabra (lunes), cuando sea responsive se mostrara solo (lu...)
    }
    return day;
  };

  // Calcular valores del eje y automáticamente
  //Nos da el total de tareas que se hicieron en el dia 
  const maxTasks = Object.values(tasksByDayOfWeek).reduce((max, dayTasks) => Math.max(max, dayTasks.length), 0);
  const tickValues = Array.from({ length: maxTasks }, (_, index) => 1 + index);

  return (
    <div className={'container-grafic'}>
      <h2>Historias de Tareas en la última semana</h2>
      {/* Componente de gráfico de barras de Victory  */}
      { /*longitudes para que la tabla se haga responsiva */}
      <VictoryChart
        width={window.innerWidth > 768 ? 1500 : window.innerWidth - 20}
        height={window.innerWidth > 768 ? 600 : 300}
        domainPadding={{ x: 60, y: 10 }}
        responsive={true}
      >
        {/* Eje x: Días de la semana */}
        <VictoryAxis
          tickValues={allDaysOfWeek}
          label={"Días de la semana"}
          style={{
            tickLabels: { padding: 10, fontSize: window.innerWidth > 768 ? 12 : 8 },
          }}
          tickFormat={(tick, index) => getTickFormat(tick, index)}
        />
        {/* Eje y: Tareas finalizadas */}
        <VictoryAxis
          dependentAxis
          label={"Tareas finalizadas"}
          style={{
            tickLabels: { padding: -10, fontSize: window.innerWidth > 768 ? 12 : 8 },
            axisLabel: { marginTop: 19, fontSize: window.innerWidth > 768 ? 12 : 8 },
          }}
          tickValues={tickValues}
        />
        {/* Barras de tareas finalizadas por día */}
        {Object.entries(tasksByDayOfWeek).map(([day, dayTasks]) => (
          dayTasks.length > 0 && (
            <VictoryBar
              key={day}
              data={dayTasks.map((task, index) => ({ x: day, y: 1 + index }))}
              style={{
                data: { stroke: "blue" },
                parent: { border: "1px solid #ccc" },
              }}
            />
          )
        ))}
      </VictoryChart>
    </div>
  );
}

export default Grafico;
