import axios from 'axios';

const apiAvaliacao = axios.create({
    baseURL:'http://192.168.25.7:3030',    
});

export default apiAvaliacao;
;