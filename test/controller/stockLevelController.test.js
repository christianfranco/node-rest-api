const { buildStockLevel } = require('../../src/model/stockLevel');
const stockLevelService = require('../../src/service/stockLevelService');
const { app } = require('../../app');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;

chai.use(chaiHTTP);

describe('Test stockLevelController: ', () => {
    it('post -> create stock', (done) => {
        const stock = buildStockLevel('test3000', 20, Date.now());

        chai.request(app)
            .post('/v1/stock-level')
            .send(stock)
            .end((err, res) => {
                done();
                expect(res).to.have.status(200);
                expect(res.body.productName).to.equals('test3000');
                expect(res.body.quantity).to.equals(20);
            });
    });

    it('put -> update stock', (done) => {
        const stock = buildStockLevel('test3000', 40, Date.now());

        stockLevelService.createStockLevel(stock)
            .then(() => {
                chai.request(app)
                    .put('/v1/stock-level')
                    .send(buildStockLevel('test3000', 10, Date.now()))
                    .end((err, res) => {
                        done();
                        expect(res).to.have.status(200);
                        expect(res.body.productName).to.equals('test3000');
                        expect(res.body.quantity).to.equals(30);
                    });
            });
    })
});
