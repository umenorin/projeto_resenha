// backend/app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/projetoResenha', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
})
  .then(() => {
    console.log('Conexão com o Mongo feita com sucesso');
  })
  .catch((error) => {
    console.log("ERROR: " + error);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); // Adicione esta linha para permitir todas as solicitações CORS

app.use('/user', userRoutes);
app.use('/book', bookRoutes);

app.use(function (req, res, next) {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro no servidor' });
});

app.get('/api/books/recommended', (req, res) => {
  // Aqui você faria uma consulta ao banco de dados para obter livros recomendados
  const recommendedBooks = [
    { title: 'O Alquimista', author: 'Paulo Coelho', imageUrl: 'path/to/image1.jpg' },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', imageUrl: 'path/to/image2.jpg' },
    // Outros livros recomendados
  ];
  
  res.json(recommendedBooks);
});

module.exports = app;