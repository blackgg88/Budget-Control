import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListExpenses from "./components/ListExpenses";
import Filters from "./components/Filters";
import Modal from "./components/Modal";

import { generateId } from "./helpers";

import iconNewSpent from "./img/nuevo-gasto.svg";

function App() {
  const [budget, setBudget] = useState(0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [expenses, setExpenses] = useState([]);

  const [expenseEdit, setExpenseEdit] = useState({});
  const [expenseFilter, setExpenseFilter] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [expenseEdit]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;
    const expensesLS = JSON.parse(localStorage.getItem("expenses")) ?? [];

    if (budgetLS) {
      setBudget(budgetLS);
      setIsValidBudget(true);
    }

    if (expensesLS.length) {
      setExpenses(expensesLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if (filter) {
      setExpenseFilter(
        expenses.filter((expense) => expense.category === filter)
      );
    }
  }, [filter]);

  const handleNewSpent = () => {
    setExpenseEdit({});
    setModal(true);

    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
  };

  const saveExpense = (expense) => {
    if (expense.id) {
      const updatedExpense = expenses.filter(
        (expenseState) => expenseState.id !== expense.id
      );

      setExpenses([...updatedExpense, expense]);
      setExpenseEdit({});
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setAnimateModal(false);

    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const deleteExpense = (id) => {
    const updatedExpense = expenses.filter((expense) => expense.id !== id);

    setExpenses([...updatedExpense]);
  };

  return (
    <div className={modal ? "fijar" : " "}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />
            <ListExpenses
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
              expenseFilter={expenseFilter}
              filter={filter}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={iconNewSpent}
              alt="iconNewSpent"
              onClick={handleNewSpent}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          expenseEdit={expenseEdit}
          setExpenseEdit={setExpenseEdit}
        />
      )}
    </div>
  );
}

export default App;
