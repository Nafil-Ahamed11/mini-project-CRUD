const mongoose=require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/user_management_system');
const express=require("express");

const app=express();
const PORT=process.env.PORT||3001;

//for user routes
const userRoute=require('./routes/userRoute');
app.use('/',userRoute);

//for user Admin routes
const adminRoute=require('./routes/adminRoute');
app.use('/admin',adminRoute);

app.listen(PORT,()=>console.log(`server is running on http://127.0.0.1:${PORT}`));