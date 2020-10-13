const stockLevelController = require('../../src/controller/stockLevelController');
const { buildStockLevel } = require('../../src/model/stockLevel');

const chai = require('chai');
const should = chai.should();
const { expect } = chai;

describe('Test stockLevelController create: ', () => {

    it('post create stock', () => {
        const stock = buildStockLevel('test3', 20, Date.now());

        /*
        request.post('http://localhost:4000/v1/product/add',  (err, res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
        */
    })
});