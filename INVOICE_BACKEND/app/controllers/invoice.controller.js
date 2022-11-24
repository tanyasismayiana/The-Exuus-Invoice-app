//importing modules
const db = require("../models");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

// Assign invoices to the variable Invoice
const Invoice = db.invoices;

//create an Invoice
const createInvoice = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const totalAmount = Number(req.body.hoursOfWork) * Number(req.body.rate);

    const create = await Invoice.create({
      ...req.body,
      owner: req.user.id,
      totalAmount,
      status: req.body.status.toLowerCase(),
    });
    return res
      .status(201)
      .json({ data: create, message: "Invoice created successfully" });
  } catch (error) {
    return next(error);
  }
};

//get all invoices
const getAllInvoice = async (req, res, next) => {
  try {
    const { status } = req.query;

    const where = {
      [Op.and]: [{ owner: req.user.id }, status ? { status } : {}],
    };
    const find = await Invoice.findAll({ where });

    return res.json({ data: find });
  } catch (error) {
    return next(error);
  }
};

const updateInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const totalAmount = Number(req.body.hoursOfWork) * Number(req.body.rate);

    const up = await Invoice.update(
      { ...req.body, status: req.body.status.toLowerCase(), totalAmount },
      {
        where: {
          [Op.and]: [{ id: invoiceId }, { owner: req.user.id }],
        },
        returning: true
      }
    );

    return res.json({message: 'Updated Successfully', data: up[1][0]})
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createInvoice,
  getAllInvoice,
  updateInvoice
};
