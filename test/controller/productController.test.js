/*
const { buildProduct } = require('../../src/model/product');
const productService = require('../../src/service/productService');
const { app } = require('../../app');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;

chai.use(chaiHTTP);

describe('Test productController: ', () => {
    
    it('post -> create product', (done) => {
        const product = buildProduct('test3000', 20, Date.now());

        chai.request(app)
            .post('/v1/product-level')
            .send(product)
            .end((err, res) => {
                done();
                expect(res).to.have.status(200);
                expect(res.body.productName).to.equals('test3000');
                expect(res.body.quantity).to.equals(20);
            });
    });

    it('put -> update product', (done) => {
        const product = buildProduct('test3000', 40, Date.now());

        productService.createProduct(product)
            .then(() => {
                chai.request(app)
                    .put('/v1/product-level')
                    .send(buildProduct('test3000', 10, Date.now()))
                    .end((err, res) => {
                        done();
                        expect(res).to.have.status(200);
                        expect(res.body.productName).to.equals('test3000');
                        expect(res.body.quantity).to.equals(30);
                    });
            });
    });
});
*/