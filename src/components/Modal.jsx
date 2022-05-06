import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CerrarModal from "../img/cerrar.svg";

export const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [gasto, setGasto] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
  });

  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      setGasto(gastoEditar);
    }
  }, []);

  const { nombre, cantidad, categoria } = gasto;

  const handleInputs = ({ target }) => {
    setGasto({
      ...gasto,
      [target.name]: target.value,
    });
  };

  const hanldeForm = (e) => {
    e.preventDefault();
    // Validar campos vacios
    if ([nombre, cantidad, categoria].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    gasto.cantidad = Number(gasto.cantidad);
    guardarGasto(gasto, id);
    ocultarModal();
  };

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 500);
    setGasto({
      nombre: "",
      cantidad: "",
      categoria: "",
    });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={hanldeForm}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            name="nombre"
            value={nombre}
            onChange={handleInputs}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            placeholder="Añade la cantidad"
            value={cantidad}
            onChange={handleInputs}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={handleInputs}
          >
            <option value="">-- Selecciona una categoria</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gatos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? "Editar Gasto" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
};
