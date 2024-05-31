const express = require('express');
const mysql = require('mysql');

const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static('public')); 
app.use(express.json()); 

app.set('view engine', 'ejs');
app.set('views', './views/');

let conexion = mysql.createConnection({
    host: "localhost",
    database: "practicaYKS",
    user: "root",
    password: "YkSoGeId"
});

conexion.connect(function(error) {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log("Conexión exitosa");

    app.get('/', (req, res) => {
        res.render('index'); 
    });

    app.get('/candidatos', (req, res) => {
        const mostrar = "select cand.Nombre,cand.Imagen,cand.Profesion,cand.Telefono,cand.Correo,cand.LinkedIn,hab.Nombre AS Habilidad1,hab2.Nombre AS Habilidad2,hab3.Nombre AS Habilidad3 FROM candidatosinfo c INNER JOIN candidatos cand ON cand.ID = c.idEmpleado INNER JOIN habilidades hab ON hab.ID = c.idHabilidad1 INNER JOIN habilidades hab2 ON hab2.ID = c.idHabilidad2 INNER JOIN  habilidades hab3 ON hab3.ID = c.idHabilidad3;        ";
        conexion.query(mostrar, function(error, lista) {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Error en la consulta');
            } else {
                res.json(lista); 
            }
        });
    });


    app.post('/newCandidato', (req, res) => {
        const { nombre, imagen, profesion, telefono, correo, linkedin, habilidad1, habilidad2, habilidad3 } = req.body;
        const insertarCandidato = "INSERT INTO candidatos (Nombre, Imagen, Profesion, Telefono, Correo, LinkedIn) VALUES (?, ?, ?, ?, ?, ?)";
        conexion.query(insertarCandidato, [nombre, imagen, profesion, telefono, correo, linkedin], function(error, results) {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Error al insertar el candidato');
            } else {
                const idEmpleado = results.insertId;
                const insertarCandidatoInfo = `INSERT INTO candidatosinfo (idEmpleado, idHabilidad1, idHabilidad2, idHabilidad3)
                                               VALUES (
                                                   ?,
                                                   (SELECT ID FROM habilidades h WHERE h.Nombre = ? LIMIT 1),
                                                   (SELECT ID FROM habilidades h WHERE h.Nombre = ? LIMIT 1),
                                                   (SELECT ID FROM habilidades h WHERE h.Nombre = ? LIMIT 1)
                                               )`;
    
                conexion.query(insertarCandidatoInfo, [idEmpleado, habilidad1, habilidad2, habilidad3], function(error, results) {
                    if (error) {
                        console.error('Error executing query:', error);
                        res.status(500).send('Error al insertar la información del candidato');
                    } else {
                        res.status(201).send('Perfil insertado correctamente');
                    }
                });
            }
        });
    });
    

    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
    });
});
