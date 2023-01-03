import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlBudget = ({
  budget,
  setBudget,
  expenses,
  setExpenses,
  setIsValidBudget,
}) => {
  const [available, setAvailable] = useState(budget);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const newPercentage = ((totalSpent / budget) * 100).toFixed(2);

    const totalAvailable = budget - totalSpent;

    setTimeout(() => {
      setPercentage(newPercentage);
    }, 100);

    setSpent(totalSpent);
    setAvailable(totalAvailable);
  }, [expenses]);

  const formatBudget = (money) => {
    return money.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const result = confirm("¿Desea reinicias presupuesto y gastos");
    if (result) {
      setBudget(0);
      setExpenses([]);
      setIsValidBudget(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra  dos-columnas">
      <div>
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: available < 0 ? "red" : "#3b82f6",
            trailColor: "#F5F5F5",
            textColor: available < 0 ? "red" : "#3b82f6",
          })}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reset App
        </button>
        <p>
          <span>Presupuesto: </span> {formatBudget(budget)}
        </p>

        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatBudget(available)}
        </p>

        <p>
          <span>Gastado: </span> {formatBudget(spent)}
        </p>
      </div>
    </div>
  );
};

export default ControlBudget;
