const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

module.exports = {getClassifications, getInventoryByClassificationId};

/* ***************************
 *  Get items for detail view
 * ************************** */
async function getVehicleById(inv_id) {
  const id = Number(inv_id);
  if (Number.isNaN(id)) return undefined;

  const sql = `
    SELECT inv_id, make, model, year, price, miles, body, transmission, color, description,
           image_full, image_thumbnail
    FROM inventory
    WHERE inv_id = $1
    LIMIT 1
  `;

  try {
    const { rows } = await pool.query(sql, [id]);
    return rows[0]; // undefined если нет
  } catch (error) {
    console.error("error in getVehicleById:", error);
    throw error;
  }
}

module.exports = {getVehicleById};