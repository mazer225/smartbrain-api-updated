const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const Joi = require("@hapi/joi");
require("dotenv/config");
// const multer = require('multer');
// const upload = multer();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const rank = require('./controllers/rank');
const update = require('./controllers/update');
const deletePofile = require('./controllers/deleteProfile');
const profileimage = require('./controllers/profileimage');
const {registerValidation,signinValidation} = require('./controllers/validation');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : 'smartbrain'
  }
});
app.use(bodyParser.json());
app.use(cors());
app.get("/",(req,res)=>{
	res.send('It is Working!');
})


app.post("/signin",(req,res)=>{signin.handleSignin(req,res,db,bcrypt,signinValidation)});
app.post("/register",(req,res) => {register.handleRegister(req,res,db,bcrypt,registerValidation)});
app.get("/profile/:id",(req,res)=>{profile.handleProfile(req,res,db)});
app.post("/rank",(req,res)=>{rank.handleRank(req,res,db)});
app.post("/update",(req,res)=>{update.handleUpdate(req,res,db)});
app.post("/delete",(req,res)=>{deletePofile.handleDelete(req,res,db)});
app.put("/image",(req,res)=>{image.handleImageEntries(req,res,db)});
app.post("/imageurl",(req,res)=>{image.handleApiCall(req,res)});


app.post("/profileimage",(req,res)=>{profileimage.handleProfileImage(req,res,db)});

app.listen(3001);
// app.listen(process.env.PORT || 3001,()=>{
//   console.log(`app is running on port ${process.env.PORT}`);
// });