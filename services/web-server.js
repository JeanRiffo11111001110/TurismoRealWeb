const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const webServerConfig = require('../config/web-server.js');

const departamentoRouter = require('../routes/departamento.routes');
const personaRouter = require('../routes/persona.routes');
const reservaRouter = require('../routes/reserva.routes');
const acompañanteRouter = require('../routes/acompañante.routes');
const conjuntoRouter = require('../routes/conjunto.routes');
const estacionamientoRouter = require('../routes/estacionamiento.routes');
const tourRouter = require('../routes/tour.routes');
const vehiculoRouter = require('../routes/vehiculo.routes');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);


    // Middleware
    app.use(cors());
    app.use(morgan('combined'));
    app.use(express.json());
    

    // Routes
    app.use('/api', departamentoRouter);
    app.use('/api', personaRouter);
    app.use('/api', reservaRouter);
    app.use('/api', acompañanteRouter);
    app.use('/api',conjuntoRouter);
    app.use('/api',estacionamientoRouter);
    app.use('/api',tourRouter);
    app.use('/api',vehiculoRouter);

    // Error Route
    app.use((err,req,res,next)=>{
      return res.json({
        message: err.message
      });
    });

    // Server listening
    httpServer.listen(webServerConfig.port, err => {
      if (err) {
        reject(err);
        return;
      }

      console.log('Web server listening on localhost: ' + webServerConfig.port);

      resolve();
    });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;

module.exports.initialize = initialize;