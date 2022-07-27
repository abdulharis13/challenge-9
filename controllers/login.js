const { user } = require('../models');
const bcrypt = require("bcrypt");

// import jwt
const jwt = require('jsonwebtoken');

//import jwt config
const jwtConfig = require('../config/jwt'); 

// controller untuk login method POST untuk user (cek email dan pass)
// NOTE: Belum ada generator dan simpan TOKEN
const loginPost = async(req, res) => {
    
    const {username,password} = req.body;
    // mengecek jika email ada di dalam tabel user
    const userData = await user.findOne({
        where: {
            username: username,
        },
    });
    
    if (!userData) { // dilanjutkan mengecek email, apabila email tidak ditemukan maka:        
        // return res.json({message: "wrong username",})
        return res.json({message: "wrong username",}).status(400)
    }
    
    const encryptedPassword = await bcrypt.compare(password, userData.password);
    
    if (!encryptedPassword) { // dilanjutkan mengecek password, apabila password pada email yg digunakan salah maka:
        // return res.json({message: "wrong password",})
        return res.json({message: "wrong password",}).status(400)
    }
    const tokenPayload = {
        id: userData.id,
        username: userData.username,
        email: userData.email
    }
    const token = jwt.sign(tokenPayload,jwtConfig.JWT_SECRET);
    
    return res.status(200).json({ message:"login sukses",
    userData,
    token,    
    }) // apabila pass sesuai maka login berhasil dan berikan message sukses
}

module.exports= loginPost;