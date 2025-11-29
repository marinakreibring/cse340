// Needed Resources 
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')
//const { route } = require("./static");

// week 4 - login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// week 4 - registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// week 4 - Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login request - week 5
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Default account route - week 5
router.get("/", utilities.handleErrors(utilities.checkLogin), utilities.handleErrors(accountController.buildAccountManagement));

// Logout route - week 5 assignment
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

// Route to show account update view - week 5 assignment
router.get("/update/:account_id", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildAccountUpdate)
);

// Route to process account update - week 5 assignment
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateAccountRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
);

// Route to process password change - week 5 assignment
router.post(
  "/change-password",
  utilities.checkLogin,
  regValidate.changePasswordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.changePassword)
);

// export the router
module.exports = router;