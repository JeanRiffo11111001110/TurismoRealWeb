const database = require('../services/database');
const oracledb = require('oracledb');

const baseQuery = 
`select id_conjunto "id",
codigo "codigo",
nombre "nombre",
total_pago_servicios "total_pago_servicios",
id_vehiculo "id_vehiculo",
id_estacionamiento "id_estacionamiento",
id_tour "id_tour"
from conjunto_servicio`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id_conjunto = context.id;

    query += `\nwhere id_conjunto = :id_conjunto`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql =
`insert into conjunto_servicio (
  id_conjunto,
  codigo,
  nombre,
  total_pago_servicios,
  id_vehiculo,
  id_estacionamiento,
  id_tour
) values (
  DEFAULT,
  :codigo,
  :nombre,
  :total_pago_servicios,
  :id_vehiculo,
  :id_estacionamiento,
  :id_tour
) returning id_conjunto
into :id_conjunto`;

async function create(conjunt) {
  const conjunto = Object.assign({}, conjunt);

  conjunto.id_conjunto = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, conjunto);

  conjunto.id_conjunto = result.outBinds.id_conjunto[0];

  return conjunto;
}

module.exports.create = create;

const updateSql =
`update conjunto_servicio
SET
total_pago_servicios = :total_pago_servicios,
id_vehiculo = :id_vehiculo,
id_estacionamiento = :id_estacionamiento,
id_tour = :id_tour
where id_conjunto = :id_conjunto`;

async function update(conjunt) {
  const conjunto = Object.assign({}, conjunt);
  const result = await database.simpleExecute(updateSql, conjunto);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return conjunto;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
 delete from conjunto_servicio
 where id_conjunto = :id_conjunto;
 :rowcount := sql%rowcount;
end;`

async function del(id) {
  const binds = {
    id_conjunto: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;