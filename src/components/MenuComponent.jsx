import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo-champions.png'
import EquiposService from '../service/EquiposService'

export default class MenuComponent extends Component {

    service = new EquiposService();

    state = {
        equipos: []
    }

    loadEquipos = async () => {
        let listaEquipos = await this.service.getAllTeams();
        this.setState({
            equipos: listaEquipos
        })

        console.log("Equipos: " + listaEquipos)
    }

    componentDidMount = async () => {
        await this.loadEquipos();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <img src={logo} height="70px" />
                    <NavLink className="navbar-brand" to={"/"}>Champions</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to={"/"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/apuestas"}>Apuestas</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/buscador"}>Buscador</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Equipos
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.equipos.map((eq, index) => {
                                            return (<NavLink className="dropdown-item" to={"/equipos/" + eq.idEquipo} key={index}>{eq.nombre}</NavLink>)
                                        })
                                    }
                                </ul>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
