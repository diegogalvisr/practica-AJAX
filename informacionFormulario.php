<?php
// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = htmlspecialchars($_POST["nombre"]);
    $profesion = htmlspecialchars($_POST["profesion"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $linkedin = htmlspecialchars($_POST["linkedin"]);
    $habilidades = implode(", ", array_map('htmlspecialchars', $_POST["habilidad"])); 

    // la imagen
    $ruta_destino = "uploads/"; 
    $nombre_archivo = basename($_FILES["foto"]["name"]);
    $ruta_temporal = $_FILES["foto"]["tmp_name"];
    $ruta_completa = $ruta_destino . $nombre_archivo;

    // Verificar si el archivo se ha subido 
    if (is_uploaded_file($ruta_temporal)) {
        // Mover la imagen al directorio de destino
        if (move_uploaded_file($ruta_temporal, $ruta_completa)) {
            // Conectar a la base de datos
            $conexion = new mysqli("monorail.proxy.rlwy.net", "root", "VbbzaPdbqPALiauFgHUWzbzWliVAkXpi", "railway");

            // Verificar la conexión
            if ($conexion->connect_error) {
                die("Error de conexión: " . $conexion->connect_error);
            }

            // Preparar la consulta SQL para insertar los datos en la base de datos
            $consulta = "INSERT INTO tu_tabla (nombre, profesion, telefono, email, linkedin, habilidades, foto) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $declaracion = $conexion->prepare($consulta);
            $declaracion->bind_param("sssssss", $nombre, $profesion, $telefono, $email, $linkedin, $habilidades, $ruta_completa);

            // Ejecutar la consulta
            if ($declaracion->execute()) {
                echo "Datos insertados correctamente en la base de datos.";
            } else {
                echo "Error al insertar datos: " . $declaracion->error;
            }

            // Cerrar la conexión
            $conexion->close();
        } else {
            echo "Error al mover el archivo al directorio de destino.";
        }
    } else {
        echo "Error al subir el archivo.";
    }
}
?>
