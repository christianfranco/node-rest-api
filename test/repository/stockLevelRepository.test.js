const stockLevelRepository = require('../../src/repository/stockLevelRepository');
const { buildStockLevel } = require('../../src/model/stockLevel');

const chai = require('chai');
const { expect } = chai;

describe('Integration Tests DB: ', () => {
    it('Save', async () => {
        let lastUpdate = new Date(Date.now());
        let saved = await stockLevelRepository.save(buildStockLevel("Test1", 10, lastUpdate));

        expect(saved['productName']).to.equal('Test1');
        expect(saved['quantity']).to.equal(10);
        expect(new Date(saved['lastUpdate']).getTime()).to.equal(lastUpdate.getTime());
    });

    it("Update", async () => {
        await stockLevelRepository.save(buildStockLevel("Test2", 20, Date.now()));

        let updatedStock = await stockLevelRepository.update("Test2", 40);

        expect(updatedStock.productName).to.equal('Test2');
        expect(updatedStock.quantity).to.equal(40);
    });

    it("find by name", async () => {
        await stockLevelRepository.save(buildStockLevel("Test3", 50, Date.now()));

        let updatedStock = await stockLevelRepository.findByName("Test3");

        expect(updatedStock.productName).to.equal('Test3');
    });
});