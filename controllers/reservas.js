const reservas = require('../db_apis/reservas.js');

async function get(req, res, next) {
  try {
    const context = {};
  
    context.id = parseInt(req.params.id, 10);
  
    const rows = await reservas.find(context);
  
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
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

function getReservaFromReq(req){
  const reserva = {
    codigo: req.body.codigo,
    precio_reserva: req.body.precio_reserva,
    fecha_reserva: req.body.fecha_reserva,
    cant_noches: req.body.cant_noches,
    fecha_entrada: req.body.fecha_entrada,
    fecha_salida: req.body.fecha_salida,
    id_persona: req.body.id_persona,
    id_conjunto_serv: req.body.id_conjunto_serv,
    depto_id_depto: req.body.depto_id_depto
  }

  return reserva;
}

async function post(req,res,next) {
  try{
    let reserva = getReservaFromReq(req);

    reserva = await reservas.create(reserva);
        
    res.status(201).json(reserva);
  }catch(err){
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let reserva = getReservaFromReq(req);
  
    reserva.id_reserva = parseInt(req.params.id,10);
  
    reserva = await reservas.update(reserva);
  
    if (reserva !== null) {
      res.status(200).json(reserva);
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

    const success = await reservas.delete(id);

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