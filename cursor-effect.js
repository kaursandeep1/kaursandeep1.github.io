// Liquid Gradient Effect - Exactly what you want!
// Based on the design you liked, with YOUR colors

class LiquidGradient {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    document.body.prepend(this.canvas);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // YOUR COLORS - amber (#f59e0b) and violet (#8b5cf6)
    this.colors = [
      { r: 0.961, g: 0.619, b: 0.043 }, // Amber
      { r: 0.545, g: 0.361, b: 0.965 }, // Violet
      { r: 0.961, g: 0.619, b: 0.043 }, // Amber
      { r: 0.545, g: 0.361, b: 0.965 }, // Violet
    ];

    this.shift = 0;
    this.mouseX = 0.5;
    this.mouseY = 0.5;

    this.animate();
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX / this.width;
      this.mouseY = e.clientY / this.height;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Create gradient waves
    for (let i = 0; i < 5; i++) {
      const gradient = this.ctx.createLinearGradient(
        0,
        this.height * 0.5,
        this.width,
        this.height * 0.5
      );

      // Add colors with wave effect
      gradient.addColorStop(0, `rgba(${this.colors[0].r * 255}, ${this.colors[0].g * 255}, ${this.colors[0].b * 255}, 0.8)`);
      gradient.addColorStop(0.3, `rgba(${this.colors[1].r * 255}, ${this.colors[1].g * 255}, ${this.colors[1].b * 255}, 0.7)`);
      gradient.addColorStop(0.6, `rgba(${this.colors[2].r * 255}, ${this.colors[2].g * 255}, ${this.colors[2].b * 255}, 0.8)`);
      gradient.addColorStop(1, `rgba(${this.colors[3].r * 255}, ${this.colors[3].g * 255}, ${this.colors[3].b * 255}, 0.7)`);

      // Create wave pattern
      const wave1 = Math.sin(this.shift + i * 0.5) * 0.1;
      const wave2 = Math.cos(this.shift + i * 0.3) * 0.1;
      const wave3 = Math.sin(this.shift + i * 0.7) * 0.1;

      this.ctx.save();
      this.ctx.translate(
        this.width * (wave1 + (this.mouseX - 0.5) * 0.2),
        this.height * (wave2 + (this.mouseY - 0.5) * 0.2)
      );
      this.ctx.scale(1 + wave3, 1 + wave3);
      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = 0.3;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }

    this.shift += 0.02;
    requestAnimationFrame(() => this.draw());
  }

  animate() {
    this.draw();
  }
}

// Start the effect
new LiquidGradient();
