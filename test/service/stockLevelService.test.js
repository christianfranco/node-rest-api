const stockLevelService = require('../../src/service/stockLevelService');
const { buildStockLevel } = require('../../src/model/stockLevel');

const chai = require('chai');
const e = require('express');
const { expect } = chai;

describe('Test stockLevelService create: ', () => {
    it('success', async () => {
        let newStock = await stockLevelService.createStockLevel(buildStockLevel("Test300", 30, Date.now()));

        expect(newStock.productName).to.equal('Test300');
    });

    it('error empty', () => {
        expect(() => stockLevelService.createStockLevel(null))
            .to.throw('stockLevelData cannot be null.');
    });

    it('error length', () => {
        expect(() => stockLevelService.createStockLevel({ productName: "ts" }))
            .to.throw('ProductName length must be between 3 and 60.');
    });

    it('error quantity negative', () => {
        expect(() => stockLevelService.createStockLevel({ productName: "test", quantity: -1 }))
            .to.throw('Quantity must be between 0 and 20_000_000.');
    });

    it('error quantity overflow', () => {
        expect(() => stockLevelService.createStockLevel({ productName: "test", quantity: 20000001 }))
            .to.throw('Quantity must be between 0 and 20_000_000.');
    });
});

describe('Test stockLevelService update quantity', () => {
    it('success', async () => {
        await stockLevelService.createStockLevel(buildStockLevel("Test400", 70, Date.now()));

        let updated = await stockLevelService.updateQuantity("Test400", 10);

        expect(updated.quantity).to.equal(60);
    });
});
