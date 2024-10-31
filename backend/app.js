
const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')
const bookAnalystRoutes = require('./routes/bookAnalyst')
const booksData = require('./seeds/booksData'); // Caminho para o arquivo booksData.js
const Book =require('./models/book')

const app = express();
//Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/projetoResenha')
  .then(async () => {
    console.log('Conexão com o Mongo feita com sucesso');

    // Verifica se a coleção está vazia antes de inserir os dados
    const count = await Book.countDocuments();
    if (count === 0) {
      // Insere os livros no banco de dados
      await Book.insertMany(booksData);
      console.log('Seed de livros inserida com sucesso!');
    } else {
      console.log('Os livros já foram inseridos.'); // Mensagem opcional
    }
  })
  .catch((error) => {
    console.log("ERROR: " + error);
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/user',userRoutes)
app.use('/book',bookRoutes)
app.use('/bookAnalyst',bookAnalystRoutes)


// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  return res.render('index');
});

module.exports = app;
