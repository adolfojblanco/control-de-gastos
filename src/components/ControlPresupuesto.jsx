import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatearCantidad } from "../helpers";

export const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValid,
}) => {
  const [porcentaje, setPorcentaje] = useState(50);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);


  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    //Calcular porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setPorcentaje(nuevoPorcentaje);

    setDisponible(totalDisponible);
    setGastado(formatearCantidad(totalGastado));
  }, [gastos, presupuesto]);

  const handleResetApp = () => {
    setGastos([]);
    setPresupuesto(0);
    setIsValid(false);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}%`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B83F6",
            trailColor: "#F5F5F5",
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear APP
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};
