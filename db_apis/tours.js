const database = require('../services/database');
const oracledb = require('oracledb');

const baseQuery = 
`select id_serv_tour "id",
precio_tour "precio_tour",
lugar_coordinacion "lugar_coordinacion",
fecha_hora_coordinacion "fecha_hora_coordinacion"
from tour`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id_serv_tour = context.id;

    query += `\nwhere id_serv_tour = :id_serv_tour`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;