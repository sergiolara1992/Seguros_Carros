import { useState, createContext } from "react";
import {
  obtenerDiferenciaYear,
  calcularMarca,
  calcularPlan,
  formatearDinero,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    /* UNA BASE */
    let resultado = 2000;

    /* OBTENER DIFERENCIA DE AÑOS */
    const diferencia = obtenerDiferenciaYear(datos.year);

    /* HAY QUE RESTAR EL 3% POR CADA AÑO */
    resultado -= (diferencia * 3 * resultado) / 100;

    /* TOYOTA 30% */
    /* KIA 15% */
    /* MAZDA 5% */
    resultado *= calcularMarca(datos.marca);

    /* BASICO 20% */
    /* COMPLETO 50% */
    resultado *= calcularPlan(datos.plan);

    /* FORMATEAR DINERO */

    resultado = formatearDinero(resultado);

    setCargando(true);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false)
    }, 3000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };
export default CotizadorContext;
