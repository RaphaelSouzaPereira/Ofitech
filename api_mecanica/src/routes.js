const { Router } = require("express");
const MecanicaController = require("./controllers/MecanicaController");
const routes = Router();

routes.post("/api/mecanica", MecanicaController.store);

module.exports = routes;
