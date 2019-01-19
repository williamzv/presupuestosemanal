import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Gastos extends Component {
    render() {
        const {cantidadGasto, nombreGasto} = this.props.gasto;

        return (
            <li className="gastos">
                <p>
                    {nombreGasto}
                    <span className="gasto">$ {cantidadGasto}</span>
                </p>
            </li>
        )
    }
}
Gastos.propTypes = {
    gasto: PropTypes.object.isRequired
}


export default Gastos;