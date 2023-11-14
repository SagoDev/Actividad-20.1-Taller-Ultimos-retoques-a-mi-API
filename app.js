const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY ="CLAVE SECRETA";
const { conectar } = require('./models/conexion.js');
const { json } = require("body-parser");
const app = express();

const port = 3000;

app.use(express.json());

const db = conectar();

app.post("/login", (req, res) => {
    const { usuario, contraseña } = req.body;
    if (usuario === "admin" && contraseña === "admin") {
        const token = jwt.sign({usuario},SECRET_KEY);
        res.status(200).json({token});
    }
    else{
        res.status(401).json({message:"Usuario/Contraseña incorreto"})
    };
});

app.use("/conectar",(req,res,next)=>{
    try {
        const decoded = jwt.verify(req.headers["access-token"],SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({message:"Usuario NO Autorizado"})
    }
});

app.get("/", (req, res) => {
    res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/conectar", (req, res) => {
    db.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.json(results);
    });
});

app.get("/conectar/:index", (req, res) => {
    db.query('SELECT * FROM usuario WHERE Usuario_Id =' + req.params.index + '', (error, result) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.json(result);
    });
});

app.post("/conectar", (req, res) => {
    db.query('INSERT INTO usuario (Usuario_Nombre, Usuario_Apellido, Usuario_Email) VALUES("' + req.body.Usuario_Nombre + '", "' + req.body.Usuario_Apellido + '", "' + req.body.Usuario_Email + '")', (error, result) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Agregado Exitosamente');
    });
});

app.put("/conectar/:index", (req, res) => {

    db.query('UPDATE usuario SET Usuario_Nombre="' + req.body.Usuario_Nombre + '", Usuario_Apellido = "' + req.body.Usuario_Apellido + '", Usuario_Email = "' + req.body.Usuario_Email + '" WHERE Usuario_Id = ' + req.params.index + '', (error, results) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Modificado!');
    });
});

app.delete("/conectar/:index", (req, res) => {
    db.query('DELETE FROM usuario WHERE Usuario_Id =' + req.params.index + '', (error, result) => {
        if (error) {
            console.error('Error al ejecutar consulta: ', error)
            return res.status(500).send('Error en la consulta');
        }
        res.send('Eliminado Exitosamente');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
