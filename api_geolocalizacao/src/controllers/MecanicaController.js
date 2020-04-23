const Mecanica = require('../models/Mecanica');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports={

async get(request, response){
    const mecanicas = await Mecanica.find();
    return response.json(mecanicas);
},

async post(request, response){
    //pega os dados enviados pelo json
    const {name, telefone, endereco, email, site, servicos, latitude, longitude} = request.body;
    const servicosArray = parseStringAsArray(servicos);

    const location = {
        type: 'Point',
        coordinates: [longitude,latitude]
    };
    
    //inseri no banco   
    mecanica = await Mecanica.create({
        name,
        telefone, 
        endereco,
        email,
        site,
        servicos: servicosArray,
        location  
    });
    
return response.json(mecanica);

}
};