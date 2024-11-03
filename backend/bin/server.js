var app = require('../app');
var debug = require('debug')('node-rest:server');
const http = require("http");
const { exec } = require("child_process");

const startMongoDB = () => {
  const mongoPath = `"C:\\Program Files\\MongoDB\\Server\\8.0\\bin\\mongod.exe"`;
  const dbPath = `"E:\\UVV\\6° Periodo\\ProgramacaoWEB\\projeto_resenha\\backend\\data\\db"`;

  // Comando para iniciar o MongoDB com o caminho do diretório de dados
  exec(`${mongoPath} --dbpath ${dbPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar o MongoDB: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr do MongoDB: ${stderr}`);
      return;
    }
    console.log(`MongoDB stdout: ${stdout}`);
  });
};

startMongoDB(); // Chama a função para iniciar o MongoDB

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
