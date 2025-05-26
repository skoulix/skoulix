<template>
  <div class="relative w-full h-screen bg-black">
    <canvas
      ref="heroRef"
      class="w-full h-full border-b border-fuchsia-950"
      v-gsap.whenVisible.to="{
        alpha: 0,
        filter: 'blur(5px)',
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      }"
    ></canvas>
  </div>
</template>

<script setup>
const heroRef = ref(null);
const ctx = ref(null);
const pixels = ref([]);
const ball = ref({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 });
const paddles = ref([]);
const scale = ref(1);
const bgImage = ref(null);

const TEXT_COLOR = 'oklch(85.2% 0.199 91.936)';
const TEXT_HIT_COLOR = 'oklch(42.1% 0.095 57.708)';
const BALL_COLOR = '#ffffff';
const PADDLE_COLOR = 'oklch(35.9% 0.144 278.697)';
const LETTER_SPACING = 1;
const WORD_SPACING = 3;
const PIXEL_MAP = {
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  G: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
};

const initializeGame = () => {
  const LARGE_PIXEL_SIZE = 4 * scale.value;
  const SMALL_PIXEL_SIZE = 4 * scale.value;
  const BALL_SPEED = 6 * scale.value;

  pixels.value = [];
  const words = ['PROMPTING', 'IS ALL YOU NEED'];

  const calculateWordWidth = (word, pixelSize) => {
    return (
      word.split('').reduce((width, letter) => {
        const letterWidth = PIXEL_MAP[letter]?.[0]?.length ?? 0;
        return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize;
      }, 0) -
      LETTER_SPACING * pixelSize
    );
  };

  const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE);
  const totalWidthSmall = words[1].split(' ').reduce((width, word, index) => {
    return (
      width +
      calculateWordWidth(word, SMALL_PIXEL_SIZE) +
      (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
    );
  }, 0);
  const totalWidth = Math.max(totalWidthLarge, totalWidthSmall);
  const scaleFactor = (heroRef.value.width * 0.8) / totalWidth;

  const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor;
  const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor;

  const largeTextHeight = 5 * adjustedLargePixelSize;
  const smallTextHeight = 5 * adjustedSmallPixelSize;
  const spaceBetweenLines = 5 * adjustedLargePixelSize;
  const totalTextHeight = largeTextHeight + spaceBetweenLines + smallTextHeight;

  let startY = (heroRef.value.height - totalTextHeight) / 2;

  words.forEach((word, wordIndex) => {
    const pixelSize =
      wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize;
    const totalWidth =
      wordIndex === 0
        ? calculateWordWidth(word, adjustedLargePixelSize)
        : words[1].split(' ').reduce((width, w, index) => {
            return (
              width +
              calculateWordWidth(w, adjustedSmallPixelSize) +
              (index > 0 ? WORD_SPACING * adjustedSmallPixelSize : 0)
            );
          }, 0);

    let startX = (heroRef.value.width - totalWidth) / 2;

    if (wordIndex === 1) {
      word.split(' ').forEach((subWord) => {
        subWord.split('').forEach((letter) => {
          const pixelMap = PIXEL_MAP[letter];
          if (!pixelMap) return;

          for (let i = 0; i < pixelMap.length; i++) {
            for (let j = 0; j < pixelMap[i].length; j++) {
              if (pixelMap[i][j]) {
                const x = startX + j * pixelSize;
                const y = startY + i * pixelSize;
                pixels.value.push({ x, y, size: pixelSize, hit: false });
              }
            }
          }
          startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize;
        });
        startX += WORD_SPACING * adjustedSmallPixelSize;
      });
    } else {
      word.split('').forEach((letter) => {
        const pixelMap = PIXEL_MAP[letter];
        if (!pixelMap) return;

        for (let i = 0; i < pixelMap.length; i++) {
          for (let j = 0; j < pixelMap[i].length; j++) {
            if (pixelMap[i][j]) {
              const x = startX + j * pixelSize;
              const y = startY + i * pixelSize;
              pixels.value.push({ x, y, size: pixelSize, hit: false });
            }
          }
        }
        startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize;
      });
    }
    startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0;
  });

  const ballStartX = heroRef.value.width * 0.9;
  const ballStartY = heroRef.value.height * 0.1;

  ball.value = {
    x: ballStartX,
    y: ballStartY,
    dx: -BALL_SPEED,
    dy: BALL_SPEED,
    radius: adjustedLargePixelSize / 2,
  };

  const paddleWidth = adjustedLargePixelSize;
  const paddleLength = 10 * adjustedLargePixelSize;

  paddles.value = [
    {
      x: 0,
      y: heroRef.value.height / 2 - paddleLength / 2,
      width: paddleWidth,
      height: paddleLength,
      targetY: heroRef.value.height / 2 - paddleLength / 2,
      isVertical: true,
    },
    {
      x: heroRef.value.width - paddleWidth,
      y: heroRef.value.height / 2 - paddleLength / 2,
      width: paddleWidth,
      height: paddleLength,
      targetY: heroRef.value.height / 2 - paddleLength / 2,
      isVertical: true,
    },
    {
      x: heroRef.value.width / 2 - paddleLength / 2,
      y: 0,
      width: paddleLength,
      height: paddleWidth,
      targetY: heroRef.value.width / 2 - paddleLength / 2,
      isVertical: false,
    },
    {
      x: heroRef.value.width / 2 - paddleLength / 2,
      y: heroRef.value.height - paddleWidth,
      width: paddleLength,
      height: paddleWidth,
      targetY: heroRef.value.width / 2 - paddleLength / 2,
      isVertical: false,
    },
  ];
};

