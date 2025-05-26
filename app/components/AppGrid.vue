<template>
  <canvas ref="gridRef" class="fixed inset-0 z-0 pointer-events-none"></canvas>
</template>

<script setup>
const gridRef = ref(null);
const gridSize = 34;
const linesCount = 6;
let ctx, width, height, animationId;
let lines = [];

class Line {
  constructor() {
    this.reset();
  }
  reset() {
    this.isHorizontal = Math.random() > 0.5;
    this.speed = 1 + Math.random();
    this.length = gridSize * (2 + Math.floor(Math.random() * 3));
    this.alpha = 0.2;
    this.fadeRate = 0.008 + Math.random() * 0.01;

    this.startX = Math.floor(Math.random() * (width / gridSize)) * gridSize;
    this.startY = Math.floor(Math.random() * (height / gridSize)) * gridSize;
    this.x1 = this.startX;
    this.y1 = this.startY;
    this.x2 = this.startX;
    this.y2 = this.startY;
  }
  update() {
    if (this.isHorizontal) {
      this.x2 += this.speed;
      if (this.x2 - this.x1 >= this.length) this.alpha -= this.fadeRate;
    } else {
      this.y2 += this.speed;
      if (this.y2 - this.y1 >= this.length) this.alpha -= this.fadeRate;
    }
    if (this.alpha <= 0) this.reset();
  }
  draw(ctx) {
    ctx.strokeStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.lineWidth = 1;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 1;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}

function drawGrid(ctx) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx);
  lines.forEach((line) => {
    line.update();
    line.draw(ctx);
  });
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  const canvas = gridRef.value;
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  lines = Array.from({ length: linesCount }, () => new Line());
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
});
</script>
