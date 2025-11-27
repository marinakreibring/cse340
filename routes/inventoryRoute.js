// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
//Route to build item detail view 
router.get("/detail/:inv_id", invController.buildByInvId);

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagementView));



// Route to work with js file
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;