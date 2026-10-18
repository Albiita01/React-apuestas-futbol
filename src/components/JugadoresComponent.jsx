import React, { Component } from 'react'
import JugadoresService from '../service/JugadoresService'

export default class JugadoresComponent extends Component {

    service = new JugadoresService();

    state = {
        jugadores: []
    }

    searchJugadoresByName = async () => {
        let nombre = this.props.nombre;
        let datos = await this.service.searchJugadoresByName(nombre);
        this.setState({
            jugadores: datos
        })
    }

    searchJugadoresByTeam = async () => {
        let idEquipo = this.props.idEquipo;
        let datos = await this.service.searchJugadoresByTeam(idEquipo);
        this.setState({
            jugadores: datos
        })
    }

    searchJugadores = async () => {
        if (this.props.nombre) {
            await this.searchJugadoresByName();
        } else if (this.props.idEquipo) {
            await this.searchJugadoresByTeam();
        }
    }

    componentDidMount = async () => {
        await this.searchJugadores();
    }

    componentDidUpdate = async (oldProps) => {
        if (oldProps.nombre != this.props.nombre || oldProps.idEquipo != this.props.idEquipo) {
            await this.searchJugadores();
        }
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Posición</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jugadores.map((jug, index) => {
                                return (<tr key={index}>
                                    <td><img src={jug.imagen} height="60px" /></td>
                                    <td>{jug.nombre}</td>
                                    <td>{jug.posicion}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
