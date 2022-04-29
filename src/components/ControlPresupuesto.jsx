import React from "react";

export const ControlPresupuesto = ({ presupuesto }) => {
  
  // Formatear como moneda
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Grafica aqui</p>
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span> {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(presupuesto)}
        </p>
      </div>
    </div>
  );
};
