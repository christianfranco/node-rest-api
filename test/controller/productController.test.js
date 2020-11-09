const { buildProduct } = require('../../src/model/product');
const productInfo = require('../../src/data/productInfo')
const productService = require('../../src/service/productService');
const { app } = require('../../app');
const { v4: uuidv4 } = require('uuid');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const { expect } = chai;

chai.use(chaiHTTP);

describe('ProductContoller -> create product: ', () => {

    it('Should create a new product', (done) => {
        const name = uuidv4();
        const product = buildProduct(name, 20, Date.now());

        chai.request(app)
            .post('/v1/product')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.productName.should.equal(name);
                res.body.quantity.should.equal(20);
                done();
            });
    });
});

describe('ProductContoller -> decrease product quantity: ', () => {

    it('Should update the quantity', (done) => {
        const name = uuidv4();
        const product = buildProduct(name, 40, Date.now());

        productService.createProduct(product)
            .then(() => {
                chai.request(app)
                    .put('/v1/product/decrease/quantity')
                    .send(buildProduct(name, 10, Date.now()))
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.productName.should.equal(name);
                        res.body.quantity.should.equal(30);
                        done();
                    });
            });
    });
});

describe('ProductContoller -> delete product: ', () => {

    it('Should delete a product', (done) => {
        const name = "chris"
        const product = buildProduct(name, 40, Date.now());

        productService.createProduct(product)
            .then(() => {
                chai.request(app)
                    .delete(`/v1/product/${name}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    });
});

describe('ProductContoller -> Get Product: ', () => {

    it('Should get a product', (done) => {
        const name = uuidv4();
        const product = buildProduct(name, 40, Date.now());

        productService.createProduct(product)
            .then(() => {
                chai.request(app)
                    .get(`/v1/product/${name}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.productName.should.equal(name);
                        res.body.productAvailability.should.equal(productInfo.PRODUCT_AVAILABILITY.HIGH);
                        done();
                    });
            });
    });
});
