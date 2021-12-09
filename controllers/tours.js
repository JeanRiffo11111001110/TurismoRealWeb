const tours = require('../db_apis/tours.js');

async function get(req, res, next) {
  try {
    const context = {};
  
    context.id = parseInt(req.params.id, 10);
  
    const rows = await tours.find(context);
  
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } 
      else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
  
module.exports.get = get;