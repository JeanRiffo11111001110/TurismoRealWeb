const database = require('../services/database');
const oracledb = require('oracledb');

const baseQuery = 
`select id_serv_estacionamiento "id",
codigo_estacionamiento "codigo_estacionamiento",
zona "zona",
piso "piso",
precio_estacionamiento "precio_estacionamiento"
from estacionamiento`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id_serv_estacionamiento = context.id;

    query += `\nwhere id_serv_estacionamiento = :id_serv_estacionamiento`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;