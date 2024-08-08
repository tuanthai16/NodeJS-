const Product = require('../models/ProductModel');

//lấy danh sách 
exports.getList = async (req,res) => {
    try {
        var products = await Product.find(); //hàm find để lấy danh sách bản ghi
        res.render('list', { pros: products }) //đổ dữ liệu sang giao diện
    } catch (err) {
        console.error(err);
    }
}

//lấy thông tin chi tiết
exports.getDetail = async (req,res) => {
    var id = req.params.id;
    var product = await Product.findById(id);

    res.render('edit', { product });
}

//Product Details
exports.getProductDetail = async (req,res) => {
    var id = req.params.id;
    var product = await Product.findById(id);

    res.render('details', { product });
}

//điều hướng sang form tạo mới
exports.create = (req,res) => {
    res.render('create');
}

//lưu dữ liệu mới vào db
exports.save = async (req,res) => {
    //B1: lấy dữ liệu ng dùng nhập vào form
    var newProduct = {
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename
    }
    //B2: đẩy dữ liệu lên sv
    var product = await 
        Product.create(newProduct);
    if (product) {
        console.log('create successfully');
        res.redirect('/list');
    }
}

//hàm cập nhật
exports.update = async (req,res) => {
    var id = req.params.id;
    //B1: lấy dữ liệu ng dùng nhập vào form
    var updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename
    }
    //B2: đẩy dữ liệu lên sv
    var product = await 
        Product.findByIdAndUpdate(id, updatedProduct);
    if (product) {
        console.log('update successfully');
        res.redirect('/list');
    }
}

//hàm xóa
exports.delete = async (req,res) => {
    var id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.redirect('/list');
}

 // API
 exports.apiGetList = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json({data: products})
    }catch{
        res.status(400).json({data: "Something went wrong"})

    }
}

exports.apiSave = async (req,res) =>{
    var details = {
        name: req.body.name,
        quantity: req.body.quantity,
        image: req.file.filename
    }
    //B2: đẩy dữ liệu lên sv
    var product = await 
        Product.create(details);
    if (product) {
        console.log('create successfully');
        res.redirect('/products');
    }
}

exports.apiDelete = async (req,res) =>{
        var id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }





