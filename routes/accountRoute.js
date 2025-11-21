// Needed Resources 
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/index"); // the utilities > index file
const accountController = require("../controllers/accountController");
// week 4 - login view
router.get("/login", accountController.buildLogin)
// week 4 - registration view
router.get("/register", accountController.buildRegister)

// export the router
module.exports = router;