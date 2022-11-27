//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res, next) => {
 try {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password } = req.body;
  const data = {
     userName,
     email,
     password: await bcrypt.hash(password, 10),
   };
   //saving the user
   const user = await User.create(data);

   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   if (user) {
     let token = jwt.sign({ id: user.id }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);
     //send users details
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
  return next(error);
 }
};


//login authentication

const login = async (req, res, next) => {
 try {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const { email, password } = req.body;

   //find a user by their email
   const user = await User.findOne({ where: {email} });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: '2h',
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       //send user data
       return res.status(200).json({token, data: user});
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   return next(error);
 }
};

module.exports = {
 signup,
 login,
};
