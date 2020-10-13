const stockLevelInfo = require('../../src/data/stockLevelInfo')
const { StockLevel, buildStockLevel } = require('../../src/model/stockLevel');
const STOCK_AVAILABILITY = stockLevelInfo.STOCK_AVAILABILITY;

const chai = require('chai');
const should = chai.should();
const { expect } = chai;

describe('Test Stock Availability State Machine', () => {

    it('Should be Availability -> OUT', () => {
        let stock = buildStockLevel("test", 0, Date.now());
        let stockInfo = stockLevelInfo.mapStockLevelInfo(stock);

        expect(stockInfo.stockLevelAvailability).to.equal(STOCK_AVAILABILITY.OUT);
    })

    it('Should be Availability -> LOW', () => {
        let stock = buildStockLevel("test", 5, Date.now());
        let stockInfo = stockLevelInfo.mapStockLevelInfo(stock);

        expect(stockInfo.stockLevelAvailability).to.equal(STOCK_AVAILABILITY.LOW);
    })

    it('Should be Availability -> MEDIUM', () => {
        let stock = buildStockLevel("test", 15, Date.now());
        let stockInfo = stockLevelInfo.mapStockLevelInfo(stock);

        expect(stockInfo.stockLevelAvailability).to.equal(STOCK_AVAILABILITY.MEDIUM);
    })

    it('Should be Availability -> HIGH', () => {
        let stock = buildStockLevel("test", 16, Date.now());
        let stockInfo = stockLevelInfo.mapStockLevelInfo(stock);

        expect(stockInfo.stockLevelAvailability).to.equal(STOCK_AVAILABILITY.HIGH);
    })
})
