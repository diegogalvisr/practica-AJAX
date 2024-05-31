const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
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

// Configurar multer para guardar archivos en una carpeta específica
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const randomNum = Math.floor(Math.random() * 10000); // Número aleatorio de 4 dígitos
      const fileName = `${year}${month}${day}-${randomNum}${path.extname(file.originalname)}`;
      cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// Ruta para servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para subir una imagen y agregar un candidato
app.post('/newCandidato', upload.single('imagen'), (req, res) => {
    const { nombre, profesion, telefono, correo, linkedin, habilidad1, habilidad2, habilidad3 } = req.body;
    const imagen = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;
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
