const productService = require('../../src/service/productService');
const { buildProduct } = require('../../src/model/product');
const productInfo = require('../../src/data/productInfo')

const chai = require('chai');
const { expect } = chai;

const { v4: uuidv4 } = require('uuid');

describe('ProductService -> create product', () => {
    it('should createProduct', async () => {
        const name = uuidv4();
        const newProduct = await productService.createProduct(buildProduct(name, 30, Date.now()));

        expect(newProduct.productName).to.equal(name);
    });

    it('should throws an error empty', () => {
        expect(() => productService.createProduct(null))
            .to.throw('productData cannot be null.');
    });

    it('should throws an error length', () => {
        expect(() => productService.createProduct({ productName: "ts" }))
            .to.throw('ProductName length must be between 3 and 60.');
    });

    it('should throws an error quantity negative', () => {
        expect(() => productService.createProduct({ productName: "test", quantity: -1 }))
            .to.throw('Quantity must be between 0 and 20_000_000.');
    });

    it('should throws an error quantity overflow', () => {
        expect(() => productService.createProduct({ productName: "test", quantity: 20000001 }))
            .to.throw('Quantity must be between 0 and 20_000_000.');
    });
});

describe('ProductService -> updateQuantity', () => {
    it('should updateQuantity', async () => {
        const name = uuidv4();

        await productService.createProduct(buildProduct(name, 70, Date.now()));

        const updated = await productService.updateQuantity(name, 10);

        expect(updated.quantity).to.equal(60);
    });
});

describe('ProductService -> checkProduct', () => {
    it('should checkProduct', async () => {
        const name = uuidv4();

        await productService.createProduct(buildProduct(name, 80, Date.now()));

        const product = await productService.checkProduct(name);

        expect(product.productName).to.equal(name);
        expect(product.productAvailability).to.equal(productInfo.PRODUCT_AVAILABILITY.HIGH);
    });
});

describe('ProductService -> deleteProduct', () => {
    it('should delete', async () => {
        const name = uuidv4();

        await productService.createProduct(buildProduct(name, 80, Date.now()));

        const deleteInfo = await productService.deleteProduct(name);

        expect(deleteInfo.deletedCount).to.equal(1);
    });
});
