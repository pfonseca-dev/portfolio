const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

const chars = ['0', '1', '%', '#', '*', '=', '&', '-', '+', ' '];
let charSize = 16; // Pode ajustar se quiser maior ou menor
let numCols, numRows;
let charGrid = [];
let waveOffset = 0;

function setupCanvas() {
  const hero = document.querySelector('.hero');

  canvas.width = hero.offsetWidth * 1.0; // largura maior para não achatar
  canvas.height = hero.offsetHeight * 1.0; // altura maior para não achatar

  numCols = Math.floor(canvas.width / charSize);
  numRows = Math.floor(canvas.height / charSize);

  charGrid = [];
  for (let row = 0; row < numRows; row++) {
    charGrid[row] = [];
    for (let col = 0; col < numCols; col++) {
      charGrid[row][col] = {
        char: chars[Math.floor(Math.random() * chars.length)],
        brightness: Math.random(),
        targetBrightness: Math.random(),
        phase: Math.random() * Math.PI * 2
      };
    }
  }
}

function animate() {
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  waveOffset += 0.05;

  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = charGrid[row][col];

      // Atualiza brilho suavemente
      cell.brightness += (cell.targetBrightness - cell.brightness) * 0.05;
      if (Math.abs(cell.brightness - cell.targetBrightness) < 0.01) {
        cell.targetBrightness = Math.random();
        cell.char = chars[Math.floor(Math.random() * chars.length)];
      }

      // Onda vertical mais alta
      const waveY = Math.sin(col * 0.3 + row * 0.2 - waveOffset + cell.phase) * charSize * 1.5;

      // Pico claro → vale escuro
      const waveFactor = 0.5 + 0.5 * Math.sin(col * 0.3 + row * 0.2 - waveOffset + cell.phase);

      const opacity = (0.3 + cell.brightness * 0.7) * waveFactor;
      const brightness = (0.5 + cell.brightness * 0.5) * waveFactor;

      const r = 48;
      const g = 48 + brightness * 100;
      const b = 104 + brightness * 150;

      // Centraliza verticalmente a onda
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.fillText(cell.char, col * charSize + charSize/2, row * charSize + charSize/2 + waveY - canvas.height*0.10);
    }
  }

  // Gradiente de blur/escurecimento na parte inferior
  const gradient = ctx.createLinearGradient(0, canvas.height*0.6, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, '#070707');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, canvas.height*0.6, canvas.width, canvas.height*0.4);

  requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
  setupCanvas();
  animate();
});

window.addEventListener('resize', setupCanvas);
