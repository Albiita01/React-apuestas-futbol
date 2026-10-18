import React, { Component } from 'react'
import portada from '../assets/portada.jpg'

export default class HomeComponent extends Component {

    render() {
        return (
            <div>
                <h1>El Clásico - 25/10/2026</h1>
                <img src={portada} height="500px" />
            </div>
        )
    }
}
