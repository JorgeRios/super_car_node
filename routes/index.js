const express = require('express');
const controller = require('../controllers/index.js');

module.exports = function(app) {
  const apiRoutes = express.Router();
  apiRoutes.get('/helloworld', controller.helloworld);
  apiRoutes.post('/token', controller.token);
  apiRoutes.delete('/token', controller.tokenDelete);
  apiRoutes.get('/cars/musclecars', controller.muscleCars);
  apiRoutes.get('/car', controller.carDetail);
  app.use('/api', apiRoutes);

}


