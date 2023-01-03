const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            id="category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Todas las categorias</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Gastos">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Casa">Casa</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
