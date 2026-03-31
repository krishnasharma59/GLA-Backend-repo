// dependencies
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';

//files
import login from "./modules/login.js";
import signUp from "./modules/signUp.js";
import auth from "./modules/auth.js";
import postAdd from './modules/addPost.js';
import likePost from "./modules/likes.js";
//import comment from "./modules/commentPost.js";
//running dependencies
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
let port = process.env.PORT || 8001
//testing
app.post("/login",login);
app.post("/signUp",signUp);
app.post("/AddPost",auth,postAdd);
app.post("/likes/:id",auth,likePost);
//app.post("/comments/:id",auth,comment);
//checking connection
app.listen(port, ()=>{
    console.log("Server Connected on the port");
})
