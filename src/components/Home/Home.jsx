import React, { useEffect, useState, useContext } from "react";
import '../../styles/Home.css'; // Importa tu archivo de estilos CSS
import ModalAdd from './Modals/add_task/add-task';
import ModalDelete from './Modals/delete_task/delete';
import ModalDoTask from './Modals/show_task/task';
import ModalGenerate from './Modals/FilterTask/FilterTIme';
import ModalFilterMenu from './Modals/FilterTask/FilterMenu';
import Modaledit from './Modals/edit_task/edit';
import getTaskColor from '../Utils/Colors/getTaskColor';
import { formatTime } from '../Utils/Timer/formatTime';
import { fetchGET } from "../Utils/API/fetchAPi";
import { TaskContext } from "../Context/TaskContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPenToSquare, faFilter, faTasks } from '@fortawesome/free-solid-svg-icons';

/**
 * Home Component:
 * Componente principal que muestra la lista de tareas y proporciona funcionalidades como agregar, editar,
 * eliminar, filtrar y ordenar tareas.
 * @returns {JSX.Element} - El elemento React renderizado.
 */
function Home() {
  // Obtiene las funciones y el estado del contexto de tareas
  const {
    isOpen,
    handleAddTask,
    handleCloseModal,
    handleCloseModalDelete,
    setModalDeleteOpen,
    isModalDeleteOpen,
    isModalDoTaskOpen,
    setModalOpenDoTask,
    isModalTaskOpenEdit,
    setModalOpenEdithTask,
    isModalGenrateOpen,
    isModalFilterOpen,
    selectedFilter,
    handleClosedGenerateTask,
    handleOpenGenerateTask,
    handleCloseFilter,
    handleOpenFilter,
    handleFilterSelect,
    handleDoTaskModalClose,
    handleClosedModalEdit
  } = useContext(TaskContext);

  // Estado local para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);
  // Estado local para almacenar el ID de la tarea seleccionada
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  // Estado local para almacenar la tarea seleccionada
  const [selectedTask, setSelectedTask] = useState({});
  // Estado local para controlar el orden de las tareas
  const [sortOrder, setSortOrder] = useState('default');

  // Efecto para cargar las tareas el home y estas se muestren
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGET('https://api-productividad-task-production-8231.up.railway.app/api');
        setTasks(result.tasks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Función para abrir el modal de eliminación de tarea
  const handleOpenDeleteModalDelete = (taskID, event) => {
    // event que nos ayuda a que otros modales se abran
    event.stopPropagation();
    //establecemos el id a el set que pertenece
    setSelectedTaskId(taskID);
    //damos permiso de que se abra el modal de eliminar 
    setModalDeleteOpen(true);
  };

  // Función para abrir el modal de visualización de tarea
  const handleOpenDoTaskModal = ({ task, backgroundColor }) => {
    //nuevo objeto que almacena los datos nuevos de la task para qrealizarla
    task = {
      ...task,
      color: backgroundColor
    };
    // establecemos ese nuevo objeto en el set que le pertenece
    setSelectedTask(task);
    //abrimos el modal para empezar a realizar la tarea
    setModalOpenDoTask(true);
  };

  // Función para abrir el modal de edición de tarea
  const handleOpenModalEdit = ({ task, backgroundColor }, event) => {
    // event que nos ayuda a que otros modales se abran

    event.stopPropagation();

    //nuevo objeto que almacena los datos nuevos de la task para qrealizarla
    task = {
      ...task,
      color: backgroundColor
    };
    // establecemos ese nuevo objeto en el set que le pertenece
    setSelectedTask(task);
    //abrimos el modal para empezar a realizar la tarea
    setModalOpenEdithTask(true);
  };


  // Filtra las tareas en función del filtro seleccionado
  const filteredTasks = tasks.filter(task => {
    // Si no hay un filtro seleccionado, muestra todas las tareas
    if (selectedFilter === null) {
      return true;
    } else if (selectedFilter === 'corto') {
      // Filtra tareas cortas (menos o igual a 30 minutos)
      return task.time <= 30;
    } else if (selectedFilter === 'medio') {
      // Filtra tareas medianas (más de 30 y hasta 60 minutos)
      return task.time > 30 && task.time <= 60;
    } else if (selectedFilter === 'largo') {
      // Filtra tareas largas (más de 60 minutos)
      return task.time > 60;
    } else if (selectedFilter === 'all') {
      // Muestra todas las tareas sin importar la duración
      return task.time >= 0;
    } else {
      // En caso de un filtro no reconocido, muestra todas las tareas por defecto
      return true;
    }
  });


  // Cambia el orden de las tareas entre alfabético y predeterminado
  const handleSortOrderChange = () => {
    // Copia las tareas actuales para no modificar el estado directamente
    const sortedTasks = sortOrder === 'default'
      ? [...tasks].sort((a, b) => a.title.localeCompare(b.title))
      : tasks;

    // Cambia el estado de sortOrder a 'alphabetical' si estaba en 'default' y viceversa
    setSortOrder(sortOrder === 'default' ? 'alphabetical' : 'default');
    // Actualiza el estado de las tareas con la nueva lista ordenada
    setTasks(sortedTasks);
  };

  return (
    <div className="container-tasks-home">
      <div className="title-home">
        <h1 className="title">Bienvenido a tu aplicación de <strong>Productividad</strong></h1>
        <div className="filter-tasks">
          <FontAwesomeIcon icon={faTasks} className="tasks-icon filter-icon" title={'Generar 50 Tareas'} onClick={(event) => handleOpenGenerateTask(event)} />
          <div className="filter-container">
            <FontAwesomeIcon icon={faFilter} className="filter-icon" title={'Filtrar Tareas'} onClick={handleOpenFilter} />
            <ModalFilterMenu isOpen={isModalFilterOpen} onClose={handleCloseFilter} onFilterSelect={handleFilterSelect} />
          </div>
          <p className={'p-ordenar'} onClick={handleSortOrderChange}>Ordenar Tareas</p>
        </div>
      </div>

      <div className="containers-tasks">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div
              className="container-task"
              key={task.id}
              style={{ backgroundColor: getTaskColor(index) }}
              onClick={() => handleOpenDoTaskModal({ task, backgroundColor: getTaskColor(index) })}
            >
              <div className={"container-title-items"}>
                <h2 className={"title_task"}>{task.title}</h2>
                <div className={'items-tasks'}>
                  <div>
                    <FontAwesomeIcon icon={faPenToSquare} className={'edit-task'} title={'Editar'} onClick={(event) => handleOpenModalEdit({ task, backgroundColor: getTaskColor(index) }, event)} />
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faTimes} className={'delete-task'} title={'Eliminar'} onClick={(event) => handleOpenDeleteModalDelete(task.id, event)} />
                  </div>
                </div>
              </div>
              <p className={'description-task'}>{task.description}</p>
              <div className={'container-task-time-finished'}>
                <p>{task.finished ? '✅Terminado' : '✏️Pendiente'}</p>
                <div className="timer-container">
                  {/*convertimos el tiempo en horas con minutos y segundos*/}
                  {task.timeRemaining && task.finished && (
                    <p className={'time-remaining'}>Final: {formatTime(task.timeRemaining)}</p>
                  )}
                  <p className={'time-task'}>Inicio: {formatTime(task.time * 60)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="title-not-found">Aun no tienes tareas por realizar 😞</p>
        )}
      </div>
      {/*Boton que abre un modal para poder agregar una nueva tarea*/}
      <button className="add-button" onClick={handleAddTask}>+</button>
      {/* Modales para agregar, eliminar, editar y filtrar tareas */}
      <ModalAdd isOpen={isOpen} onClose={handleCloseModal} />
      <ModalDelete isOpen={isModalDeleteOpen} onClose={handleCloseModalDelete} idTask={selectedTaskId} />
      <ModalDoTask isOpen={isModalDoTaskOpen} onClose={handleDoTaskModalClose} task={selectedTask} />
      <Modaledit isOpen={isModalTaskOpenEdit} onClose={handleClosedModalEdit} task={selectedTask} />
      <ModalGenerate isOpen={isModalGenrateOpen} onClose={handleClosedGenerateTask} />
    </div>
  );
}

export default Home;
