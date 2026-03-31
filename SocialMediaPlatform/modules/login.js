import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import bcrypt from "bcrypt";
import logger from "../logger/logger.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
function login(req, res) {
  try { 
    let { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    
    if (!fs.existsSync("user.json")) {
      return res.status(404).send("No users found");
    }
    
    const fileData = JSON.parse(fs.readFileSync("user.json", "utf-8"));
    const users = fileData ? fileData : [];
    console.log(users);
    let user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).send("Email or password is wrong");
      
    }
    let hasPassword = bcrypt.compareSync(password,user.password)
    if(!hasPassword){
      return res.status(StatusCodes.UNAUTHORIZED.code).json(({message: StatusCodes.UNAUTHORIZED.message}))
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKENKEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({message: "Login successful",
      TOKENKEY: token
    });
  }
    catch(error){
        console.log(error.message);
        logger("error", StatusCodes.INTERNAL_SERVER_ERROR.message)
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
    }
}

export default login;
