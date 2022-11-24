//importing modules
const express = require('express')
const invoiceController = require('../controllers/invoice.controller')
const { createInvoice, getAllInvoice } = invoiceController
const { body } = require("express-validator");

const router = express.Router()


// create invoice
const createInvoiceRule = [
    body("title").notEmpty().withMessage("Title is required"),
    body("status").notEmpty().withMessage("Status is required"),
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
  route.post("/", isAuth, createInvoiceRule, createInvoice);
  route.get("/", isAuth, getAllInvoice);
  
  module.exports = router;
  