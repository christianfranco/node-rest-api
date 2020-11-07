const productService = require('../../src/service/productService');
const { buildProduct } = require('../../src/model/product');
const productInfo = require('../../src/data/productInfo')

const chai = require('chai');
const e = require('express');
const { expect } = chai;

const { v4: uuidv4 } = require('uuid');

describe('Test createProduct', () => {
    it('createProduct ok', async () => {
        const name = uuidv4();
        const newProduct = await productService.createProduct(buildProduct(name, 30, Date.now()));

        expect(newProduct.productName).to.equal(name);
    });

    it('error empty', () => {
        expect(() => productService.createProduct(null))
            .to.throw('productData cannot be null.');
    });

    it('error length', () => {
        expect(() => productService.createProduct({ productName: "ts" }))
            .to.throw('ProductName length must be between 3 and 60.');
    });

    it('error quantity negative', () => {
        expect(() => productService.createProduct({ productName: "test", quantity: -1 }))
            .to.throw('Quantity must be between 0 and 20_000_000.');
    });

    it('error quantity overflow', () => {
        expect(() => productService.createProduct({ productName: "test", quantity: 20000001 }))
            .to.throw('Quantity must be between 0 and 20_000_000.');
    });
});

describe('Test updateQuantity', () => {
    it('updateQuantity ok', async () => {
        const name = uuidv4();

        await productService.createProduct(buildProduct(name, 70, Date.now()));

        const updated = await productService.updateQuantity(name, 10);

        expect(updated.quantity).to.equal(60);
    });
});

describe('Test checkProduct', () => {
    it('checkProduct ok', async () => {
        const name = uuidv4();

        await productService.createProduct(buildProduct(name, 80, Date.now()));

        const product = await productService.checkProduct(name);

        expect(product.productName).to.equal(name);
        expect(product.productAvailability).to.equal(productInfo.PRODUCT_AVAILABILITY.HIGH);
    });
});

describe('Test deleteProduct', () => {
    it('delete ok', async () => {
        const name = uuidv4();

        await productService.createProduct(buildProduct(name, 80, Date.now()));

        const deleteInfo = await productService.deleteProduct(name);

        expect(deleteInfo.deletedCount).to.equal(1);
    });
});
