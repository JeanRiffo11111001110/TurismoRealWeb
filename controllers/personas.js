const personas = require('../db_apis/personas.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../config/jwt');

async function get(req, res, next) {
  try {
    const context = {};
  
    context.id = parseInt(req.params.id, 10);
  
    const rows = await personas.find(context);
  
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


async function encryptPassword(password){
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, receivedPassword){
  return await bcrypt.compare(password, receivedPassword);
}

async function getPersonaFromReq(req){
  const persona = {
    rut: req.body.rut,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    telefono: req.body.telefono,
    correo: req.body.correo,
    contrasenia: await encryptPassword(req.body.contrasenia)
  }

  return persona;
}

async function post(req,res,next) {
  try{

    const context = {};

    context.correo = req.body.correo;

    const searchedPerson = await personas.findByCorreo(context);

    console.log(searchedPerson.length);

    if(searchedPerson.length === 1){
      res.status(409).json(searchedPerson[0]);
    }
    else{

      let persona = await getPersonaFromReq(req);

      persona = await personas.create(persona);

      const token = jwt.sign({rut: persona.rut},secret.SECRET,{
        expiresIn: 86400 //seconds = 24 hrs
      })

      res.status(201).json(token);
    }
  }catch(err){
    next(err);
  }
}

module.exports.post = post;

async function signIn(req,res,next){
  try{
    const context = {};

    context.correo = req.body.correo;
    context.contrasenia = req.body.contrasenia;

    const searchedPerson = await personas.findByCorreo(context);

    if(searchedPerson.length === 1){
      
      const person = searchedPerson[0];

      const matchPassword = await comparePassword(context.contrasenia,person['contrasenia']);

      if(!matchPassword){
        return res.status(401).json({token: null, message: 'Invalid password'});
      }
      else{ 
        const personRut = person['rut'];

        const token = jwt.sign({rut: personRut},secret.SECRET,{
          expiresIn: 86400
        });
        return res.status(200).json(token);
      }
    }
    else{
      return res.status(404).json({message: 'User not found'});
    }

  }catch(err){

    next(err);
  }
}

module.exports.signIn = signIn;

async function put(req, res, next) {
  try {
    let persona = getPersonaFromReq(req);
  
    persona.id_persona = parseInt(req.params.id,10);
  
    persona = await personas.update(persona);
  
    if (persona !== null) {
      res.status(200).json(persona);
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
    const rut = req.body.rut;

    const success = await personas.delete(rut);

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