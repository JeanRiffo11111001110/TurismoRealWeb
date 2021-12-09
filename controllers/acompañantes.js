const acompañantes = require('../db_apis/acompañantes.js');

async function get(req, res, next) {
  try {
    const context = {};
  
    context.id = parseInt(req.params.id, 10);
  
    const rows = await acompañantes.find(context);
  
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
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

function getAcompañanteFromReq(req){
  const acompañante = {
      rut: req.body.rut,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      id_reserva: req.body.id_reserva
  }

  return acompañante;
}

async function post(req,res,next) {
  try{
    let acompañante = getAcompañanteFromReq(req);

    acompañante = await acompañantes.create(acompañante);
        
    res.status(201).json(acompañante);
  }catch(err){
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let acompañante = getAcompañanteFromReq(req);
  
    acompañante.id_acompaniante = parseInt(req.params.id,10);
  
    acompañante = await acompañantes.update(acompañante);
  
    if (acompañante !== null) {
      res.status(200).json(acompañante);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
  
module.exports.put = put;

async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await acompañantes.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;