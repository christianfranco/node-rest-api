const productRepository = require('../../src/repository/productRepository');
const { buildProduct } = require('../../src/model/product');

const chai = require('chai');
const { expect } = chai;
const { v4: uuidv4 } = require('uuid');

describe('Test Product Repository: ', () => {
    it('Save', async () => {
        const name = uuidv4();
        const lastUpdate = new Date(Date.now());
        const saved = await productRepository.save(buildProduct(name, 10, lastUpdate));

        expect(saved['productName']).to.equal(name);
        expect(saved['quantity']).to.equal(10);
        expect(new Date(saved['lastUpdate']).getTime()).to.equal(lastUpdate.getTime());
    });

    it("Update", async () => {
        const name = uuidv4();

        await productRepository.save(buildProduct(name, 20, Date.now()));

        const updatedProduct = await productRepository.update(name, 40);

        expect(updatedProduct).to.not.equal(null);
        expect(updatedProduct.productName).to.equal(name);
        expect(updatedProduct.quantity).to.equal(40);
    });

    it("find by name", async () => {
        const name = uuidv4();

        await productRepository.save(buildProduct(name, 50, Date.now()));

        const updatedProduct = await productRepository.findByName(name);

        expect(updatedProduct.productName).to.equal(name);
    });

    it("delete", async() => {
        const name = uuidv4();

        await productRepository.save(buildProduct(name, 20, Date.now()));

        const removed = await productRepository.deleteProduct(name);
        const removedCheck = await productRepository.findByName(name);

        expect(removed.deletedCount).to.equal(1);
        expect(removedCheck).to.equal(null);
    });
});