import { useState, useEffect } from "react";
import Message from "./Message";
import closeIcon from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpense,
  expenseEdit,
  setExpenseEdit,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Object.keys(expenseEdit).length) {
      setName(expenseEdit.name);
      setAmount(expenseEdit.amount);
      setCategory(expenseEdit.category);
    }
  }, []);

  const closeModal = () => {
    setExpenseEdit({});
    setAnimateModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !category) {
      setMessage("Todos los campos obligatorios");
      return;
    }

    const newExpense = { name, amount, category };

    if (expenseEdit.id) {
      newExpense.id = expenseEdit.id;
      newExpense.date = expenseEdit.date;
      saveExpense(newExpense);
    } else {
      saveExpense({ name, amount, category });
    }

    setTimeout(() => {
      setName("");
      setAmount("");
      setCategory("");
    }, 500);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={closeIcon} alt="close modal" onClick={closeModal} />
      </div>

      <form
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>
          {Object.keys(expenseEdit).length ? "Editar Gasto" : " Nuevo Gasto"}
        </legend>
        {message && <Message type="error">{message}</Message>}

        <div className="campo">
          <label htmlFor="name">Nombre Gasto</label>
          <input
            id="name"
            type="text"
            placeholder="Añade el Nombre del Gasto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="amoutn">Cantidad</label>
          <input
            id="amount"
            type="number"
            placeholder="Añade la Cantidad del Gasto"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Gastos">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Casa">Casa</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={
            Object.keys(expenseEdit).length ? "Guardar Cambios" : "Añadir Gasto"
          }
        />
      </form>
    </div>
  );
};

export default Modal;
