const express = require("express");
const { conectar } = require("./models/conexion");
const jws = require("jsonwebtoken");

const app = express();
const db = conectar();

const puerto = 3000;
const SECRET_KEY = "CLAVE ULTRA SECRETA";

app.use(express.json());

app.use("/tareas",(req, res, next)=>{
    try {
        const decoded = jws.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ message: "Usuario NO Válido" })   
    }
});

app.use("/usuarios",(req, res, next)=>{
    try {
        const decoded = jws.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ message: "Usuario NO Válido" })   
    }
});

app.get("/", (req, res) => {
    res.send("<h1>Bienvenid@ al servidor</h1>");
});

/*LOGIN*/

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
        const token = jws.sign({ username }, SECRET_KEY);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: "Usuario y/o Contraseña Incorrecto" })
    }
});



/*TAREAS */

/*LISTA DE TAREAS*/
app.get("/tareas", (req, res) => {
    db.query("SELECT * FROM tareas", (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        } else {
            res.json(results);
        }
    });
});

/*TAREA SEGUN ID*/
app.get("/tareas/:index", (req, res) => {
    db.query("SELECT * FROM tareas WHERE Tarea_Id =" + req.params.index + "", (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        } else {
            res.json(results);
        }
    });
});

/*AGREGAR NUEVA TAREA*/
app.post("/tareas", (req, res) => {
    db.query('INSERT INTO tareas (Tarea_Descripcion, Tarea_FecVenc, Tarea_Estado) VALUES("' + req.body.Tarea_Descripcion + '", "' + req.body.Tarea_FecVenc + '", "' + req.body.Tarea_Estado + '")', (error, result) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Agregado Exitosamente');
    });
});

/*MODIFICAR TAREA*/
app.put("/tareas/:index", (req, res) => {
    db.query('UPDATE tareas SET Tarea_Descripcion="' + req.body.Tarea_Descripcion + '", Tarea_FecVenc = "' + req.body.Tarea_FecVenc + '", Tarea_Estado = "' + req.body.Tarea_Estado + '" WHERE Tarea_Id = ' + req.params.index + '', (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Modificado Exitosamente');
    });
});


/*ELIMINAR TAREA*/
app.delete("/tareas/:index", (req, res) => {
    db.query("DELETE FROM tareas WHERE Tareas_Id =" + req.params.index + " ", (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Eliminado Exitosamente');
    });
});

/*USUARIOS */

/*LISTA DE USUARIOS*/
app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        } else {
            res.json(results);
        }
    });
});

/*USUARIO SEGUN ID*/
app.get("/usuarios/:index", (req, res) => {
    db.query("SELECT * FROM usuarios WHERE Usuario_Id =" + req.params.index + "", (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        } else {
            res.json(results);
        }
    });
});

/*AGREGAR NUEVO USUARIO*/
app.post("/usuarios", (req, res) => {
    db.query('INSERT INTO usuarios (Usuario_Nombre, Usuario_Apellido, Usuario_Email) VALUES("' + req.body.Usuario_Nombre + '", "' + req.body.Usuario_Apellido + '", "' + req.body.Usuario_Email + '")', (error, result) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Agregado Exitosamente');
    });
});

/*MODIFICAR USUARIO*/
app.put("/usuarios/:index", (req, res) => {
    db.query('UPDATE tareas SET Usuario_Nombre="' + req.body.Usuario_Nombre + '", Usuario_Apellido = "' + req.body.Usuario_Apellido + '", Usuario_Email = "' + req.body.Usuario_Email + '" WHERE Usuario_Id = ' + req.params.index + '', (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Modificado Exitosamente');
    });
});

/*ELIMINAR USUARIO*/
app.delete("/usuarios/:index", (req, res) => {
    db.query("DELETE FROM usuarios WHERE Usuario_Id =" + req.params.index + " ", (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Eliminado Exitosamente');
    });
});

app.listen(puerto, () => {
    console.log('SERVIDOR ACTIVO!');
});
