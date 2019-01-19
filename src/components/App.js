import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import FormularioGasto from './Formulario';
import Listado from './Listado';
import { validarPresupuesto } from '../Helper';
import ControlPresupuesto from './ControlPresupuesto';

class App extends Component {
  // Crear el state
  state = {
    presupuesto: '',
    restante: '',
    gastos: {}
  };

  componentDidMount() {
    this.obtenerPresupuesto();
  }
  
  obtenerPresupuesto() {
    let presupuesto = prompt('Cuál es el presupuesto?');
    let resultado = validarPresupuesto(presupuesto);
    if (resultado) {
      this.setState({presupuesto, restante: presupuesto});
    } else {
      this.obtenerPresupuesto();
    }
  }

  // Agregar un nuevo gasto al state
  agregarGasto = (gasto) => {
    if (isNaN(Number(gasto.cantidadGasto))) {
      return;
    }
    const gastos = {...this.state.gastos};  // Creat una copia del state actual
    gastos[`gastos${Date.now()}`] = gasto;  // Agregar al gasto al objeto del state
    this.restarPresupuesto(gasto.cantidadGasto); // Restar al presupuesto.
    this.setState( {gastos});  // Guardarlo en el State
  };

  // Restar del presupuesto cuando un gasto se crea.
  restarPresupuesto = (cantidad) => {
    let restar = Number(cantidad);

    // Tomar una copia del State actual
    let restante = this.state.restante;

    // Lo restamos
    restante -= restar;

    restante = String(restante);
    this.setState({restante});
  }

  render() {
    return (
      <div className="App container">
          <Header titulo='Presupuesto Semanal' />
          <div className="contenido-principal contenido">
            <div className="row">
              <div className="one-half column">
                <FormularioGasto agregarGasto={this.agregarGasto}/>
              </div>
              <div className="one-half column">
                <Listado gastos={this.state.gastos} />
                <ControlPresupuesto presupuesto={this.state.presupuesto} restante={this.state.restante} />
              </div>
            </div>

          </div>
      </div>
    );
  }
}

export default App;
