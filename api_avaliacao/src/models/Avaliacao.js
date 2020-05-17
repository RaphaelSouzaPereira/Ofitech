const mongoose = require("mongoose");

const AvaliacaoSchema = new mongoose.Schema(
  {
    descricao: String,
    nota: String,
    valor: String,
    userId: String,
    genero: String,
    mecanicaId: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Avaliacao", AvaliacaoSchema);
