const Mecanica = require("../models/Mecanica");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async get(request, response) {
    const { latitude, longitude, servicos } = request.query;
    let mecanicas;

    if (typeof servicos !== "undefined" && servicos !== null) {
      const servicosArray = parseStringAsArray(servicos);

      mecanicas = await Mecanica.find({
        servicos: {
          $in: servicosArray, //busca por serviços
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 10000,
          },
        },
      });
    } else {
      mecanicas = await Mecanica.find({
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 10000,
          },
        },
      });
    }

    return response.json({ mecanicas });
  },
};
