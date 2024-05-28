$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5000/candidatos',
        method: 'GET',
        success: function(response) {
            var resultsTable = $('#results-body');
            resultsTable.empty(); // Limpiar la tabla antes de agregar nuevos resultados
            response.forEach(function(item) {
                resultsTable.append(
                    '<tr>' +
                    '<td>' + item.Nombre + '</td>' +
                    '<td><img src="' + item.Imagen + '" alt="Imagen del perfil" style="width: 100px; height: 100;"></td>' +
                    '<td>' + item.Profesion + '</td>' +
                    '<td>' + item.Telefono + '</td>' +
                    '<td>' + item.Correo + '</td>' +
                    '<td>' + item.LinkedIn + '</td>' +
                    '<td>' + item.Habilidad1 + '</td>' +
                    '<td>' + item.Habilidad2 + '</td>' +
                    '<td>' + item.Habilidad3 + '</td>' +
                    '</tr>'
                );
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al consultar la API:', status, error);
        }
    });
});