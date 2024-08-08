const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getRegister = (req, res) => {
    res.render('register');
}

exports.getLogin = (req, res) => {
    res.render('login');
}


exports.register = async (req,res) => {
    try {
        //kiểm tra email đã tồn tại trong hệ thống hay chưa
        var existedEmail = await User.findOne({ email: req.body.email });
        if (existedEmail) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        var hashedPassword = await bcrypt.hash(req.body.password,10); //mã hóa password với bcrypt
        //lưu dữ liệu vào trong database
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).redirect('/login')({
            message: 'Đăng ký thành công' ,
            data: newUser,
        })
    } catch (err) {
        res.status(400).render('register', { message: 'Đăng ký thất bại' });
    }
}

// API Register
exports.APIregister = async (req,res) => {
    try {
        //kiểm tra email đã tồn tại trong hệ thống hay chưa
        var existedEmail = await User.findOne({ email: req.body.email });
        if (existedEmail) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }
        console.log(req.body);
        var hashedPassword = await bcrypt.hash(req.body.password,10); //mã hóa password với bcrypt
        //lưu dữ liệu vào trong database
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).json({ 
            message: 'Đăng ký thành công' ,
            data: newUser,
        })
    } catch {
        res.status(400).json({ message: 'Error' });
    }
}

//API Login
exports.APIlogin = async (req,res) => {
    try {
        //lấy username/password
        const { email, password } = req.body;

        //kiểm tra có user tương ứng với mail đã nhập hay không?
        const user = await User.findOne({ email });
        if (!user) { //không tồn tại user thì báo lỗi
            return res.status(404).json({ message: 'Email không tồn tại'})
        }

        //kiểm tra password có khớp vs hashpassword trong db hay không
        const checkPassword = await bcrypt.compare(password,user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Email/password không đúng'});
        }

        //sử dụng hàm sign(data, secretKey, {expiresIn: }) để tạo token
        // expiresIn: 60*60*24 | expiresIn: '1h/1d';
        const token = jwt.sign({id: user.id}, 'wd18411', { expiresIn: '1h'});
        res.status(200).json({
            message: 'Đăng nhập thành công',
            token
        })
    } catch {
        res.status(400).json({ message: 'Error' });
    }
}

exports.login = async (req,res) => {
    try {
        //lấy username/password
        const { email, password } = req.body;
        console.log(req.body);

        //kiểm tra có user tương ứng với mail đã nhập hay không?
        const user = await User.findOne({ email });
        if (!user) { //không tồn tại user thì báo lỗi
            return res.status(404).json({ message: 'Email không tồn tại'})
        }

        //kiểm tra password có khớp vs hashpassword trong db hay không
        const checkPassword = await bcrypt.compare(password,user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Email/password không đúng'});
        }

        //sử dụng hàm sign(data, secretKey, {expiresIn: }) để tạo token
        // expiresIn: 60*60*24 | expiresIn: '1h/1d';
        const token = jwt.sign({id: user.id}, 'wd18411', { expiresIn: '1h'});
        res.status(200).redirect('/list')({
            message: 'Đăng nh thành công' ,
            token,
        })
    } catch {
        res.status(400).json({ message: 'Error' });
    }
}