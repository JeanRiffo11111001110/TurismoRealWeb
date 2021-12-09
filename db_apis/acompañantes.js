const database = require('../services/database');
const oracledb = require('oracledb');

const baseQuery = 
`select id_acompaniante "id",
rut "rut",
nombres "nombres",
apellidos "apellidos",
id_reserva "id_reserva"
from acompañante`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id_reserva = context.id;

    query += `\nwhere id_reserva = :id_reserva`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql =
`insert into acompañante (
  ID_ACOMPANIANTE,
  RUT,
  NOMBRES,
  APELLIDOS,
  ID_RESERVA
) values (
  DEFAULT,
  :RUT,
  :NOMBRES,
  :APELLIDOS,
  :ID_RESERVA
) returning ID_ACOMPANIANTE
into :ID_ACOMPANIANTE`;

async function create(acompanant) {
  const acompanante = Object.assign({}, acompanant);

  acompanante.id_acompaniante = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, acompanante);

  acompanante.id_acompaniante = result.outBinds.id_acompaniante[0];

  return acompanante;
}

module.exports.create = create;

const updateSql =
`update acompañante
SET
rut = :rut,
nombres = :nombres,
apellidos = :apellidos,
id_reserva = :id_reserva
where id_acompaniante = :id_acompaniante`;

async function update(acompanant) {
  const acompanante = Object.assign({}, acompanant);
  const result = await database.simpleExecute(updateSql, acompanante);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return acompanante;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
 delete from acompañante
 where id_acompaniante = :id_acompaniante;
 :rowcount := sql%rowcount;
end;`

async function del(id) {
  const binds = {
    id_acompaniante: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;