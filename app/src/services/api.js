import axios from 'axios';

const api = axios.create({
    baseURL:'https://ofitech-geolocalizacao.herokuapp.com/',    
});

export default api;
;