const database = require('../services/database');
const oracledb = require('oracledb');

const baseQuery = 
`select id_serv_vehiculo "id",
precio_transporte "precio_transporte",
lugar_coordinacion "lugar_coordinacion",
patente_vehiculo "patente_vehiculo",
fecha_hora_coordinacion "fecha_hora_coordinacion"
from vehiculo_transporte`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id_serv_vehiculo = context.id;

    query += `\nwhere id_serv_vehiculo = :id_serv_vehiculo`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;