const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");
const cors = require('cors'); 

const app = express();

mongoose.connect('mongodb+srv://BuscaMecaninas:admin@cluster0-xok1n.mongodb.net/buscaMecanica?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

app.use(cors());
app.use(express.json());
app.use(routes);

//executa localhot:3031
app.listen(process.env.PORT || "3031");
