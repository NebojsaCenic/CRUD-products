const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/tezga')
    .then(() => {
        console.log('Connected to mongoose')
    })
    .catch(err => {
        console.log('Not Connected');
        console.log(err)
    });

// const p = new Product({
//     name: 'Grapefruit',
//     price: 1.99,
//     category: 'Fruit'
// })
// p.save()
//     .then(p => console.log(p))
//     .catch(e => console.log(e))

const seedProduct = [{ name: 'Tursija', price: 450, category: 'vegetables'},
                    {name: 'Banane', price: 300, category: 'Fruit'},
                    {name: 'Sir', price: 500, category: 'Dairy'},
                    {name: 'Sljive', price: 270, category: 'fruit'}];

Product.insertMany(seedProduct)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})