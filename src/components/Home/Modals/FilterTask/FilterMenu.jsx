import React from "react";
import '../../../../styles/Modals/FilterTime.css'


/**
 * Componente para el modal de filtro de tiempo que se muestra en la app de home.
 *
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onFilterSelect - Función para seleccionar un filtro de tiempo.
 * @returns {JSX.Element|null} - Elemento JSX que representa el modal de filtro de tiempo.
 */
function FilterMenu({ isOpen, onClose, onFilterSelect }) {
  /**
   * Maneja la selección de un filtro de tiempo y cierra el modal.
   *
   * @param {string} filterValue - Valor del filtro de tiempo seleccionado.
   */
  const handleFilterSelect = (filterValue) => {
    onFilterSelect(filterValue);
    onClose(); // Cierra el modal después de seleccionar el filtro
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="filter-modal">
      <div className="modal-generate modal-content-filter" onClick={(e) => e.stopPropagation()}>
        <p onClick={() => handleFilterSelect('all')}>Mostrar Todo</p>
        <p onClick={() => handleFilterSelect('corto')}>Orden Corto</p>
        <p onClick={() => handleFilterSelect('medio')}>Orden Medio</p>
        <p onClick={() => handleFilterSelect('largo')}>Orden Largo</p>
      </div>
    </div>
  );
}

export default FilterMenu;