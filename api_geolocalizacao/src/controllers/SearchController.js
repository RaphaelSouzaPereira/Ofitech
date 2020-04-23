const Mecanica = require('../models/Mecanica');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async get(request, response){
        const{latitude, longitude, servicos} = request.query;
        const servicosArray = parseStringAsArray(servicos);

        const mecanicas = await Mecanica.find({
            servicos:{
                $in: servicosArray, //busca por serviços
            },            
            location: {
                $near:{ 
                    $geometry:{ //busca a localização
                        type: 'Point', 
                        coordinates:[longitude, latitude],
                    },
                $maxDistance: 10000,
                },
            },   

        });

        return response.json({mecanicas: []});

    }
}