const express = require('express');
const mysql = require('mysql');

const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.json()); // Para parsear el cuerpo de las solicitudes POST en formato JSON

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
                res.json(lista); // Devuelve la lista en formato JSON
            }
        });
    });
   const fs = require('fs'); // Importa el módulo fs para manejar archivos

app.post('/newCandidato', (req, res) => {
    const { nombre, profesion, telefono, correo, linkedin, habilidad1, habilidad2, habilidad3 } = req.body;
    const imagen = req.body.imagen; // Nombre del archivo de imagen
    const imagenData = req.body.data; // Datos de la imagen en formato base64

    // Genera un nombre único para la imagen
    const nombreImagen = `${Date.now()}-${imagen}`;

    // Guarda la imagen en la carpeta 'imgs'
    fs.writeFile(`imgs/${nombreImagen}`, Buffer.from(imagenData, 'base64'), (err) => {
        if (err) {
            console.error('Error al guardar la imagen:', err);
            res.status(500).send('Error al guardar la imagen');
            return;
        }

        // URL de la imagen en el servidor
        const imagenURL = `http://localhost:5000/imgs/${nombreImagen}`;

        // Inserta los datos en la base de datos
        const insertar = "INSERT INTO candidatos (Nombre, Imagen, Profesion, Telefono, Correo, LinkedIn, Habilidad1, Habilidad2, Habilidad3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        conexion.query(insertar, [nombre, imagenURL, profesion, telefono, correo, linkedin, habilidad1, habilidad2, habilidad3], function(error, results) {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).send('Error al insertar los datos');
            } else {
                res.status(201).send('Perfil insertado correctamente');
            }
        });
    });
});

    

    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
    });
});
