const database = require('../services/database');
const oracledb = require('oracledb');

const baseQuery = 
`select id_reserva "id",
codigo "codigo",
precio_reserva "precio_reserva",
fecha_reserva "fecha_reserva",
cant_noches "cant_noches",
fecha_entrada "fecha_entrada",
fecha_salida "fecha_salida",
persona_id "id_persona",
id_conjunto_serv "id_conjunto_serv",
depto_id_depto "depto_id_depto"
from reserva`;

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
`insert into reserva (
  ID_RESERVA,
  CODIGO,
  PRECIO_RESERVA,
  FECHA_RESERVA,
  CANT_NOCHES,
  FECHA_ENTRADA,
  FECHA_SALIDA,
  PERSONA_ID,
  ID_CONJUNTO_SERV,
  DEPTO_ID_DEPTO
) values (
  DEFAULT,
  :codigo,
  :precio_reserva,
  :fecha_reserva,
  :cant_noches,
  :fecha_entrada,
  :fecha_salida,
  :id_persona,
  :id_conjunto_serv,
  :depto_id_depto
) returning id_reserva
into :id_reserva`;

async function create(reser) {
  const reserva = Object.assign({}, reser);

  reserva.id_reserva = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, reserva);

  reserva.id_reserva = result.outBinds.id_reserva[0];

  return reserva;
}

module.exports.create = create;

const updateSql =
`update reserva
SET
codigo = :codigo,
precio_reserva = :precio_reserva,
fecha_reserva = :fecha_reserva,
cant_noches = :cant_noches,
fecha_entrada = :fecha_entrada,
fecha_salida = :fecha_salida,
persona_id = :id_persona,
id_conjunto_serv = :id_conjunto_serv,
depto_id_depto = :depto_id_depto
where id_reserva = :id_reserva`;

async function update(reser) {
  const reserva = Object.assign({}, reser);
  const result = await database.simpleExecute(updateSql, reserva);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return reserva;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
 delete from reserva
 where id_reserva = :id_reserva;
 :rowcount := sql%rowcount;
end;`

async function del(id) {
  const binds = {
    id_reserva: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;