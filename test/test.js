const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('should');
const app = require('../app');

chai.use(chaiHttp);

// Nossa suite de teste relacionada a artigos
describe('Produtos', () => {

    // No describe podemos passar um texto para identificação 
    describe('/GET Produtos', () => {
        it('Testando GET todos os Produtos', (done) => {
            chai.request(app) // Endereço do servidor
                .get('/noauth/product/list') // endpoint que vamos testar
                .end((err, res) => { // testes a serem realizados
                    should.exist(res.body);
                    //res.should.have.status(200); // verificando se o retorno e um status code 200
                    //should(res.body).be.a('array'); // Verificando se o retorno e um array
                    done();
                });
        });
    });

    describe('/POST Produtos', () => {
        it('Verificar o cadastro de Produtos', (done) => {
            let product = { // Vamos deinir o artigo que vamos inserir
                Title: "Meu Produto",
                description: "Descrição do produto",
                price: 10,
                category:"T"
            }
            chai.request(app)
                .post('/noauth/product/register')
                .send(product) // vamos enviar esse arquivo
                .end((err, res) => {
                    should.exist(res.body);
                    //res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/PUT/:id Produto', () => {
        it('PUT em Produtos por ID', (done) => {
            let id_ = "60133e9001995705e4e35cc0";
            let product = { // Vamos deinir o artigo que vamos inserir
                Title: "Meu Produto teste editado",
                description: "Descrição do produto",
                price: 10,
                category: "T"
            }
            chai.request(app)
                .put('noauth/product/edit/' + id_)
                .send(product)
                .end((err, res) => {
                    should.exist(res.body);
                    res.body.should.have.property('id_').eql(id_); // Verificamos se existe a propriedade id_, e se ela e igual a id_ criada
                    done();
                });

        });
    });
})