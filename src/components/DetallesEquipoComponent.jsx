import React, { Component } from 'react'
import EquiposService from '../service/EquiposService'
import { NavLink } from 'react-router-dom';

export default class DetallesEquipoComponent extends Component {

    service = new EquiposService();

    state = {
        equipo: null
    }

    loadTeamById = async (id) => {
        let team = await this.service.getTeamById(id);
        this.setState({
            equipo: team
        })
        console.log(team);
    }

    componentDidMount = async () => {
        await this.loadTeamById(this.props.idTeam);
    }

    render() {
        return (
            <div>
                {
                    this.state.equipo ? (
                        <div>
                            <h1>{this.state.equipo.nombre}</h1>
                            <img src={this.state.equipo.imagen} alt={this.state.equipo.nombre} style={{ width: "200px" }} />
                            <p>{this.state.equipo.descripcion}</p>
                            <div>
                                {/** this.state.equipo.id porque es el nombre del valor en la api */}
                                <NavLink to={"/jugadores/jugadoresEquipo/" + this.state.equipo.idEquipo} className="btn btn-primary">Jugadores</NavLink>
                                <NavLink to={"/"} className="btn btn-danger">Volver</NavLink>
                            </div>
                        </div>
                    ) : (
                        <p>Cargando datos del equipo...</p>
                    )
                }
            </div>
        )
    }
}
