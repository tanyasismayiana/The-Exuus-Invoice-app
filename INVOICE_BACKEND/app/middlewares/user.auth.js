//importing modules
const express = require("express");
const db = require("../models");
const jwt = require("jsonwebtoken");
//Assigning db.users to User variable
 const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const username = await User.findOne({
     where: {
       userName: req.body.userName,
     },
   });
   //if username exist in the database respond with a status of 409
   if (username) {
     return res.json(409).send("username already taken");
   }

   //checking if email already exist
   const emailcheck = await User.findOne({
     where: {
       email: req.body.email,
     },
   });

   //if email exist in the database respond with a status of 409
   if (emailcheck) {
     return res.json(409).send("Authentication failed");
   }

   return next();
 } catch (error) {
   console.log('ahana',error);
 }
};



const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization" || "Authorization"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const verify = jwt.verify(token, process.env.secretKey);

    const findUser = await User.findOne({ where: { id: verify.id } });

    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    req.user = findUser;

    return next();
  } catch (error) {
    return next(error);
  }
};

//exporting module
 module.exports = {
 saveUser,
 isAuth
};
