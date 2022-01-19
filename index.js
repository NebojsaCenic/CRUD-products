const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const { redirect } = require('express/lib/response');

const categories = ['fruit', 'vegetables', 'dairy'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/tezga')
    .then(() => {
        console.log('Connected to mongoose')
    })
    .catch(err => {
        console.log('Not Connected');
        console.log(err)
    });

app.get('/nera', (req, res) => {
    res.send('Does it work?')
})

app.get('/products', async (req, res) => {
    const {category} = req.query;
    if(category) {
        const products = await Product.find({category: category})
        res.render('index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('index', { products, category: 'All' })
    }
    
})

app.get('/products/new', (req, res) => {
    res.render('new', {categories});
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`);
})



app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('details', { product });
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(req.body);
    res.render('edit', { product });
})

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async(req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})