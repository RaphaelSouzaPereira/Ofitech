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

    //let avaliacao = await Avaliacao.findOne({ userId, mecanicaId });

    //if (!avaliacao) {
    avaliacao = await Avaliacao.create({
      descricao,
      nota,
      valor,
      userId,
      genero,
      mecanicaId,
    });
    //}
    const apiResponse = await axios.put("http://localhost:3031/api/mecanica", {
      mecanicaId: mecanicaId,
    });
    console.log("Avaliacao completa");
    return response.status(204).json(avaliacao);
  },

  async mediaAvaliacoes(request, response) {
    const { mecanicaId } = request.query;
    console.log("teste");
    console.log(mecanicaId);

    let listaAvaliacoes = await Avaliacao.find({
      mecanicaId: {
        $in: mecanicaId, //busca por todos os filtros
      },
    });

    let contador = 0;
    let valorTotalDasAvaliacoes = 0;
    let valorTotalDosPrecos = 0;
    let mediaAvaliacoes = 0;
    let mediaPrecos = 0;

    await listaAvaliacoes.map(function (element) {
      contador++;
      valorTotalDasAvaliacoes += element.nota;
      valorTotalDosPrecos += element.valor;
      console.log(contador);
      console.log(valorTotalDasAvaliacoes);
      console.log(valorTotalDasAvaliacoes);
    });
    mediaAvaliacoes = valorTotalDasAvaliacoes / contador;
    mediaPrecos = valorTotalDosPrecos / contador;
    console.log(mediaAvaliacoes)
    console.log(mediaPrecos)
    return response.json({ mediaAvaliacoes, mediaPrecos });
  },

  async seloFeminino(request, response) {
    const { mecanicaId } = request.query;
    console.log(mecanicaId);
    let listaAvaliacoes = await Avaliacao.find({
      mecanicaId: {
        $in: mecanicaId, //busca por todos os filtros
      },
    });
    let feminino = "feminino";
    let contador = 0;
    let valorTotalDasAvaliacoesFemininas = 0;
    let mediaAvaliacoes = 0;

    listaAvaliacoes.map(function (element) {
      var genero = element.genero;
      console.log(genero);
      console.log(feminino);
      console.log(genero == feminino);
      if (genero == feminino) {
        contador++;
        valorTotalDasAvaliacoesFemininas += element.nota;
        console.log(contador);
        console.log(valorTotalDasAvaliacoesFemininas);
      }
    });
    mediaAvaliacoes = valorTotalDasAvaliacoesFemininas / contador;

    if (mediaAvaliacoes >= 4) {
      return response.json(true);
    }
    console.log("Terminei log");
    return response.json(false);
  },
};
