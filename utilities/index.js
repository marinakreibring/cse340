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

module.exports = Util;

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
* Build item detail view HTML
* ************************************ */
function formatCurrencyUSD(amount) {
  if (amount == null) return '';
  return Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
function formatNumberWithCommas(value) {
  if (value == null) return '';
  return Number(value).toLocaleString('en-US');
}
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildVehicleDisplay(vehicle) {
  const price = formatCurrencyUSD(vehicle.price);
  const mileage = formatNumberWithCommas(vehicle.miles);
  const img = escapeHtml(vehicle.image_full || vehicle.image || '/images/no-image.png');

  return `
    <div class="vehicle-detail">
      <h1 class="vehicle-title">${escapeHtml(vehicle.make)} ${escapeHtml(vehicle.model)} ${vehicle.year ? '('+escapeHtml(vehicle.year)+')' : ''}</h1>
      <div class="vehicle-grid">
        <div class="vehicle-image">
          <img src="${img}" alt="${escapeHtml(vehicle.make + ' ' + vehicle.model)}">
        </div>
        <div class="vehicle-info">
          <p class="price">${price}</p>
          <p><strong>Пробег:</strong> ${mileage} miles</p>
          <p><strong>Кузов:</strong> ${escapeHtml(vehicle.body)}</p>
          <p><strong>Трансмиссия:</strong> ${escapeHtml(vehicle.transmission)}</p>
          <p><strong>Цвет:</strong> ${escapeHtml(vehicle.color)}</p>
          <p class="description">${escapeHtml(vehicle.description)}</p>
        </div>
      </div>
    </div>
  `;
}

module.exports = {buildVehicleDisplay, formatCurrencyUSD, formatNumberWithCommas};