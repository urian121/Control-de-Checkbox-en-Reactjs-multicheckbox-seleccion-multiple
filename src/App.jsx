import { useState } from "react";
import frutasData from "./data_frutas.json";

function App() {
  const [frutas, setFrutas] = useState(frutasData); // useState para manejar el estado de las frutas
  const [frutasSeleccionadas, setFrutasSeleccionadas] = useState([]); // useState para manejar las frutas seleccionadas

  /**
   * Esta función handleCheckboxChange se encarga de manejar el cambio de estado de un checkbox específico correspondiente a una fruta en la lista. Toma como argumento el id de la fruta que se desea cambiar y actualiza el estado de esa fruta en el arreglo frutas. Básicamente, verifica si el id de la fruta coincide con el id del checkbox que se ha cambiado y luego cambia el valor de la propiedad checked de esa fruta a su opuesto (true si estaba false, y false si estaba true). Luego, devuelve un nuevo arreglo de frutas actualizado con el cambio de estado.
   */
  const handleCheckboxChange = (id) => {
    const updatedFrutas = frutas.map((fruta) =>
      fruta.id === id ? { ...fruta, checked: !fruta.checked } : fruta
    );
    setFrutas(updatedFrutas);

    // Obtener las frutas seleccionadas y almacenar sus ID y emojis
    const frutasSeleccionadasIds = updatedFrutas
      .filter((fruta) => fruta.checked)
      .map((fruta) => ({ id: fruta.id, emoji: fruta.emoji }));
    setFrutasSeleccionadas(frutasSeleccionadasIds);
  };

  // Función para seleccionar o deseleccionar todas las frutas
  const handleSelectAll = () => {
    const allFrutasChecked = frutas.every((fruta) => fruta.checked);
    const updatedFrutas = frutas.map((fruta) => ({
      ...fruta,
      checked: !allFrutasChecked,
    }));
    setFrutas(updatedFrutas);

    // Actualizar las frutas seleccionadas
    setFrutasSeleccionadas(
      allFrutasChecked
        ? []
        : updatedFrutas.map((fruta) => ({ id: fruta.id, emoji: fruta.emoji }))
    );
  };

  // Función para obtener un resumen de los IDs de las frutas seleccionadas
  const obtenerResumenIds = () => {
    return frutasSeleccionadas.map((fruta) => fruta.id).join(", ");
  };

  return (
    <>
      <div className="row justify-content-md-center">
        <div className="col-md-12">
          <h1 className="fw-bold">
            Control de Checkbox en React (multicheckbox)
          </h1>
          <button className="float-end" onClick={handleSelectAll}>
            {frutas.every((fruta) => fruta.checked)
              ? "Deseleccionar todas"
              : "Marcar todas"}
          </button>
        </div>
      </div>
      <hr />

      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <h2>
            Lista de frutas <hr />
          </h2>
          {frutas.map((fruta) => (
            <div key={fruta.id} className="content_frutas">
              <span onClick={() => handleCheckboxChange(fruta.id)}>
                {fruta.id} &nbsp;
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={fruta.id}
                  checked={fruta.checked}
                  onChange={() => handleCheckboxChange(fruta.id)}
                />
              </span>
              <label
                htmlFor={fruta.id}
                onClick={() => handleCheckboxChange(fruta.id)}>
                {fruta.nombre}
              </label>
              <span onClick={() => handleCheckboxChange(fruta.id)}>
                {fruta.emoji}
              </span>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h2>
            Frutas seleccionadas <hr />
          </h2>
          <ol>
            {frutasSeleccionadas.map((fruta) => (
              <li key={fruta.id}>
                Id: {fruta.id}, &nbsp; Emoji: {fruta.emoji}
              </li>
            ))}
          </ol>
        </div>
        <div className="col-md-4">
          <h2>
            Resumen <hr />
          </h2>
          <p className="fw-bold">
            👉 Total de frutas seleccionadas: {frutasSeleccionadas.length}
          </p>
          <p className="fw-bold">
            👉 Ids seleccionados: <br />
            <span style={{ color: "crimson" }}>{obtenerResumenIds()}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
