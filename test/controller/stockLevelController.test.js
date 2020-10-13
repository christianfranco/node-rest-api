const { buildStockLevel } = require('../../src/model/stockLevel');
const { app } = require('../../app');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;

chai.use(chaiHTTP);

describe('Test stockLevelController: ', () => {
    it('post -> create stock', (done) => {
        const stock = buildStockLevel('test3', 20, Date.now());

        chai.request(app)
            .post('/v1/product/add')
            .send(stock)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.productName).to.equals('test3');
                expect(res.body.quantity).to.equals(20);

                done();
            });
    })
});
