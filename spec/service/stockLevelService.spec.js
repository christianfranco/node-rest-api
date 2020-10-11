const integrationTest = require("../integrationTest");
const stockLevelService = require('../../src/service/stockLevelService');
const { buildStockLevel } = require('../../src/model/stockLevel');

describe('Test stockLevelService create: ', () => {
    beforeAll(async () => {
        await integrationTest.connectDB();
    });

    afterAll(async () => {
        await integrationTest.clearDB();
        await integrationTest.disconnectDB();
    });

    it('create success', async () => {
        let newStock = await stockLevelService.createStockLevel(buildStockLevel("Test", 30, Date.now()));

        expect(newStock.productName).toBe('Test');
    });

    it('create error empty', () => {
        expect(() => stockLevelService.createStockLevel('')).toThrow(new Error('stockLevelData cannot be empty.'));
    });
});