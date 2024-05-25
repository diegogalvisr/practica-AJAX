<?php
// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = $_POST["nombre"];
    $profesion = $_POST["profesion"];
    $telefono = $_POST["telefono"];
    $email = $_POST["email"];
    $linkedin = $_POST["linkedin"];
    $habilidades = implode(", ", $_POST["habilidad"]); // Convertir habilidades seleccionadas a una cadena separada por comas
    
    // Procesar la imagen
    $ruta_destino = "uploads/"; // Directorio donde se guardarán las imágenes
    $nombre_archivo = $_FILES["foto"]["name"];
    $ruta_temporal = $_FILES["foto"]["tmp_name"];
    $ruta_completa = $ruta_destino . $nombre_archivo;
    
    // Mover la imagen al directorio de destino
    move_uploaded_file($ruta_temporal, $ruta_completa);
    
    // Conectar a la base de datos
    $conexion = new mysqli("monorail.proxy.rlwy.net", "root", "nexSxpALwALKfPKFVeJgagSNhGibiTPd", "railway");
    
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
}
?>
