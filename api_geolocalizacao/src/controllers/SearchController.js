const Mecanica = require("../models/Mecanica");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async get(request, response) {
    const { latitude, longitude, servicos, avaliacao, preco } = request.query;
    let mecanicas;

    if (
      typeof servicos !== "undefined" &&
      servicos !== null &&
      typeof avaliacao !== "undefined" &&
      avaliacao !== null &&
      typeof preco !== "undefined" &&
      preco !== null
    ) {
      const servicosArray = parseStringAsArray(servicos);
      mecanicas = await Mecanica.find({
        servicos: {
          $in: servicosArray, //busca por todos os filtros
        },
        avaliacao: {
          $gte: avaliacao, //busca por todos os filtros
        },
        preco: {
          $gte: preco, //busca por todos os filtros
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    } else if (
      typeof servicos == "undefined" &&
      servicos == null &&
      typeof avaliacao !== "undefined" &&
      avaliacao !== null &&
      typeof preco !== "undefined" &&
      preco !== null
    ) {
      mecanicas = await Mecanica.find({
        avaliacao: {
          $gte: avaliacao, //busca por todos os filtros
        },
        preco: {
          $gte: preco, //busca por todos os filtros
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    } else if (
      typeof servicos !== "undefined" &&
      servicos !== null &&
      typeof avaliacao == "undefined" &&
      avaliacao == null &&
      typeof preco !== "undefined" &&
      preco !== null
    ) {
      const servicosArray = parseStringAsArray(servicos);
      mecanicas = await Mecanica.find({
        servicos: {
          $in: servicosArray, //busca por todos os filtros
        },
        preco: {
          $gte: preco, //busca por todos os filtros
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    } else if (
      typeof servicos !== "undefined" &&
      servicos !== null &&
      typeof avaliacao !== "undefined" &&
      avaliacao !== null &&
      typeof preco == "undefined" &&
      preco == null
    ) {
      const servicosArray = parseStringAsArray(servicos);
      mecanicas = await Mecanica.find({
        servicos: {
          $in: servicosArray, //busca por todos os filtros
        },
        avaliacao: {
          $gte: avaliacao, //busca por todos os filtros
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    } else if (
      typeof servicos !== "undefined" &&
      servicos !== null &&
      typeof avaliacao == "undefined" &&
      avaliacao == null &&
      typeof preco == "undefined" &&
      preco == null
    ) {
      const servicosArray = parseStringAsArray(servicos);
      mecanicas = await Mecanica.find({
        servicos: {
          $in: servicosArray, //busca por todos os filtros
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    } else if (
      typeof servicos == "undefined" &&
      servicos == null &&
      typeof avaliacao !== "undefined" &&
      avaliacao !== null &&
      typeof preco == "undefined" &&
      preco == null
    ) {
      mecanicas = await Mecanica.find({
        avaliacao: {
          $gte: avaliacao, //busca por todos os filtros
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    } else if (
      typeof servicos == "undefined" &&
      servicos == null &&
      typeof avaliacao == "undefined" &&
      avaliacao == null &&
      typeof preco !== "undefined" &&
      preco !== null
    ) {
      mecanicas = await Mecanica.find({
        preco: {
          $gte: preco, //busca por todos os filtros
        },
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    } else {
      mecanicas = await Mecanica.find({
        location: {
          $near: {
            $geometry: {
              //busca a localização
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 3000,
          },
        },
      });
      return response.json({ mecanicas });
    }
  },
};
