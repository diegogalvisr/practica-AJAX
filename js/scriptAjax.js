$(document).ready(function() {
    function cargarPagina(url) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "html",
            success: function(response) {
                $("#contenedorPagina").html(response);
            },
            error: function(xhr, status, error) {
                console.error("Error cargando la página: " + error);
            }
        });
    }

    $("#btnCargarPagina").click(function() {
        cargarPagina("fullstack.html");
    });

    $("#btnFrontend").click(function() {
        cargarPagina("frontend.html");
    });
     $("#btnBackend").click(function() {
        cargarPagina("backend.html");
    });
});
