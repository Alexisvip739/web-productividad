import React, { useEffect, useState } from "react";
import getTaskColor from '../Utils/Colors/getTaskColor';
import { fetchGET } from "../Utils/API/fetchAPi";
import { formatTime } from '../Utils/Timer/formatTime';
import '../../styles/Home.css';

/**
 * Componente History:
 * Muestra las tareas finalizadas del usuario.
 * @returns {JSX.Element} - El elemento React renderizado.
 */
function History() {
  // Estado para almacenar las tareas finalizadas
  const [tasksFinished, setTasksFinished] = useState([]);

  // Obtener las tareas finalizadas al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGET('https://api-productividad-task-production-8231.up.railway.app/api');
        // Filtrar las tareas finalizadas
        const finishedTasks = result.tasks.filter(task => task.finished === true);
        setTasksFinished(finishedTasks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-tasks-home">
      <div className="title-home">
        <h1 className="title">Tus tareas <strong>Finalizadas✅</strong></h1>
      </div>
      <div className="containers-tasks">
        {/* Mapear y renderizar las tareas finalizadas */}

        {/* en dado caso que no existan tareas en el array o tarde la api 
        se mostrara el mensaje de Aun no tienes tareas por realizar 😞*/}
        {tasksFinished.length > 0 ? (
          tasksFinished.map((task, index) => (
            <div
              className="container-task"
              key={task.id}
              style={{ backgroundColor: getTaskColor(index) }}
            >
              <div className={"container-title-items"}>
                <h2 className={"title_task"}>{task.title}</h2>
              </div>
              <p className={'description-task'}>{task.description}</p>
              <div className={'container-task-time-finished'}>
                <p>{task.finished ? '✅Terminado' : '✏️Pendiente'}</p>
                {task.timeRemaining && (
                  <p className={'time-remaining'}> Final:{formatTime(task.timeRemaining)}</p>
                )}
                <p className={'time-task'}> Inicio: {formatTime(task.time * 60)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="title-not-found">Aun no tienes tareas por realizar 😞</p>
        )}
      </div>
    </div>
  );
}

export default History;
