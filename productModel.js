let products = require('./data/products');
const { writeDataToFile } = require('./utils');

function generateId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function findAll() {
    return new Promise((resolve) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve) => {
        const newProduct = { id: generateId(), ...product };
        products.push(newProduct);
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/products.json', products);
        }
        resolve(newProduct);
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            reject(new Error('Product not found'));
            return;
        }
        products[index] = { id, ...product };
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/products.json', products);
        }
        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve) => {
        products = products.filter((p) => p.id !== id);
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/products.json', products);
        }
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
