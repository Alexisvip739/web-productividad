import React, { useState } from "react";
import '../../../../styles/Modals/delete.css';
import { fetchDELETEapi } from '../../../Utils/API/fetchAPi.js';

function DeleteTask({ isOpen, onClose, idTask }) {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const url = `https://api-productividad-task-production-8231.up.railway.app/api/${idTask}/`; // Construye la URL adecuada para la tarea específica
      await fetchDELETEapi(url);
      onClose();
      window.location.reload();
    } catch (error) {
      // Handle errors from the fetchDELETEapi function
      console.error('Error al eliminar la tarea:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={"modal-overlay "} >
      <div className={'modal-delete modal-content '} onClick={(e) => e.stopPropagation()}>
        <h2>{deleting ? 'Eliminando tarea...' : '⚠️¿Estás seguro de eliminar esta Tarea?⚠️'}</h2>
        <div className={'buttons-delete'}>
          <button className={'confirm'} onClick={handleDelete}>Sí</button>
          <button className={'no-confirm'} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
