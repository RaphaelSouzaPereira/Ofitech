import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.25.7:3434',    
});

export default api;
;