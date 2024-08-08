const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');

const port = 3000;
const app = new express;

app.set('view engine', 'ejs');
app.set('view', '/view')

mongoose.connect('http://localhost:27014/wd18412')
    .then(resulth => {
        app.get('/list', ProductController.getList)
        app.create('/create', ProductController.create)
        app.post('/save', ProductController.save)
        app.get('/details', ProductController.getDetail)
        app.put('/edit/:id', ProductController.update)
    })
        .catch(err => {
            console.error(err)
        })