import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";

export const asyncMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

export const fetchThunk = () => async (dispatch) => {
  dispatch({ type: "todos/pending" });
  try {
    const url = `https://jsonplaceholder.typicode.com/todos`;
    const response = await fetch(url);
    const data = await response.json();
    const todos = data.slice(0, 10);
    dispatch({ type: "todos/fulfilled", payload: todos });
  } catch (error) {
    dispatch({ type: "todos/error", error: error.message });
  }
};

export const filterReducer = (state = "all", action) => {
  switch (action.type) {
    case "filter/set":
      return action.payload;
    default:
      return state;
  }
};

const initialFetching = { loading: "idle", error: null };

export const fetchingReducer = (state = initialFetching, action) => {
  switch (action.type) {
    case "todos/pending":
      return { ...state, loading: "pending" };
    case "todos/fulfilled":
      return { ...state, loading: "succeded" };
    case "todos/error":
      return { error: action.error, loading: "rejected" };
    default:
      return state;
  }
};

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "todos/fulfilled":
      return action.payload;
    case "todo/add":
      return state.concat({ ...action.payload });
    case "todo/complete":
      const newTodo = state.map((x) =>
        x.id === action.payload ? { ...x, done: !x.done } : x
      );
      return newTodo;
    default:
      return state;
  }
};

//combineReducer recibe un objeto que contiene como prop el estado que debe mantener
export const reducer = combineReducers({
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
});

const selectTodos = (state) => {
  const {
    todos: { entities },
    filter,
  } = state;
  if (filter === "complete") {
    return entities.filter((x) => x.done);
  }
  if (filter === "incomplete") {
    return entities.filter((x) => !x.done);
  }
  return entities;
};

const selectStatus = (state) => state.todos.status;

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li
      onClick={() => {
        dispatch({ type: "todo/complete", payload: todo.id });
      }}
      style={{ textDecoration: todo.done && "line-through" }}
    >
      {todo.title}
    </li>
  );
};

function App() {
  const dispatch = useDispatch();
  //(x) => x, una funcion de tipo identidad
  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);

  const [valor, setValor] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!valor.trim()) {
      return;
    }
    const id = Math.random().toString(36);
    dispatch({ type: "todo/add", payload: { title: valor, id, done: false } });
    setValor("");
  };
  if (status.loading === "pending") {
    return <p>Cargando...</p>;
  }
  if (status.loading === "rejected") {
    return <p>{status.error}</p>;
  }
  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          value={valor}
          onChange={(e) => {
            setValor(e.target.value);
          }}
        />
      </form>
      <button
        onClick={() => {
          dispatch({ type: "filter/set", payload: "" });
        }}
      >
        mostrar Todos
      </button>
      <button
        onClick={() => {
          dispatch({ type: "filter/set", payload: "complete" });
        }}
      >
        completos
      </button>
      <button
        onClick={() => {
          dispatch({ type: "filter/set", payload: "incomplete" });
        }}
      >
        incompletos
      </button>
      <button onClick={() => dispatch(fetchThunk())}>fetch</button>
      <ul>
        {todos.map((x) => (
          <TodoItem key={x.id} todo={x} />
        ))}
      </ul>
    </div>
  );
}

export default App;
