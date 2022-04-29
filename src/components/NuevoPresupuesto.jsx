import React, { useState } from "react";
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValid,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();
    // Comprobamos que sea un numero y ,mayor de 0
    if (!Number(presupuesto) || Number(presupuesto) < 0) {
      setMensaje("No es un presupuesto valido");
      return;
    }
    setMensaje("");
    setIsValid(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            type="text"
            className="nuevo-presupuesto"
            placeholder="Añade tu presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
      </form>
    </div>
  );
};
