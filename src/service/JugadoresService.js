import axios from "axios";
import Global from "../Global";

export default class JugadoresService {

    async searchJugadoresByTeam(id) {
        let url = Global.urlApiFutbol;
        let request = "api/jugadores/jugadoresEquipos/" + id;
        let response = await axios.get(url + request);
        return response.data;
    }

}
