import React from "react";
import CerrarModal from "../img/cerrar.svg";

export const Modal = ({ setModal }) => {


  const ocultarModal = () => {
    setModal(false);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form>
        <legend>Nuevo Gasto</legend>
        
      </form>

    </div>
  );
};
