const express = require('express')
const routes = express.Router()

const authController = require("../controllers/authControllers")


routes.post("/register" , authController.register);
routes.post("/logIn" , authController.logIn);

module.exports = routes
