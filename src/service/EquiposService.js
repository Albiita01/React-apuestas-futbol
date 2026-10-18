import axios from "axios";
import Global from "../Global";

export default class EquiposService {

    async getAllTeams() {
        let url = Global.urlApiFutbol;
        let request = "api/equipos"
        let response = await axios.get(url + request);
        return response.data;
    }

    async getTeamById(id) {
        let url = Global.urlApiFutbol;
        let request = "api/equipos/" + id;
        let response = await axios.get(url + request);
        return response.data;
    }
}
