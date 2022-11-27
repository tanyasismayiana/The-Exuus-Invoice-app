//importing modules
const express = require('express')
const userController = require('../controllers/user.controller')
const { signup, login } = userController
const userAuth = require('../middlewares/user.auth');
const { body } = require('express-validator');

const router = express.Router()

const signupRules = [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail().withMessage('Email must be valid')
      .custom(async (value) => {
        const findEmail = await User.findOne({ where: { email: value } });
        if (findEmail) {
          throw new Error("Email already exists");
        }
  
        return true;
      }),
    body("username")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Username is required"),
    body("password")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password must be more than 5 characters"),
  ];
//signup endpoint
//passing the middleware function to the signup
router.post('/signup', signupRules, signup)

const loginRules = [
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail().withMessage('Email must be valid'),
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Password is required"),
];
//login route
router.post('/login', loginRules,login )

module.exports = router

