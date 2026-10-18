import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import MenuComponent from './components/MenuComponent'
import HomeComponent from './components/HomeComponent'
import ApuestasComponent from './components/ApuestasComponent'
import DetallesEquipoComponent from './components/DetallesEquipoComponent'
import JugadorEquipoComponent from './components/JugadoresEquipoComponent'
import JugadoresEquipoComponent from './components/JugadoresEquipoComponent'
import InsertApuesta from './components/InsertApuesta'

export default class Router extends Component {

    render() {

        function SearchTeamByIdElement() {
            // Este tiene que ser el mismo que el que pongo en el NavLink del Menu ({"/equipos/" + eq.idEquipo})
            let { id } = useParams();
            // Para usar los props (this.props.equipo.idTeam) en DetallesEquipoComponent lo tengo que llamar igual que lo he llamado aquí (idTeam)
            return (<DetallesEquipoComponent idTeam={id} />)
        }

        function SearchJugadoresPorEquipoElement() {
            let { id } = useParams();
            return (<JugadoresEquipoComponent idTeam={id} />)
        }

        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path='/' element={<HomeComponent />} />
                    <Route path='/apuestas' element={<ApuestasComponent />} />
                    <Route path='/equipos/:id' element={<SearchTeamByIdElement />} />
                    <Route path='/jugadores/jugadoresEquipo/:id' element={<SearchJugadoresPorEquipoElement />} />
                    <Route path='/nueva-apuesta' element={<InsertApuesta />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
