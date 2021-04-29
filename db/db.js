const config = require("../config/config");

var urlDbAnotaAi = process.env.URLDB || config.urlBase;

console.log("VERSAO::" + mongoose.version);

const connect = async () => {
  anotaai = mongoose.createConnection(urlDbAnotaAi, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  

  return anotaai;
};

module.exports = {
  connect,
};