const express=require("express");
const user_route=express();
const  session= require("express-session");
const config= require('../config/config')
user_route.use(session({secret:config.sessionSecret}));

const auth=require('../middleware/auth');

user_route.set('view engine','ejs');
user_route.set('views','./views/users');

const bodyParser=require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.use(express.static('public'))

const path=require("path");


const multer=require("multer");

user_route.use(express.static('public'))

const storage=multer.diskStorage({
 
    destination:(res,file,cb)=>{
        cb(null,path.join(__dirname,'../public/userImage'));
    },
    filename:(req,file,cb)=>{
        const name=file.originalname+'-'+Date.now();
        cb(null,name);

    }
});

const upload= multer({storage:storage})


const userController=require("../controller/userController")
user_route.get('/register',auth.isLogout,userController.loadRegister);
user_route.post('/register',upload.single('image'),userController.insertUser);

user_route.get('/',auth.isLogout,userController.loginLoad);
user_route.get('/login',auth.isLogout,userController.loginLoad);

user_route.post('/login',userController.veryfyLogin);

user_route.get('/home',auth.isLogin,userController.loadHome);

user_route.get('/logout',auth.isLogin,userController.userLogout);

user_route.get('/edit',auth.isLogin,userController.editLoad);

user_route.post('/edit',upload.single('image'),userController.updateProfile);





module.exports=user_route;