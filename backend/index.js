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
        const mostrar = "SELECT * FROM candidatos";
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
    const insertar = "INSERT INTO candidatos (Nombre, Imagen, Profesion, Telefono, Correo, LinkedIn, Habilidad1, Habilidad2, Habilidad3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    conexion.query(insertar, [nombre, imagen, profesion, telefono, correo, linkedin, habilidad1, habilidad2, habilidad3], function(error, results) {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error al insertar los datos');
        } else {
            res.status(201).send('Perfil insertado correctamente');
        }
    });
});
    

    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
    });
});
