import React, { Component } from 'react'
import ApuestasService from '../service/ApuestasService'
import { NavLink } from 'react-router-dom';

export default class ApuestasComponent extends Component {

    service = new ApuestasService();

    cajaID = React.createRef();

    state = {
        apuestas: [],
        apuesta: null,
        mensaje: ""
    }

    loadApuestas = async () => {
        let datos = await this.service.getAllApuestas();
        this.setState({
            apuestas: datos
        })

        console.log(datos);
    }

    deleteApuestaById = async (event) => {
        event.preventDefault();
        let id = this.cajaID.current.value;

        if (id) {
            try {
                await this.service.deleteApuestaById(id);
                await this.loadApuestas();
                this.setState({
                    mensaje: ""
                })
            } catch (error) {
                this.setState({
                    mensaje: "Error al borrar la apuesta " + id + "- " + error
                })
            }
        }
    }

    componentDidMount = async () => {
        await this.loadApuestas();
    }

    render() {
        return (
            <div>
                {
                    this.state.apuestas ? (
                        <div>
                            <h1>Apuestas</h1>
                            <NavLink to={"/nueva-apuesta"} className='btn btn-dark'>Realizar apuesta</NavLink>
                            <br /><br />

                            <div>
                                <h3>Eliminar apuesta</h3>
                                <form>
                                    <label>ID de la apuesta: </label>
                                    <input type='number' ref={this.cajaID} />
                                    {/** Como quiero borrar la apuesta que he puesto en el input, podría ponerlo así (SIN PARÉNTESIS): button onClick={this.deleteApuestaById} 
                                     * Si fuese de mostrar el botón de borrar en una tabla en cada línea de la apuesta por ejemplo, tendría que ponerse: <button onClick={() => this.deleteApuesta(ap.idApuesta)}>Eliminar</button>
                                    */}
                                    <button onClick={(event) =>
                                        this.deleteApuestaById(event)
                                    } className='btn btn-danger'>Eliminar</button>
                                </form>
                            </div>
                            <br />
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Resultado</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.apuestas.map((ap, index) => {
                                            return (<tr key={index}>
                                                <td>{ap.usuario}</td>
                                                <td>{ap.resultado}</td>
                                                <td>{ap.fecha}</td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table></div>
                    ) : (
                        <p>Cargando apuestas...</p>
                    )
                }
            </div>
        )
    }
}
