//importing modules
const dbConfig = require("../config/db.config.js");
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.invoices = require('./invoice.model')(sequelize, DataTypes);
db.users= require('./user.model')(sequelize, DataTypes);
//db.invoices = require('./invoice.model')(sequelize, DataTypes)

//exporting the module
module.exports = db

