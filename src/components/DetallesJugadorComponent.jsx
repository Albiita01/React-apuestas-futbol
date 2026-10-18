import React, { Component } from 'react'
import JugadoresService from '../service/JugadoresService'
import { NavLink } from 'react-router-dom';

export default class DetallesJugadorComponent extends Component {

    service = new JugadoresService();

    state = {
        jugador: null
    }

    loadDetallesJugador = async () => {
        let id = this.props.idJugador;
        let datos = await this.service.searchJugadorById(id);
        this.setState({
            jugador: datos
        })
        console.log(datos);
    }

    componentDidMount = async () => {
        let id = this.props.idJugador;
        await this.loadDetallesJugador(id);
    }

    render() {
        if (this.state.jugador == null) {
            return <p>Cargando jugador...</p>
        }

        let { nombre, posicion, imagen, idEquipo } = this.state.jugador;

        return (
            <div>
                <h1>{nombre}</h1>
                <img src={imagen} alt={nombre} height="200px" />
                <p><strong>Posición:</strong> {posicion}</p>
                <NavLink to={"/jugadores/jugadoresEquipo/" + idEquipo} className="btn btn-dark">Volver</NavLink>
            </div>
        )
    }
}
