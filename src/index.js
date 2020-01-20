const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');

const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-2yvuh.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
// informa ao express que a linguagem que será trocada será JSON
app.use(express.json());
//importa as rotas
app.use(routes);

//IMPORTANTE: a leitura do express é sequencial, logo, a ordem de utilização dos módulos interfere no funcionamento.

//MongoDB (Não - Relacional)
server.listen(3333); //Definindo a porta que a aplicação está escutando
