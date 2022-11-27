//importing modules
const express = require('express')
const invoiceController = require('../controllers/invoice.controller')
const { createInvoice, getAllInvoice, updateInvoice, deleteInvoice } = invoiceController
const { body } = require("express-validator");
const { isAuth } = require('../middlewares/user.auth');

const router = express.Router()


// create invoice
const createInvoiceRule = [
    body("title").notEmpty().withMessage("Title is required"),
    body("status").notEmpty().withMessage("Status is required").custom((value)=>{
      const status = ['paid', 'outstanding', 'late'];

      if(!status.includes(value.toLowerCase())){
         return Promise.reject(`Status should be either ${status.join(',')} `)
      }

      return true;
    }),
    body("hoursOfWork")
      .notEmpty()
      .withMessage("HoursOfWork is required")
      .isNumeric({ no_symbols: true })
      .withMessage("HoursOfWork must be a number"),
    body("rate")
      .notEmpty()
      .withMessage("Rate is required")
      .isNumeric()
      .withMessage("Rate must be a number"),
  ];

  router.post("/", isAuth ,createInvoiceRule, createInvoice);
  router.put("/:invoiceId", isAuth ,createInvoiceRule, updateInvoice);
  router.delete("/:invoiceId", isAuth, deleteInvoice);
  router.get("/", isAuth , getAllInvoice);
  
  module.exports = router;
  