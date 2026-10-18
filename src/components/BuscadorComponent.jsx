import React, { Component } from 'react'
import EquiposService from '../service/EquiposService'
import JugadoresService from '../service/JugadoresService';
import JugadoresComponent from './JugadoresComponent';

export default class BuscadorComponent extends Component {

    service = new EquiposService();
    jugadoresService = new JugadoresService();

    cajaNombre = React.createRef();
    selectEquipo = React.createRef();

    state = {
        equipos: [],
        idEquipo: -1,
        nombre: ""
    }

    loadEquiposSelect = async () => {
        let datos = await this.service.getAllTeams();
        this.setState({
            equipos: datos
        })
        console.log(datos);
    }

    searchByName = async (event) => {
        event.preventDefault();
        let nombre = this.cajaNombre.current.value.trim();
        this.setState({
            nombre: nombre,
            idEquipo: -1
        })
    }

    searchByTeam = async (event) => {
        event.preventDefault();
        let equipoId = this.selectEquipo.current.value;
        this.setState({
            idEquipo: equipoId,
            nombre: ""
        })
    }

    componentDidMount = async () => {
        await this.loadEquiposSelect();
    }


    render() {
        return (
            <div>
                <h1>Buscador de jugadores</h1>
                <form onSubmit={this.searchByName}>
                    <label>Nombre del jugador:</label>
                    <input type='text' ref={this.cajaNombre} className='form-control' />

                    <button className='btn btn-primary'>Buscar jugadores</button>
                    <br /><br />
                </form>
                <form onSubmit={this.searchByTeam}>
                    <label>Seleccione equipo:</label>
                    <select ref={this.selectEquipo}>
                        {
                            this.state.equipos.map((eq, index) => {
                                return (<option value={eq.idEquipo} key={index}>{eq.nombre}</option>)
                            })
                        }
                    </select>
                    <br />
                    <button className='btn btn-primary'>Buscar por equipo</button>
                </form>

                {this.state.nombre && <JugadoresComponent nombre={this.state.nombre} />}
                {this.state.idEquipo != -1 && <JugadoresComponent idEquipo={this.state.idEquipo} />}
            </div>
        )
    }
}
