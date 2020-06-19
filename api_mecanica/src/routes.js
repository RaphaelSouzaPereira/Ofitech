const { Router } = require("express");
const MecanicaController = require("./controllers/MecanicaController");
const routes = Router();

routes.post("/api/mecanica", MecanicaController.store);
routes.put("/api/mecanica", MecanicaController.updateReview);

module.exports = routes;
