import React from "react";
import { connect } from "react-redux";

const Jugadores = ({ jugadores, agregarTitular, agregarSuplente }) => {
  return (
    <section>
      <h2>Jugadores</h2>
      <div className="contenedor-jugadores">
        {jugadores.map((x) => (
          <article key={x.id} className="jugador">
            <img style={{ height: "100px" }} src={x.foto} alt={x.nombre} />
            <h3>{x.nombre}</h3>
            <div>
              <button onClick={() => agregarTitular(x)}>titular</button>
              <button onClick={() => agregarSuplente(x)}>suplente</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  jugadores: state.jugadores,
});
//const mapDispatchToProps = (dispatch) => ({});
const mapDispatchToProps = (dispatch) => ({
  agregarTitular(x) {
    dispatch({ type: "AGREGAR_TITULAR", x });
  },
  agregarSuplente(x) {
    dispatch({ type: "AGREGAR_SUPLENTE", x });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Jugadores);
