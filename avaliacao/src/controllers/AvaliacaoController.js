const axios = require("axios");
const Avaliacao = require("../models/Avaliacao");

module.exports = {
  async index(request, response) {
    const { mecanicaId } = request.params;
    const avaliacao = await Avaliacao.findByMecanicaId({ mecanicaId });
    return response.json(avaliacao);
  },

  async store(request, response) {
    const { descricao, nota, valor, userId, genero, mecanicaId } = request.body;

    let avaliacao = await Avaliacao.findOne({ userId, mecanicaId});

    if (!avaliacao) {
      avaliacao = await Avaliacao.create({
        descricao,
        nota,
        valor,
        userId,
        genero,
        mecanicaId
      });
    }

    return response.json(avaliacao);
  },
};
