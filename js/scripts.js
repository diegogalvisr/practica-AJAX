const checkboxes = document.querySelectorAll('input[name="habilidad"]');
const maxSelections = 3;

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedCheckboxes = document.querySelectorAll('input[name="habilidad"]:checked');
        if (selectedCheckboxes.length > maxSelections) {
            checkbox.checked = false;
        }
    });
});

const form = document.getElementById('formulario-postulacion');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(form);
    const habilidades = [];
    formData.getAll('habilidad').forEach(habilidad => habilidades.push(habilidad));

    const file = formData.get('foto');
    const reader = new FileReader();

    reader.onloadend = function() {
        const base64Image = reader.result;

        const ventanaNueva = window.open('', '_blank', 'width=600,height=600');
        ventanaNueva.document.write(`
            <html>
            <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <link href="css/style.css" rel="stylesheet">
            </head>
            <body>
            <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${formData.get('nombre')}</h5>
              <p class="card-text"><strong>Profesion:</strong> ${formData.get('profesion')}</p>
              <img src="${base64Image}" alt="Foto" style="width:200px;height:200px;" class="card-img-top" alt="...">
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Telefono:</strong> ${formData.get('telefono')}</li>
              <li class="list-group-item"><strong>Correo electrónico:</strong> ${formData.get('email')}</li>
              <li class="list-group-item"><strong>LinkedIn:</strong> ${formData.get('linkedin')}</li>
              <li class="list-group-item"><strong>Habilidades:</strong> ${habilidades.join(', ')}</li>
            </ul>
            </body>
            </html>
        `);
    };

    reader.readAsDataURL(file);
});


