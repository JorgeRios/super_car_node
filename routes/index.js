const express = require('express');
const controller = require('../controllers/index.js');
const middleWare = require('./middleWare.js');

module.exports = function(app) {
  const apiRoutes = express.Router();
  apiRoutes.post('/token', controller.token);
  apiRoutes.delete('/token', controller.tokenDelete);
  apiRoutes.get('/cars/musclecars', middleWare.muscleCars, controller.muscleCars);
  apiRoutes.get('/car', controller.carDetail);
  app.use('/api', apiRoutes);

}






