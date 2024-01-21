// task-context.js

import React, { createContext, useState } from "react";

// Crea el contexto de tareas
const TaskContext = createContext();

/**
 * Proveedor de Tareas:
 * Componente que provee el estado y funciones relacionadas con las tareas a los componentes hijos.
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} - El elemento React renderizado.
 */
function TaskProvider({ children }) {
  // Estado para controlar la apertura del modal de agregar tarea
  const [isOpen, setOpen] = useState(false);

  // Estado para controlar la apertura del modal de eliminar tarea
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);

  // Estado para controlar la apertura del modal de realizar tarea
  const [isModalDoTaskOpen, setModalOpenDoTask] = useState(false);

  // Estado para controlar la apertura del modal de editar tarea
  const [isModalTaskOpenEdit, setModalOpenEdithTask] = useState(false);

  // Estado para controlar la apertura del modal de generación de tarea (50 tareas aleatorias)
  const [isModalGenrateOpen, setisModalGenrateOpen] = useState(false);

  // Estado para controlar la apertura del modal de filtro
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);

  // Estado para almacenar el tipo de filtro seleccionado
  const [selectedFilter, setSelectedFilter] = useState(null);

  /**
   * Función para manejar la apertura del modal de agregar tarea.
   */
  const handleAddTask = () => {
    setOpen(true);
  };

  /**
   * Función para manejar el cierre del modal de agregar tarea.
   */
  const handleCloseModal = () => {
    setOpen(false);
  };

  /**
   * Función para manejar el cierre del modal de eliminar tarea.
   */
  const handleCloseModalDelete = () => {
    setModalDeleteOpen(false);
  };

  /**
   * Función para manejar el cierre del modal de generación de tarea.
   */
  const handleClosedGenerateTask = () => {
    setisModalGenrateOpen(false);
  };

  /**
   * Función para manejar la apertura del modal de generación de tarea.
   * @param {Event} event - Evento de click.
   */
  const handleOpenGenerateTask = (event) => {
    event.stopPropagation();
    setisModalGenrateOpen(true);
  };

  /**
   * Función para manejar el cierre del modal de filtro.
   */
  const handleCloseFilter = () => {
    setIsModalFilterOpen(false);
  };

  /**
   * Función para manejar la apertura/cierre del modal de filtro.
   */
  const handleOpenFilter = () => {
    setIsModalFilterOpen(!isModalFilterOpen);
  };

  /**
   * Función para manejar la selección de un filtro.
   * @param {string} filterValue - Valor del filtro seleccionado.
   */
  const handleFilterSelect = (filterValue) => {
    setSelectedFilter(filterValue);
  };

  /**
   * Función para manejar el cierre del modal de realizar tarea.
   */
  const handleDoTaskModalClose = () => {
    setModalOpenDoTask(false);
  };

  /**
   * Función para manejar el cierre del modal de editar tarea.
   */
  const handleClosedModalEdit = () => {
    setModalOpenEdithTask(false);
  };

  // Proporciona el contexto y las funciones relacionadas con las tareas a los componentes hijos
  return (
    <TaskContext.Provider value={{
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
      setisModalGenrateOpen,
      isModalFilterOpen,
      setIsModalFilterOpen,
      selectedFilter,
      setSelectedFilter,
      handleClosedGenerateTask,
      handleOpenGenerateTask,
      handleCloseFilter,
      handleOpenFilter,
      handleFilterSelect,
      handleDoTaskModalClose,
      handleClosedModalEdit
    }}>
      {children}
    </TaskContext.Provider>
  );
}

// Exporta el contexto y el proveedor de tareas
export { TaskContext, TaskProvider };
