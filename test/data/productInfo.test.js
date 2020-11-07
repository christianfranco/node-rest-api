const productInfo = require('../../src/data/productInfo')
const { Product, buildProduct } = require('../../src/model/product');
const PRODUCT_AVAILABILITY = productInfo.PRODUCT_AVAILABILITY;

const chai = require('chai');
const { expect } = chai;

describe('Test Product Availability State Machine', () => {

    it('Should be Availability -> OUT', () => {
        let product = buildProduct("test", 0, Date.now());
        let productMapped = productInfo.mapProductInfo(product);

        expect(productMapped.productAvailability).to.equal(PRODUCT_AVAILABILITY.OUT);
    });

    it('Should be Availability -> LOW', () => {
        const product = buildProduct("test", 5, Date.now());
        const productMapped = productInfo.mapProductInfo(product);

        expect(productMapped.productAvailability).to.equal(PRODUCT_AVAILABILITY.LOW);
    });

    it('Should be Availability -> MEDIUM', () => {
        const product = buildProduct("test", 15, Date.now());
        const productMapped = productInfo.mapProductInfo(product);

        expect(productMapped.productAvailability).to.equal(PRODUCT_AVAILABILITY.MEDIUM);
    });

    it('Should be Availability -> HIGH', () => {
        let product = buildProduct("test", 16, Date.now());
        let productMapped = productInfo.mapProductInfo(product);

        expect(productMapped.productAvailability).to.equal(PRODUCT_AVAILABILITY.HIGH);
    });
})
