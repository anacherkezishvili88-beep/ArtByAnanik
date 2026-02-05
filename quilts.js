const quilts = (p) => {

  let colors;
  let blocks = [];


  class Block {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.layers = p.int(p.random(3, 6)); 
    }

    display() {
      let cx = this.x + this.w / 2;
      let cy = this.y + this.h / 2;
      let layerW = this.w;
      let layerH = this.h;

      for (let i = 0; i < this.layers; i++) {
        p.fill(p.random(colors));
        p.rectMode(p.CENTER);
        // Add the wiggle effect
        p.rect(cx + p.random(-3, 3), cy + p.random(-3, 3), layerW, layerH);
        
        // Shrink the next layer
        layerW *= p.random(0.6, 0.8);
        layerH *= p.random(0.6, 0.8);
      }
    }
  }


  p.setup = function() {
    let canvas = p.createCanvas(420, 550);
    p.noStroke();
    p.frameRate(4); // Slows it down to a "stop motion" feel

    // Define colors 
    colors = [
      p.color(180, 130, 60),    // Tan
      p.color(100, 50, 30),     // Dark brown
      p.color(220, 60, 40),     // Red
      p.color(240, 180, 70),    // Yellow
      p.color(120, 180, 90),    // Olive green
      p.color(240, 240, 210),   // Light cream
      p.color(255, 100, 50),    // Orange
    ];

    let rows = 4;
    let columns = 3;
    let blockW = 130;
    let blockH = 130;
    let xOffset = 20;
    let yOffset = 20;

    // Create blocks
    for (let y = 0; y < rows; y++) {
      blocks[y] = []; 
      for (let x = 0; x < columns; x++) {
        let bx = x * blockW + xOffset;
        let by = y * blockH + yOffset;
        blocks[y][x] = new Block(bx, by, blockW - 10, blockH - 10);
      }
    }
  };


  p.draw = function() {
    p.background(220);

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        blocks[y][x].display();
      }
    }
  };
};


new p5(quilts, 'quilts-container');
