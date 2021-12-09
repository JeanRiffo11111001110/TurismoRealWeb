const database = require('../services/database');
const oracledb = require('oracledb');

const baseQuery = 
`select id_persona "id",
rut "rut",
nombres "nombres",
apellidos "apellidos",
telefono "telefono",
correo "correo",
contrasenia "contrasenia"
from persona`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.id_persona = context.id;

    query += `\nwhere id_persona = :id_persona`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const baseQuery2 = 
`select id_persona "id",
rut "rut",
nombres "nombres",
apellidos "apellidos",
telefono "telefono",
correo "correo",
contrasenia "contrasenia"
from persona`;

async function findByCorreo(context) {
  let query = baseQuery2;
  const binds = {};

  if (context.correo) {
    binds.correo = context.correo;

    query += `\nwhere correo = :correo`;
  }

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

module.exports.findByCorreo = findByCorreo;


const baseQuery3 = 
`select id_persona "id",
rut "rut",
correo "correo"
from persona`;

async function findByRut(context) {
  let query = baseQuery3;
  const binds = {};

  if (context.rut) {
    binds.rut = context.rut;

    query += `\nwhere rut = :rut`;
  }

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

module.exports.findByRut = findByRut;

const createSql =
`insert into persona (
  ID_PERSONA,
  RUT,
  NOMBRES,
  APELLIDOS,
  TELEFONO,
  CORREO,
  CONTRASENIA
) values (
  DEFAULT,
  :rut,
  :nombres,
  :apellidos,
  :telefono,
  :correo,
  :contrasenia
) returning id_persona
into :id_persona`;

async function create(person) {
  const persona = Object.assign({}, person);

  persona.id_persona = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, persona);

  persona.id_persona = result.outBinds.id_persona[0];

  return persona;
}

module.exports.create = create;

const updateSql =
`update persona
set rut = :rut,
nombres = :nombres,
apellidos = :apellidos,
telefono = :telefono,
correo = :correo,
contrasenia = :contrasenia
where id_persona = :id_persona`;

async function update(person) {
  const persona = Object.assign({}, person);
  const result = await database.simpleExecute(updateSql, persona);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return persona;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
 delete from persona
 where rut = :rut;
 :rowcount := sql%rowcount;
end;`

async function del(rut) {
  const binds = {
    rut: rut,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;