// Needed Resources 
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/index"); // the utilities > index file
const accountController = require("../controllers/accountController");
const { route } = require("./static");
// week 4 - login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// week 4 - registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// week 4 - process registration
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// export the router
module.exports = router;