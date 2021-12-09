const jwt = require('jsonwebtoken')
const secret = require('../config/jwt')
const personas = require('../db_apis/personas');

const verifyToken = async (req,res,next) =>{
    try{
        const token = req.headers['x-access-token'];

        if(!token) return res.status(403).json({message: 'Invalid token'});
    
        const decoded = jwt.verify(token,secret.SECRET);
        req.rut = decoded.rut;
    
        const context = {};
    
        context.rut = req.rut;
    
        const persona = await personas.findByRut(context);
    
        console.log(persona);
        
        if(!persona) return res.status(404).json({message: 'User not found'});
    
        next();
    }
    catch(err){
        res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports.verifyToken = verifyToken;