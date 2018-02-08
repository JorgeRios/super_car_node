'use strict';
module.exports = (function() {
    let muscleCars = function(req, res, next){
        console.log("en muscleCar");
        next();
    }
    return {
    muscleCars: muscleCars
  };
})();

