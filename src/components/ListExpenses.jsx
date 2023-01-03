import Expense from "./Expense";

const ListExpenses = ({
  expenses,
  setExpenseEdit,
  deleteExpense,
  expenseFilter,
  filter,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2>
            {expenseFilter.length
              ? "Gastos"
              : "No Hay Gastos En Esta Categoría"}
          </h2>
          {expenseFilter.map((expense) => (
            <Expense
              key={expense.id}
              name={expense.name}
              amount={expense.amount}
              category={expense.category}
              id={expense.id}
              date={expense.date}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? "Gastos" : "No Hay Gastos Aún"}</h2>
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              name={expense.name}
              amount={expense.amount}
              category={expense.category}
              id={expense.id}
              date={expense.date}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListExpenses;
