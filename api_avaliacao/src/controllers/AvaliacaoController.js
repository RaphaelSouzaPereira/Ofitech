const axios = require("axios");
const Avaliacao = require("../models/Avaliacao");

module.exports = {
  async index(request, response) {
    const { mecanicaId } = request.query;
    console.log(mecanicaId);
    const avaliacao = await Avaliacao.find({ mecanicaId: mecanicaId });
    console.log(avaliacao);
    return response.json(avaliacao);
  },

  async store(request, response) {
    const { descricao, nota, valor, userId, genero, mecanicaId } = request.body;

    let avaliacao = await Avaliacao.findOne({ userId, mecanicaId });

    if (!avaliacao) {
      avaliacao = await Avaliacao.create({
        descricao,
        nota,
        valor,
        userId,
        genero,
        mecanicaId,
      });
    }
    const apiResponse = await axios.get(
      "http://localhost:3031/api/mecanica",
      { query: { mecanicaId: mecanicaId } }
    );

    return response.json(avaliacao);
  },

  async mediaAvaliacoes(request, response) {
    const mecanicaId = request.query;

    let listaAvaliacoes = await Avaliacao.findBy(mecanicaId);
    let contador = 0;
    let valorTotalDasAvaliacoes = 0;
    let valorTotalDosPrecos = 0;
    let mediaAvaliacoes = 0;
    let mediaPrecos = 0;

    listaAvaliacoes.map(function (element) {
      contador++;
      valorTotalDasAvaliacoes += element.nota;
      valorTotalDosPrecos += element.valor;
    });
    mediaAvaliacoes = valorTotalDasAvaliacoes / contador;
    mediaPrecos = valorTotalDosPrecos / contador;

    return response.json({ mediaAvaliacoes, mediaPrecos });
  },

  async seloFeminino(request, response) {
    const mecanicaId = request.query;

    let listaAvaliacoes = await Avaliacao.findBy(mecanicaId);
    let contador = 0;
    let valorTotalDasAvaliacoesFemininas = 0;
    let mediaAvaliacoes = 0;

    listaAvaliacoes.map(function (element) {
      if (element.genero == "feminino") {
        contador++;
        valorTotalDasAvaliacoesFemininas += element.nota;
      }
    });
    mediaAvaliacoes = valorTotalDasAvaliacoes / contador;

    if (mediaAvaliacoes >= 4) {
      return response.json(true);
    }

    return response.json(false);
  },
};
