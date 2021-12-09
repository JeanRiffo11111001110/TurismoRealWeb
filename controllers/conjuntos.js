const conjuntos = require('../db_apis/conjuntos.js');

async function get(req, res, next) {
  try {
    const context = {};
  
    context.id = parseInt(req.params.id, 10);
  
    const rows = await conjuntos.find(context);
  
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

function getConjuntoFromReq(req){
  const conjunto = {
      codigo: req.body.codigo,
      nombre: req.body.nombre,
      total_pago_servicios: req.body.total_pago_servicios,
      id_vehiculo: req.body.id_vehiculo,
      id_estacionamiento: req.body.id_estacionamiento,
      id_tour: req.body.id_tour
  }

  return conjunto;
}


function getConjuntoFromReqToUpdate(req){
  const conjunto = {
      total_pago_servicios: req.body.total_pago_servicios,
      id_vehiculo: req.body.id_vehiculo,
      id_estacionamiento: req.body.id_estacionamiento,
      id_tour: req.body.id_tour
  }

  return conjunto;
}

async function post(req,res,next) {
  try{
    let conjunto = getConjuntoFromReq(req);

    conjunto = await conjuntos.create(conjunto);
        
    res.status(201).json(conjunto);
  }catch(err){
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let conjunto = getConjuntoFromReqToUpdate(req);
  
    conjunto.id_conjunto = parseInt(req.params.id,10);
  
    conjunto = await conjuntos.update(conjunto);
  
    if (conjunto !== null) {
      res.status(200).json(conjunto);
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

    const success = await conjuntos.delete(id);

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