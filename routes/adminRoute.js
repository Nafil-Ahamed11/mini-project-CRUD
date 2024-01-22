const express= require("express");
const admin_route=express();

const config=require('../config/config');

const session=require("express-session");

admin_route.use(session({secret:config.sessionSecret}));


const bodyParser=require('body-parser');

admin_route.use(bodyParser.json());

admin_route.use(bodyParser.urlencoded({extended:true}));

admin_route.set('view engine', 'ejs');
admin_route.set('views','./views/admin');

const multer=require("multer");

const path=require("path");

admin_route.use(express.static('public'))

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

const auth=require('../middleware/adminAuth');
const adminController=require("../controller/adminController");


admin_route.get('/',auth.isLogout,adminController.loadLogin);



admin_route.post('/',adminController.verifyLogin);

admin_route.get('/home',auth.isLogin,adminController.loadDashboard);

admin_route.get('/logout',auth.isLogin,adminController.logout)


admin_route.get('/dashboard',adminController.adminDashboard);

admin_route.get('/new-user',auth.isLogin,adminController.newUserLoad);

admin_route.post('/new-user',upload.single('image'),adminController.addUser);

admin_route.get('/edit-user',auth.isLogin,adminController.editUserLoad);

admin_route.post('/edit-user',adminController.UpdateUsers);

admin_route.get('/delete-user',adminController.deleteUser);

admin_route.get('*',function(req,res){
    res.redirect('/admin');

});







module.exports=admin_route;
