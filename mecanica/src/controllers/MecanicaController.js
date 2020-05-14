const axios = require("axios");
const Mecanica = require("../models/Mecanica");

module.exports = {
  store(request, response) {
    const mecanincas = request.body;
    mecanincas.map(async (mecanica) => {
      
      let name = mecanica["name"];
      let telefone = mecanica["telefone"];
      let endereco = mecanica["endereco"];
      let email = mecanica["email"];
      let site = mecanica["site"];
      let servicos = mecanica["servicos"];
      let location = mecanica["location"];

      await Mecanica.create({
        name,
        telefone,
        endereco,
        email,
        site,
        servicos,
        location,
      });
    });

    return response.json();
  },
};
