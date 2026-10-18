import React, { Component } from 'react'
import EquiposService from '../service/EquiposService';
import JugadoresService from '../service/JugadoresService';
import { NavLink } from 'react-router-dom';

export default class JugadoresEquipoComponent extends Component {

    service = new JugadoresService();
    // #1 · Para poner "Jugadores del ..."
    equiposService = new EquiposService();

    state = {
        jugadores: [],
        // #1
        equipo: null
    }

    loadJugadoresByTeam = async (id) => {
        let datos = await this.service.searchJugadoresByTeam(id);
        // #1 · Para mostrar el nombre del equipo
        let eq = await this.equiposService.getTeamById(id);
        this.setState({
            jugadores: datos,
            // #1
            equipo: eq
        })
        console.log("Jugadores: " + datos)
    }


    componentDidMount = async () => {
        await this.loadJugadoresByTeam(this.props.idTeam);
    }

    render() {
        return (
            <div>
                {
                    this.state.equipo ? (
                        <div>
                            <h1>Jugadores del {this.state.equipo.nombre}</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Posición</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.jugadores.map((jug, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    <img src={jug.imagen} height="60px" />
                                                </td>
                                                <td>{jug.nombre}</td>
                                                <td>{jug.posicion}</td>
                                                <td>
                                                    <NavLink className="btn btn-primary">Detalles</NavLink>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Cargando jugadores...</p>
                    )
                }
            </div>
        )
    }
}
