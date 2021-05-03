const config = require("../config/config");

var urlDbAnotaAi = config.urlBase;

console.log("VERSAO::" + mongoose.version);

const connect = async () => {
  anotaai = mongoose.connect(urlDbAnotaAi, {
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