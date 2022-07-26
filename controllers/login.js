const { user } = require('../models');
const bcrypt = require("bcrypt");

// import jwt
const jwt = require('jsonwebtoken');

//import jwt config
const jwtConfig = require('../config/jwt'); 

const login = async (req,res)=>{
    try {
        const data = await user.findOne({
            where : {username: req.body.username}
        });
    
       
        try {
           const isPasswordMatch = await bcrypt.compare(req.body.password, data.password);
        } catch (error) {
            return res.status(500).json({message:"login gagal, password salah"});
        }
        
        const tokenPayload = {
            id: data.id,
            username: data.username,
            email: data.username
        }

        const token = jwt.sign(tokenPayload,jwtConfig.JWT_SECRET);
        const datapas = !data.password==req.body.password;

        return res.status(200).redirect('http://localhost:4000')

    } catch (error) {
        return res.status(400).json({message: "username salah",})
    }
}

// controller untuk login method POST untuk user (cek email dan pass)
    // NOTE: Belum ada generator dan simpan TOKEN
const loginPost = async(req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
  
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

    const encrypredPassword = await bcrypt.compare(password, userData.password);

    if (!encrypredPassword) { // dilanjutkan mengecek password, apabila password pada email yg digunakan salah maka:
        // return res.json({message: "wrong password",})
        return res.json({message: "wrong password",}).status(400)
    }

    return res.json({message: "login success",}).status(200) // apabila pass sesuai maka login berhasil dan berikan message sukses
}

module.exports= loginPost;