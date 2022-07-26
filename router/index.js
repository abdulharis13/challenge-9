const router = require("express").Router();
const multer = require('multer');

//PENGATURAN STORAGE UNTUK MULTER
const myStorage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        callback(null, file.originalname); // upload dengan nama asli
    }
});

// middleware untuk upload dengan multer
const upload = multer({ storage: myStorage });

// import controllers
const home = require('../controllers/home');
const register = require('../controllers/register');
const login = require('../controllers/login');
const userCont = require("../controllers/usersController")
const uploadPicture = require('../controllers/upload');

router.get("/", home.index);
router.post("/register", register);
router.post('/login', login);
router.post('/upload', upload.single('photo'), uploadPicture);
router.get("/seeProfile/:id", userCont.seeProfile)
router.get("/leaderpage", userCont.getAllplayer);
router.get("/update-user/:id", userCont.getUpdateprofile);
router.post("/update-user/:id", userCont.postUpdateUser);


module.exports = router;