import React from "react";
import { connect } from "react-redux";

const Titulares = ({ titulares, quitarTitular }) => {
  return (
    <section>
      <h2>Titulares</h2>
      <div className="titulares">
        {titulares.map((x) => (
          <article key={x.id} className="titular">
            <div>
              <img src={x.foto} alt={x.nombre} />
              <button onClick={() => quitarTitular(x)}>X</button>
            </div>
            <p>{x.nombre}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  titulares: state.titulares,
});
const mapDispatchToProps = (dispatch) => ({
  quitarTitular(x) {
    dispatch({ type: "QUITAR_TITULAR", x });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Titulares);
