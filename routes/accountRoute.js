// Needed Resources 
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')
const { route } = require("./static");

// week 4 - login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// week 4 - registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// week 4 - Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)

// export the router
module.exports = router;