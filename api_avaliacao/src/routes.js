const { Router } = require("express");
const AvaliacaoController = require("./controllers/AvaliacaoController");
const routes = Router();

routes.get("/api/avaliacao", AvaliacaoController.index);
routes.post("/api/avaliacao", AvaliacaoController.store);
routes.get("/api/seloFeminino", AvaliacaoController.seloFeminino);
routes.get("/api/mediaAvaliacoes", AvaliacaoController.mediaAvaliacoes);

module.exports = routes;
