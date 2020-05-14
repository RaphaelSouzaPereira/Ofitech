const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors'); 
const routes = require('./routes');

const app = express();

//conexão com o banco 
mongoose.connect('mongodb+srv://BuscaMecaninas:admin@cluster0-xok1n.mongodb.net/buscaMecanica?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

//conexão com todos os caminhos
app.use(cors());
app.use(express.json());
app.use(routes);

//executa localhot:3434
app.listen(3434);