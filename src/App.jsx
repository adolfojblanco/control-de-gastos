import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Filtros } from "./components/Filtros";
import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { Modal } from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto") ?? 0)
  );
  const [isValid, setIsValid] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setgastosFiltrados] = useState([]);

  /**
   * Abrir el modal cuando editamos
   */
  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      setModal(true);
      // Animando el modal
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  /**
   * Guardar los gastos en localStorage
   */
  useEffect(() => {
    // Si presupuesto no existe guaradamos 0
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  /**
   * Guardar los gastos en localStorage
   */
  useEffect(() => {
    // Si presupuesto existe, mostramos los gastos
    const presupuestoLS =
      Number(localStorage.getItem("presupuesto", presupuesto)) ?? 0;
    if (presupuestoLS > 0) {
      setIsValid(true);
    }
  }, []);

  /**
   * Obtenemos los gastos del localStorage
   */
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setgastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  /**
   * Manejador del boton nuevo gasto
   * Para abrir el modal
   */
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    // Animando el modal
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );

      setGastos(gastosActualizados);
    } else {
      // Nuevo
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastoEliminado = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastoEliminado);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Toaster position="top-right" reverseOrder={false} />
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValid={isValid}
        setIsValid={setIsValid}
        gastos={gastos}
      />

      {/* Si el presupuesto es valido mostramos el boton */}
      {isValid && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {/* Componente de modal, se muestra si modal es true */}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
