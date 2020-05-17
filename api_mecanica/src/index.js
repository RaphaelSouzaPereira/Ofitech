const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors'); 

const app = express();

mongoose.connect('mongodb+srv://BuscaMecaninas:admin@cluster0-xok1n.mongodb.net/buscaMecanica?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3030);