const updateGame = () => {
  ball.value.x += ball.value.dx;
  ball.value.y += ball.value.dy;

  if (
    ball.value.y - ball.value.radius < 0 ||
    ball.value.y + ball.value.radius > heroRef.value.height
  ) {
    ball.value.dy = -ball.value.dy;
  }
  if (
    ball.value.x - ball.value.radius < 0 ||
    ball.value.x + ball.value.radius > heroRef.value.width
  ) {
    ball.value.dx = -ball.value.dx;
  }

  paddles.value.forEach((paddle) => {
    if (paddle.isVertical) {
      if (
        ball.value.x - ball.value.radius < paddle.x + paddle.width &&
        ball.value.x + ball.value.radius > paddle.x &&
        ball.value.y > paddle.y &&
        ball.value.y < paddle.y + paddle.height
      ) {
        ball.value.dx = -ball.value.dx;
      }
    } else {
      if (
        ball.value.y - ball.value.radius < paddle.y + paddle.height &&
        ball.value.y + ball.value.radius > paddle.y &&
        ball.value.x > paddle.x &&
        ball.value.x < paddle.x + paddle.width
      ) {
        ball.value.dy = -ball.value.dy;
      }
    }
  });

  paddles.value.forEach((paddle) => {
    if (paddle.isVertical) {
      paddle.targetY = ball.value.y - paddle.height / 2;
      paddle.targetY = Math.max(
        0,
        Math.min(heroRef.value.height - paddle.height, paddle.targetY)
      );
      paddle.y += (paddle.targetY - paddle.y) * 0.1;
    } else {
      paddle.targetY = ball.value.x - paddle.width / 2;
      paddle.targetY = Math.max(
        0,
        Math.min(heroRef.value.width - paddle.width, paddle.targetY)
      );
      paddle.x += (paddle.targetY - paddle.x) * 0.1;
    }
  });

  pixels.value.forEach((pixel) => {
    if (
      !pixel.hit &&
      ball.value.x + ball.value.radius > pixel.x &&
      ball.value.x - ball.value.radius < pixel.x + pixel.size &&
      ball.value.y + ball.value.radius > pixel.y &&
      ball.value.y - ball.value.radius < pixel.y + pixel.size
    ) {
      pixel.hit = true;
      const centerX = pixel.x + pixel.size / 2;
      const centerY = pixel.y + pixel.size / 2;
      if (Math.abs(ball.value.x - centerX) > Math.abs(ball.value.y - centerY)) {
        ball.value.dx = -ball.value.dx;
      } else {
        ball.value.dy = -ball.value.dy;
      }
    }
  });
};

const drawGame = () => {
  if (!ctx.value || !heroRef.value) return;

  const width = heroRef.value.width;
  const height = heroRef.value.height;

  // === Draw background image ===
  if (bgImage.value) {
    ctx.value.drawImage(bgImage.value, 0, 0, width, height);
  }

  // === Background gradient (deep space / cyber grid style) ===
  const gradient = ctx.value.createRadialGradient(
    width / 2,
    height / 2,
    100,
    width / 2,
    height / 2,
    width
  );
  // gradient.addColorStop(0, '#111');
  // gradient.addColorStop(1, '#000');
  gradient.addColorStop(0, 'rgba(17, 17, 17, 0.3)'); // Semi-transparent
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)'); // Semi-transparent
  ctx.value.globalCompositeOperation = 'multiply'; // Blend gradient with image
  ctx.value.fillStyle = gradient;
  ctx.value.fillRect(0, 0, width, height);
  ctx.value.globalCompositeOperation = 'source-over'; // Reset to default

  // === Draw glowing pixels (text/animation) ===
  pixels.value.forEach((pixel) => {
    const flicker = 0.8 + Math.random() * 0.2;
    ctx.value.globalAlpha = flicker;

    ctx.value.shadowColor = pixel.hit ? TEXT_HIT_COLOR : TEXT_COLOR;
    ctx.value.shadowBlur = 15;
    ctx.value.fillStyle = pixel.hit ? TEXT_HIT_COLOR : TEXT_COLOR;
    ctx.value.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
  });

  ctx.value.globalAlpha = 1; // reset for stable elements

  // === Draw glowing ball ===
  ctx.value.shadowColor = BALL_COLOR;
  ctx.value.shadowBlur = 25;
  ctx.value.fillStyle = BALL_COLOR;
  ctx.value.beginPath();
  ctx.value.arc(ball.value.x, ball.value.y, ball.value.radius, 0, Math.PI * 2);
  ctx.value.fill();

  // === Draw glowing paddles ===
  paddles.value.forEach((paddle) => {
    ctx.value.shadowColor = PADDLE_COLOR;
    ctx.value.shadowBlur = 20;
    ctx.value.fillStyle = PADDLE_COLOR;
    ctx.value.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  });

  // === Optional: Scanlines overlay for CRT vibe ===
  ctx.value.shadowBlur = 0;
  ctx.value.globalAlpha = 0.05;
  ctx.value.fillStyle = '#0FF';

  for (let y = 0; y < height; y += 4) {
    ctx.value.fillRect(0, y, width, 1);
  }

  ctx.value.globalAlpha = 1; // reset alpha
};

const gameLoop = () => {
  updateGame();
  drawGame();
  requestAnimationFrame(gameLoop);
};

const resizeCanvas = () => {
  heroRef.value.width = window.innerWidth;
  heroRef.value.height = window.innerHeight;
  scale.value = Math.min(
    heroRef.value.width / 1000,
    heroRef.value.height / 1000
  );
  initializeGame();
};

onMounted(() => {
  ctx.value = heroRef.value?.getContext('2d');
  if (!ctx.value) return;

  // Load background image
  const img = new Image();
  img.src = '/images/frame.svg';
  // image
  img.onload = () => {
    bgImage.value = img;
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  gameLoop();
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
});
</script>
