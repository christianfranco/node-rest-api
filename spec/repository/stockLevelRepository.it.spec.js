const integrationTest = require("../integrationTest");
const stockLevelRepository = require('../../src/repository/stockLevelRepository');
const { buildStockLevel } = require('../../src/model/stockLevel');

describe('Integration Tests DB: ', () => {
    beforeAll(async () => {
        await integrationTest.connectDB();
    });

    afterAll(async () => {
        await integrationTest.clearDB();
        await integrationTest.disconnectDB();
    });

    it('Save', async () => {
        let lastUpdate = new Date(Date.now());
        let saved = await stockLevelRepository.save(buildStockLevel("Test1", 10, lastUpdate));

        expect(saved['productName']).toBe('Test1');
        expect(saved['quantity']).toBe(10);
        expect(new Date(saved['lastUpdate']).getTime()).toEqual(lastUpdate.getTime());
    });

    it("Update", async () => {
        await stockLevelRepository.save(buildStockLevel("Test2", 20, Date.now()));

        let updatedStock = await stockLevelRepository.update("Test2", 40);

        expect(updatedStock.productName).toBe('Test2');
        expect(updatedStock.quantity).toBe(40);
    });

    it("find by name", async () => {
        await stockLevelRepository.save(buildStockLevel("Test3", 50, Date.now()));

        let updatedStock = await stockLevelRepository.findByName("Test3");

        expect(updatedStock.productName).toBe('Test3');
    });
});