const database = require('../services/database');

const baseQuery =
`select id_depto "id", 
habitaciones "habitaciones", 
banios "banios", 
wifi "wifi", 
precio_nochedepto "precio_noche",
fecha_publicacion "fecha_publicacion",
fecha_adquisicion "fecha_adquisicion",
disponibilidad "disponibilidad",
titulo "titulo",
descripcion "descripcion",
television "television",
cant_personasmax "cant_personasmax", 
direccion "direccion", 
nro_depto "nro_depto", 
cant_camas "cant_camas", 
zona_depto "zona_depto" 
FROM DEPARTAMENTO`;

async function find(context){
    let query = baseQuery;
    const binds = {};

    if(context.id){
        binds.id_depto = context.id;

        query += `\nwhere id_depto = :id_depto`;
    }

    const result = await database.simpleExecute(query,binds);

    return result.rows;
}

module.exports.find = find;