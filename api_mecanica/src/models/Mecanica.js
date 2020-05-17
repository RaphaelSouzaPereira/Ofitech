const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const MecanicasSchema = new mongoose.Schema({
  name: String,
  telefone: String,
  endereco: String,
  email: String,
  site: String,
  servicos: [String],
  location: {
    type: PointSchema,
    index: "2dsphere", //tipo de index para ponto de latitude e longitude
  },
});

module.exports = mongoose.model("Mecanicas", MecanicasSchema);
