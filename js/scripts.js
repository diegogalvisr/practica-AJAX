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


document.getElementById('formulario-postulacion').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const profesion = document.getElementById('profesion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const habilidades = Array.from(document.querySelectorAll('input[name="habilidad"]:checked')).map(el => el.value);
    const foto = document.getElementById('foto').files[0];
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const fotoURL = e.target.result;
        
        const cardHTML = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tarjeta del Desarrollador</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f4f4f9;
                    }
                    .card-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        width: 100%;
                    }
                    .card {
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                        text-align: center;
                        width: 300px;
                    }
                    .card-photo {
                        width: 200px;
                        height: auto;
                        border-radius: 50%;
                        margin: 10px 0;
                    }
                    .card h3 {
                        margin: 10px 0;
                        font-size: 1.5em;
                    }
                    .card p {
                        margin: 5px 0;
                        font-size: 1em;
                        color: #555;
                    }
                    .card a {
                        color: #fff;
                        background-color: #0073b1;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        display: inline-block;
                        margin-top: 20px;
                        transition: background-color 0.3s ease;
                    }
                    .card a:hover {
                        background-color: #005d8f;
                    }
                    .card-skills {
                        margin-top: 10px;
                    }
                    .skill {
                        display: inline-block;
                        background-color: #0073b1;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        margin: 2px;
                        font-size: 0.9em;
                    }
                </style>
            </head>
            <body>
                <div class="card-container">
                    <div class="card">
                        <h3>${nombre}</h3>
                        <p>${profesion}</p>
                        <img src="${fotoURL}" alt="Foto del desarrollador" class="card-photo">
                        <p>Teléfono: ${telefono}</p>
                        <p>Correo electrónico: ${email}</p>
                        <a href="${linkedin}" target="_blank">LinkedIn</a>
                        <div class="card-skills">
                            ${habilidades.map(skill => `<span class="skill">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        const data = {
            nombre: nombre,
            imagen: foto.name,
            profesion: profesion,
            telefono: telefono,
            correo: email,
            linkedin: linkedin,
            habilidad1: habilidades[0] || '',
            habilidad2: habilidades[1] || '',
            habilidad3: habilidades[2] || ''
        };
    
        fetch('http://localhost:5000/newCandidato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            alert(data);
            console.log('Success:', data);
        })
        .catch((error) => {
            alert('Hubo un error al registrar el perfil');
            console.error('Error:', error);
        });
        
        // Create a downloadable HTML file
        const blob = new Blob([cardHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'tarjeta-desarrollador.html';
        downloadLink.textContent = 'Descargar Tarjeta';
        downloadLink.classList.add('download-link');
        
        const nuevaVentana = window.open('', '_blank');
        nuevaVentana.document.write(cardHTML);
        
        nuevaVentana.document.body.appendChild(downloadLink);
    }
    reader.readAsDataURL(foto);
});





