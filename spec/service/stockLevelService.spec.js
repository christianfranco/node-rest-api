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

    it('success', async () => {
        let newStock = await stockLevelService.createStockLevel(buildStockLevel("Test", 30, Date.now()));

        expect(newStock.productName).toBe('Test');
    });

    it('error empty', () => {
        expect(() => stockLevelService.createStockLevel(null)).toThrow(new Error('stockLevelData cannot be null.'));
    });

    it('error length', () => {
        expect(() => stockLevelService.createStockLevel({productName:"ts"})).toThrow(new Error('ProductName length must be between 3 and 60.'));
    });

    it('error quantity negative', () => {
        expect(() => stockLevelService.createStockLevel({productName:"test", quantity: -1})).toThrow(new Error('Quantity must be between 0 and 20_000_000.'));
    });

    it('error quantity overflow', () => {
        expect(() => stockLevelService.createStockLevel({productName:"test", quantity: 20000001})).toThrow(new Error('Quantity must be between 0 and 20_000_000.'));
    });
});