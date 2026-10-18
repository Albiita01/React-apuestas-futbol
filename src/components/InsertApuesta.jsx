import React, { Component } from 'react'
import ApuestasService from '../service/ApuestasService'
import { NavLink, Navigate } from 'react-router-dom';

export default class InsertApuesta extends Component {

    service = new ApuestasService();

    cajaUsuario = React.createRef();
    cajaResultado = React.createRef();
    cajaFecha = React.createRef();

    state = {
        status: false,
        mensaje: ""
    }

    insertApuesta = async (event) => {
        event.preventDefault();
        let apuesta = {
            usuario: this.cajaUsuario.current.value,
            resultado: this.cajaResultado.current.value,
            fecha: this.cajaFecha.current.value
        }

        try {
            let datos = await this.service.insertApuesta(apuesta);
            this.setState({
                status: true
            })
        } catch (error) {
            this.setState({
                mensaje: error.message
            })
        }
    }

    render() {
        if (this.state.status) {
            return (<Navigate to='/apuestas' />)
        } else {
            return (
                <div>
                    <form onSubmit={this.insertApuesta}>
                        <label>Usuario</label>
                        <input type='text' ref={this.cajaUsuario} className='form-control' />
                        <br />
                        <label>Resultado</label>
                        <input type='text' ref={this.cajaResultado} className='form-control' />
                        <br />
                        <label>Fecha</label>
                        <input type='text' ref={this.cajaFecha} className='form-control' />
                        <br /><br />
                        <button className='btn btn-success'>Realizar apuesta</button>
                        <NavLink to="/apuestas" className="btn btn-danger">Volver</NavLink>
                    </form>
                </div>
            )
        }
    }
}
