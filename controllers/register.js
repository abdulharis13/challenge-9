const {user} = require('../models');
const bcrypt = require('bcrypt');

const saltRound = Number(process.env.APP_HASH_ROUND) || 10;

const register = async (req,res)=>{

    try {
            // buat sandi encrypted dengan bcrypt
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRound);

        const data = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword
        });
        
        return res.status(200)
        .json({
            message: "anda berhasil register"
        })
    } catch (err) {
    console.error(err.message);
    }
}


module.exports = register;