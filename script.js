// Definición de la clase Alumno
class Alumno {
    constructor(nombre, apellidos, edad, materias = [], calificaciones = []) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = materias;
        this.calificaciones = calificaciones;
    }

    agregarCalificacion(calificacion) {
        this.calificaciones.push(calificacion);
    }

    obtenerPromedio() {
        if (this.calificaciones.length === 0) return 0;

        const suma = this.calificaciones.reduce((total, calificacion) => total + calificacion, 0);
        return suma / this.calificaciones.length;
    }
}

// Gestión de Alumnos y Grupos
let alumnos = [];
let grupos = {};

function agregarAlumno(nombre, apellidos, edad) {
    const alumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(alumno);
    guardarAlumnos();
    mostrarAlumnos();
    actualizarOpcionesAlumnos();
}

function asignarCalificacion(alumnoIndex, calificacion) {
    const alumno = alumnos[alumnoIndex];
    if (alumno) {
        alumno.agregarCalificacion(calificacion);
        guardarAlumnos();
    }
}

function crearGrupo(nombre, alumnosSeleccionados) {
    grupos[nombre] = alumnosSeleccionados;
    guardarGrupos();
    mostrarGrupos();
}

function guardarAlumnos() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function cargarAlumnos() {
    const alumnosGuardados = localStorage.getItem('alumnos');
    if (alumnosGuardados) {
        alumnos = JSON.parse(alumnosGuardados);
    }
}

function mostrarAlumnos() {
    const listaAlumnos = document.getElementById('alumnos-lista');
    listaAlumnos.innerHTML = '';

    alumnos.forEach((alumno, index) => {
        const alumnoElement = document.createElement('div');
        alumnoElement.classList.add('alumno');
        alumnoElement.textContent = `${alumno.nombre} ${alumno.apellidos}, Edad: ${alumno.edad}`;
        listaAlumnos.appendChild(alumnoElement);
    });
}

function actualizarOpcionesAlumnos() {
    const alumnoSelect = document.getElementById('alumno-select');
    alumnoSelect.innerHTML = '';
    
    alumnos.forEach((alumno, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        alumnoSelect.appendChild(option);
    });

    const alumnosSelect = document.getElementById('alumnos-select');
    alumnosSelect.innerHTML = '';

    alumnos.forEach((alumno, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        alumnosSelect.appendChild(option);
    });
}

function guardarGrupos() {
    localStorage.setItem('grupos', JSON.stringify(grupos));
}

function cargarGrupos() {
    const gruposGuardados = localStorage.getItem('grupos');
    if (gruposGuardados) {
        grupos = JSON.parse(gruposGuardados);
    }
}

function mostrarGrupos() {
    const listaGrupos = document.getElementById('grupo-lista');
    listaGrupos.innerHTML = '';

    for (const nombreGrupo in grupos) {
        if (grupos.hasOwnProperty(nombreGrupo)) {
            const grupoElement = document.createElement('div');
            grupoElement.classList.add('grupo');
            grupoElement.textContent = `${nombreGrupo}: ${grupos[nombreGrupo].map(index => `${alumnos[index].nombre} ${alumnos[index].apellidos}`).join(', ')}`;
            listaGrupos.appendChild(grupoElement);
        }
    }
}

// Manejo del formulario para dar de alta alumnos
const formAltaAlumno = document.getElementById('alta-alumno-form');
formAltaAlumno.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);

    agregarAlumno(nombre, apellidos, edad);

    // Limpiar el formulario después de agregar un alumno
    formAltaAlumno.reset();
});

// Manejo del formulario para asignar calificaciones
const formCalificaciones = document.getElementById('calificaciones-form');
formCalificaciones.addEventListener('submit', function(event) {
    event.preventDefault();
    const alumnoIndex = parseInt(document.getElementById('alumno-select').value);
    const calificacion = parseInt(document.getElementById('calificacion').value);

    asignarCalificacion(alumnoIndex, calificacion);

    // Limpiar el formulario después de asignar calificación
    formCalificaciones.reset();
});

// Manejo del formulario para crear grupos
const formGrupos = document.getElementById('grupos-form');
formGrupos.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreGrupo = document.getElementById('grupo-nombre').value;
    const alumnosSeleccionados = Array.from(document.getElementById('alumnos-select').selectedOptions).map(option => parseInt(option.value));

    crearGrupo(nombreGrupo, alumnosSeleccionados);
    
    // Limpiar el formulario después de crear grupo
    formGrupos.reset();
});

// Ejemplo de uso
cargarAlumnos();
mostrarAlumnos();
cargarGrupos();
mostrarGrupos();
