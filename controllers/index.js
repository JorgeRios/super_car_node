const r = require('rethinkdb');
const dbConfig = require('../config/database');

var connection = r.connect(dbConfig, (err, conn)=> {
  if (err) throw err;
  return connection = conn
});


exports.helloworld = (req, res, next)=> {
  console.log("se pidio la funcion de helloworld");
  res.status(200).json({
    message: 'hellow word'
  })
}

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

let makePromise = ()=>{
  return new Promise((reject, resolve)=> {
    val = getRows("cars")
    console.log("vieno cars");
    console.log(val);
  });
}

exports.muscleCars = (req, res, next)=> {
  getRows("cars").then((data)=> {
    console.log("viendo data");
    console.log(typeof(data));
    res.status(200).json({data})
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
	    resolve(JSON.stringify(result));
	  }
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

