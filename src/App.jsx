import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [modal, setModal] = useState(false);

  /**
   * Manejador del boton nuevo gasto
   * Para abrir el modal
   */
  const handleNuevoGasto = () => {
    setModal(true);
  };

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValid={isValid}
        setIsValid={setIsValid}
      />

      {/* Si el presupuesto es valido mostramos el boton */}
      {isValid && (
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
      )}

      {/* Componente de modal, se muestra si modal es true */}
      {modal && <Modal setModal={setModal} />}
    </div>
  );
}

export default App;
