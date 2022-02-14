import React from "react";
import { connect } from "react-redux";

const Suplentes = ({ suplentes, quitarSuplente }) => {
  return (
    <section>
      <h2>Suplentes</h2>
      <div className="suplentes">
        {suplentes.map((x) => (
          <article className="suplente">
            <div>
              <img src={x.foto} alt={x.nombre} />
              <button onClick={() => quitarSuplente(x)}>X</button>
            </div>
            <p>{x.nombre}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  suplentes: state.suplentes,
});
const mapDispatchToProps = (dispatch) => ({
  quitarSuplente(x) {
    dispatch({ type: "QUITAR_SUPLENTE", x });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Suplentes);
