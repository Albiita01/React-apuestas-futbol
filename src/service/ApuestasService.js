import axios from "axios";
import Global from "../Global";

export default class ApuestasService {

    async getAllApuestas() {
        let url = Global.urlApiFutbol;
        let request = "api/apuestas";
        let response = await axios.get(url + request);
        return response.data;
    }

    async insertApuesta(apuesta) {
        let url = Global.urlApiFutbol;
        let request = "/api/apuestas";
        try {
            let response = await axios.post(url + request, apuesta);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteApuestaById(id) {
        let url = Global.urlApiFutbol;
        let request = "api/apuestas/" + id;
        try {
            let response = await axios.delete(url + request);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
