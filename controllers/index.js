const r = require('rethinkdb');
const osmosis = require('osmosis');
const dbConfig = require('../config/database');

var connection = r.connect(dbConfig, (err, conn)=> {
  if (err) throw err;
  return connection = conn
});

exports.token = (req, res, next)=> {
  let usuario = req.body.usuario;
  console.log("viendo usuario");
  console.log(usuario);
  authLogin("usuarios", "usuario", usuario).then((val)=> {
    res.status(200).json({
      usuario: val
    });
  }).catch((error)=> {
    res.status(500).json(error);
  });
}

exports.tokenDelete = (req, res, next)=> {
  console.log("se quiere deslogear");
  res.status(200).json({
    usuario: ""
  });
}

exports.muscleCars = (req, res, next)=> {
  getRows("cars").then((data)=> {
    getSegundaMano();
    console.log("viendo data "+ data );
    console.log(typeof(data));
    res.status(200).json({"data": data})
 });
}

function getSegundaMano(){
  osmosis
  .get('https://www.segundamano.mx/anuncios/jalisco?q=jetta')
  .set({
    'title': 'h1'
  })
  .data(function(page){
    console.log('page');
    console.log(page);
  })
  .error(console.log)
}

exports.carDetail = (req, res, next)=> {
  console.log("pidio car detail"+ req.query.id);
  id = req.query.id;
  filterRow("features", "fk_car", id).then((data)=>{
    console.log("viendo features ");
    console.log(data);
    res.status(200).json({"features": data });
  });

}

let authLogin = (tabla="usuarios", field="usuario", value="jorge")=> {
  return new Promise((resolve, reject)=> {
    r.table(tabla).filter(r.row(field).eq(value))
    .run(connection, (err, cursor)=> {
      if (err) {
        reject({error:"no se encontro resultado"});
      } else {
        cursor.toArray((err, result)=> {
	  if (result.length === 0) {
	    reject(JSON.stringify({error: "el usuario no existe"}));
	  } else {
	    console.log("en el resolve " +JSON.stringify(result, null, 2));
	    let [user] = result;
	    console.log("antes de resolve "+ user.usuario);
	    r.table("usuarios").update({activo: true}).
	    run(connection, (err, result)=> {
	      if (err) {
	      } else {
		user.token="12345";
	        resolve(user);
	      }
	    });
	  }
	});
      }
    })
  })
}

let filterRow = (tabla="usuarios", field="usuario", value="jorge")=> {
  return new Promise((resolve, reject)=> {
    r.table(tabla)//.filter(r.row(field).eq(value))
    .run(connection, (err, cursor)=> {
      if (err) {
        reject({error:"no se encontro resultado"});
      } else {
        cursor.toArray((err, result)=> {
	       resolve(result);
	      });
      }
    })
  })
}

let getRows = (tabla)=> {
  return new Promise((resolve, reject)=> {
    r.table(tabla).run(connection, (err, cursor)=> {
      if (err) {
        reject(JSON.stringify({error:"no se encontro resultado"}))
      } else {
        cursor.toArray((err, result)=> {
          resolve(result);
        });
     }
    });
  });
}

