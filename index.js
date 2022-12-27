// Establecer las constantes para el tamaño del canvas y la velocidad de la serpiente
const canvasWidth = 600;
const canvasHeight = 600;
const snakeSpeed = 5;

// Crear el canvas y obtener el contexto de dibujo
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Crear la serpiente como un array de celdas x,y
let snake = [{ x: canvasWidth / 2, y: canvasHeight / 2 }];

// Establecer la dirección inicial de la serpiente como hacia arriba
let direction = 'up';

// Establecer la ubicación inicial de la comida en una posición aleatoria
let food = {
  x: Math.floor(Math.random() * canvasWidth),
  y: Math.floor(Math.random() * canvasHeight)
};

// Establecer la puntuación inicial en 0
let score = 0;


// Establecer un contador de muertes inicial en 0
let deaths = 0;

// Establecer un temporizador para actualizar el juego cada 100 milisegundos
setInterval(update, 100);

const style = document.createElement('style');
style.innerHTML = `
  canvas {
    display: block;
    margin: 0 auto;
    width: 600px;
    height: 600px;
    border: 5px solid white;
  }
  body {
    background-color: black;
  }
  canvas, body {
    color: white;
    font-family: Arial, sans-serif;
  }
`;
document.head.appendChild(style);

// Crear la función de actualización del juego
function update() {
  // Mover la serpiente en la dirección actual
  moveSnake();

  // Comprobar si la serpiente ha chocado contra los bordes del canvas o se ha mordido a sí misma
  checkCollision();

  // Comprobar si la serpiente ha comido la comida
  checkFoodCollision();

  // Borrar el canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Dibujar la serpiente
  drawSnake();

  // Dibujar la comida
  drawFood();

  // Dibujar la puntuación
  drawScore();

  // Dibujar el contador de muertes
  drawDeaths();
}

// Crear la función para mover la serpiente
function moveSnake() {
  // Obtener la cabeza de la serpiente
  const head = { x: snake[0].x, y: snake[0].y };

  // Actualizar la posición de la cabeza en función de la dirección actual
  if (direction === 'up') {
    head.y -= snakeSpeed;
  } else if (direction === 'down') {
    head.y += snakeSpeed;
  } else if (direction === 'left') {
    head.x -= snakeSpeed;
  } else if (direction === 'right') {
    head.x += snakeSpeed;
  }

  // Añadir la nueva cabeza a la serpiente y eliminar la cola
  snake.unshift(head);
  snake.pop();
}

// Crear la función para comprobar si la serpiente ha chocado contra los bordes del canvas o se ha mordido a sí misma
function checkCollision() {
    // Obtener la cabeza de la serpiente
    const head = { x: snake[0].x, y: snake[0].y };
  
    // Comprobar si la cabeza de la serpiente ha chocado contra los bordes del canvas
    if (head.x < 0 || head.x > canvasWidth || head.y < 0 || head.y > canvasHeight) {
      // Si ha chocado, finalizar el juego
      endGame();
    }
  
    // Comprobar si la cabeza de la serpiente se ha mordido a sí misma
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        // Si se ha mordido a sí misma, finalizar el juego
        endGame();
      }
    }
  }
  
  // Crear la función para comprobar si la serpiente ha comido la comida
function checkFoodCollision() {
    // Obtener la cabeza de la serpiente
    const snakeHead = snake[0];
  
    // Comprobar si la cabeza de la serpiente está dentro de un área alrededor de la comida
    if (snakeHead.x > food.x - snakeSpeed && snakeHead.x < food.x + snakeSpeed && snakeHead.y > food.y - snakeSpeed && snakeHead.y < food.y + snakeSpeed) {
      // Aumentar la puntuación en 1
      score++;
  
      // Añadir una nueva celda al final de la serpiente
      snake.push({ ...snake[snake.length - 1] });
  
      // Generar una nueva comida en una posición aleatoria
      food = {
        x: Math.floor(Math.random() * canvasWidth),
        y: Math.floor(Math.random() * canvasHeight)
      };
    }
  }
  
  // Crear la función para dibujar la serpiente
  function drawSnake() {
    // Establecer el color de relleno de la serpiente como verde
    ctx.fillStyle = 'green';
  
    // Dibujar un cuadrado en cada celda del array de la serpiente
    for (let i = 0; i < snake.length; i++) {
      ctx.fillRect(snake[i].x, snake[i].y, snakeSpeed, snakeSpeed);
    }
  }
  
  // Crear la función para dibujar la comida
    function drawFood() {
        // Establecer el tamaño de la comida como el doble de la velocidad de la serpiente
        const foodSize = snakeSpeed * 2;

        // Establecer el color de relleno de la comida como rojo
        ctx.fillStyle = 'red';

        // Dibujar un cuadrado en la ubicación de la comida
        ctx.fillRect(food.x, food.y, foodSize, foodSize);
    }
  
function drawScore() {
    // Establecer el color de relleno del texto como blanco
    ctx.fillStyle = 'white';
    
    // Establecer la fuente del texto
    ctx.font = '24px Arial';
    
    // Dibujar la puntuación en la esquina superior derecha del canvas
    ctx.fillText(`Score: ${score}`, canvasWidth - 150, 30);
    }
  
  // Crear la función para finalizar el juego
  function endGame() {
    // Aumentar el contador de muertes en 1
    deaths++;

    // Establecer la puntuación a 0
    score = 0;
  
    // Establecer la serpiente como un array de una sola celda en el centro del canvas
    snake = [{ x: canvasWidth / 2, y: canvasHeight / 2 }];
  
    // Establecer la dirección de la serpiente como hacia arriba
    direction = 'up';
  
    // Generar una nueva comida en una posición aleatoria
    food = {
      x: Math.floor(Math.random() * canvasWidth),
      y: Math.floor(Math.random() * canvasHeight)
    };
  }

  // Crear la función para dibujar el contador de muertes
function drawDeaths() {
    // Establecer el color de relleno del texto como blanco
    ctx.fillStyle = 'white';
  
    // Establecer la fuente del texto
    ctx.font = '24px Arial';
  
    // Dibujar el contador de muertes en la esquina inferior derecha del canvas
    ctx.fillText(`Muertes: ${deaths}`, canvasWidth - 150, canvasHeight - 30);
  } 
  
  // Establecer los eventos del teclado para controlar la dirección de la serpiente
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    } else if (event.key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    }
});