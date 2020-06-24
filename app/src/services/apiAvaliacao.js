import axios from 'axios';

const apiAvaliacao = axios.create({
    baseURL:'https://ofitech-avaliacao.herokuapp.com/',    
});

export default apiAvaliacao;
;