let song;       
let fft;      

let maxDiam = 250;
let minDiam = 10;
let diam;       


function preload() {
  song = loadSound('Aphex Twin-Xtal.mp3'); 
}

function setup() {
 // create the canvas
  canvas = createCanvas(600, 600);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
  noFill();
  fft = new p5.FFT();
  fft.setInput(song);
  diam = minDiam; 
  
}

function draw() {
  background(0);


  stroke(random(255), random(255), random(255));
  strokeWeight(3);
  
  fft.analyze();
  
  if (song.isPlaying()) {
    let bassEnergy = fft.getEnergy("bass"); 
    diam = map(bassEnergy, 150, 300, minDiam, maxDiam);
    
  } else {
    diam = minDiam;
  }
  
  for (let y = 0; y < height + maxDiam; y += maxDiam / 2.1) {
    for (let x = 0; x < width + maxDiam; x += maxDiam / 2.1) {
      if (random(2) > 0.5) { 
        ellipse(x, y, diam, diam);
      }
    }
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}

