const {Sequelize} = require('sequelize');
require("dotenv").config()

module.exports = new Sequelize(
    process.env.BD_NAME,
    process.env.BD_USER,
    process.env.BD_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }

)//

