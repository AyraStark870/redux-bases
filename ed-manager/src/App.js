import EquipoSeleccionado from "./components/EquipoSeleccionado";
import Jugadores from "./components/Jugadores";
import { Provider } from "react-redux";
import store from "./store";
import "./styles/styles.scss";

function App() {
  return (
    <Provider store={store}>
      <main>
        <h1>EDmanager</h1>
        <Jugadores />
        <EquipoSeleccionado />
      </main>
    </Provider>
  );
}

export default App;
