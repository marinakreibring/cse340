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
async function buildByInvId(req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id, 10);
    if (Number.isNaN(inv_id)) {
      return res.status(400).render("error", { message: "wrong id", status: 400 });
    }

    const vehicle = await inventoryModel.getVehicleById(inv_id);
    if (!vehicle) {
      return res.status(404).render("404", { url: req.originalUrl });
    }
    // utilities.buildVehicleDisplay returns HTML to utils
    const vehicleHTML = utilities.buildVehicleDisplay(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicle,
      vehicleHTML,
    });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  buildByInvId,
};