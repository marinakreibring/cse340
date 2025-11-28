// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
//Route to build item detail view 
router.get("/detail/:inv_id", invController.buildByInvId);

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Route to show add classification form
router.get("/add-classification", 
  utilities.checkLogin, 
  utilities.handleErrors(invController.buildAddClassification)
);

// Route to process add classification
router.post(
  "/add-classification",
  utilities.checkLogin,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Route to show add inventory form
router.get("/add-inventory", 
  utilities.checkLogin, 
  utilities.handleErrors(invController.buildAddInventory)
);

// Route to process add inventory
router.post(
  "/add-inventory",
  utilities.checkLogin,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

// Route to show edit inventory form
router.get("/edit/:inv_id", 
  utilities.checkLogin,
  utilities.handleErrors(invController.buildEditInventory)
);

// Route to process inventory update
router.post(
  "/update",
  utilities.checkLogin,
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

// Route to work with js file
router.get("/getInventory/:classification_id", 
    utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;