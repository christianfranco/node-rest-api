const stockLevelRepository = require('../../src/repository/stockLevelRepository');
const { buildStockLevel } = require('../../src/model/stockLevel');

const chai = require('chai');
const { expect } = chai;

describe('Test StockLevel Repository: ', () => {
    it('Save', async () => {
        let lastUpdate = new Date(Date.now());
        let saved = await stockLevelRepository.save(buildStockLevel("Test10", 10, lastUpdate));

        expect(saved['productName']).to.equal('Test10');
        expect(saved['quantity']).to.equal(10);
        expect(new Date(saved['lastUpdate']).getTime()).to.equal(lastUpdate.getTime());
    });

    it("Update", async () => {
        await stockLevelRepository.save(buildStockLevel("Test20", 20, Date.now()));

        let updatedStock = await stockLevelRepository.update("Test20", 40);

        expect(updatedStock.productName).to.equal('Test20');
        expect(updatedStock.quantity).to.equal(40);
    });

    it("find by name", async () => {
        await stockLevelRepository.save(buildStockLevel("Test30", 50, Date.now()));

        let updatedStock = await stockLevelRepository.findByName("Test30");

        expect(updatedStock.productName).to.equal('Test30');
    });

    it("delete", async() => {
        await stockLevelRepository.save(buildStockLevel("Test40", 20, Date.now()));

        let removed = await stockLevelRepository.deleteProduct("Test40");
        let removedCheck = await stockLevelRepository.findByName("Test40");

        expect(removed.deletedCount).to.equal(1);
        expect(removedCheck).to.equal(null);
    });
});