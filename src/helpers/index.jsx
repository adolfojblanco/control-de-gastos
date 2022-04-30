export const generarId = () => {
  const random = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36);

  return random + fecha;
};


/**
 * Formatear Fecha
 * @param {date} fecha 
 * @returns 
 */
export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fechaNueva.toLocaleDateString("es-ES", opciones);
};

// Formatear como moneda (EURO)
// No muta la cantidad, solo lo formatea

export const formatearCantidad = (cantidad) => {
  return cantidad.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
};

// Salida: 100,00 €
