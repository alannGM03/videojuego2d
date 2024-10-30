const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
const elements = []; // Array para guardar los carros

// Cargar imágenes
const fondo = new Image();
fondo.src = 'assets/img/fondo-carretera.jpg'; // Imagen de fondo de carretera
const carroImg = new Image();
carroImg.src = 'assets/img/carro.png'; // Imagen del carro

// Cargar el sonido de disparo
const sonidoDisparo = new Audio('assets/sounds/disparo.wav');

// Clase para los carros
class Carro {
    constructor(x, y, dx, dy, img) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.img = img;
    }
    dibujar() {
        ctx.drawImage(this.img, this.x, this.y, 90, 60); // Tamaño personalizado para el carro
    }
    mover() {
        this.x += this.dx;
        this.y += this.dy;

        // Cambiar dirección al chocar con los bordes
        if (this.x < 0 || this.x > canvas.width - 60) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height - 30) this.dy *= -1;
    }
}

// Crear carros aleatorios
function crearCarro() {
    const x = Math.random() * (canvas.width - 90);
    const y = Math.random() * (canvas.height - 60);
    const dx = (Math.random() - 0.5) * 6; // Velocidad un poco más rápida
    const dy = (Math.random() - 0.5) * 6;
    elements.push(new Carro(x, y, dx, dy, carroImg));
}

// Dibujar el fondo y los carros
function dibujarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => {
        element.dibujar();
        element.mover();
    });
}

// Actualizar el juego
function actualizarJuego() {
    dibujarJuego();
    requestAnimationFrame(actualizarJuego);
}

// Capturar carro al hacer clic
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    elements.forEach((element, index) => {
        if (
            mouseX >= element.x &&
            mouseX <= element.x + 90 &&
            mouseY >= element.y &&
            mouseY <= element.y + 60
        ) {
            elements.splice(index, 1); // Eliminar carro
            score++;
            document.getElementById('score').textContent = `Puntuación: ${score}`;
            
            // Reproducir el sonido de disparo
            sonidoDisparo.currentTime = 0; // Reinicia el sonido
            sonidoDisparo.play();
            
            crearCarro(); // Crear un nuevo carro para mantener la dificultad
        }
    });
});

// Iniciar el juego
fondo.onload = function() {
    for (let i = 0; i < 5; i++) {
        crearCarro();
    }
    actualizarJuego();
};
