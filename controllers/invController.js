const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

module.exports = invCont

/* ***************************
 *  Build item detail view 
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id;
    const vehicle = await invModel.getVehicleById(inv_id);

    // if not found
    if (!vehicle) {
      return next({
        status: 404,
        message: `Vehicle with id ${inv_id} not found`,
      });
    }

    // HTML from utilities
    const vehicleHTML = utilities.buildVehicleDisplay(vehicle);

    // navigation
    const nav = await utilities.getNav();

    // fields
    const make = vehicle.inv_make;
    const model = vehicle.inv_model;

    res.render("inventory/detail", {
      title: `${make} ${model}`,
      nav,
      vehicle,
      vehicleHTML,
    });

  } catch (error) {
    console.error("Error in buildByInvId:", error);
    next(error);
  }
};
