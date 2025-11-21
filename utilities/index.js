const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)




/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build item detail view HTML - 
* ************************************ */
//to utilities/index.js 
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatCurrencyUSD(value) {
  if (value === null || value === undefined || isNaN(Number(value))) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));
}

function formatNumberWithCommas(value) {
  if (value === null || value === undefined || isNaN(Number(value))) return 'N/A';
  return Number(value).toLocaleString('en-US');
}

/* **********************************
 * buildVehicleDisplay with fields
 * inv_id, inv_make, inv_model, inv_year, 
 ********************************** */
Util.buildVehicleDisplay = function (vehicle) {
  if (!vehicle) return '<p class="notice">No vehicle data provided.</p>';

  const price = formatCurrencyUSD(vehicle.inv_price);
  const mileage = formatNumberWithCommas(vehicle.inv_miles);
  // try possible options for img
  const imgSrc = vehicle.inv_image_full || vehicle.inv_image || '/images/no-image.png';
  const img = escapeHtml(imgSrc);
  const make = escapeHtml(vehicle.inv_make);
  const model = escapeHtml(vehicle.inv_model);
  const year = vehicle.inv_year;
  const color = escapeHtml(vehicle.inv_color);
  const description = escapeHtml(vehicle.inv_description);
  const identnummer = escapeHtml(vehicle.classification_id);

  return `
    <div class="vehicle-detail">
      <h2>Product article number: ${identnummer}</h2>
      <div class="vehicle-grid">
        <div class="vehicle-image">
          <img src="${img}" alt="${make} ${model}">
        </div>
        <div class="vehicle-info">
          <p class="price">${price}</p>
          <p><strong>Production Year:</strong> ${year}</p>
          <p><strong>Mileage:</strong> ${mileage} miles</p>
          <p><strong>Make:</strong> ${make}</p>
          <p><strong>Color:</strong> ${color}</p>
          <p class="description">${description}</p>
        </div>
      </div>
    </div>
  `;
}

/* **************************************
 * EXPORT — must be LAST
 ************************************** */
module.exports = Util;