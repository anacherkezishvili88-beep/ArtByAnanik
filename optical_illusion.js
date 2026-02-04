const opticalIllusion = ( p ) => {

  let song;       
  let fft;      
  let maxDiam = 250;
  let minDiam = 10;
  let diam;       
  let canvas; // to store the canvas variables within javascript

  p.preload = function() {
    song = p.loadSound('Aphex Twin-Xtal.mp3'); 
  };

// i'm using p here because i want all of my p5 projects to be in one place like the user scrolling through the projects, therefore since javascript can't have multiple functions named just setup(), I'm giving the sketch it's label and I'm telling javascript that "p" is optical illusion. 
// "p" is like the word you. it's like a pronoun too 
  p.setup = function() {
    canvas = p.createCanvas(600, 600);
    canvas.parent("optical_illusion-container");
    canvas.mousePressed(toggleSong); // you gotta click the canvas for the animation to start so i'm telling javascript to only start that when clicked on this specific canvas

    p.noFill();
    fft = new p5.FFT();
    fft.setInput(song);
    diam = minDiam; 
  };

  p.draw = function() {
    p.background(0);

    // use p.random
    p.stroke(p.random(255), p.random(255), p.random(255));
    p.strokeWeight(3);
    
    fft.analyze();

    if (song.isPlaying()) {
      let bassEnergy = fft.getEnergy("bass"); 
      // use p.map
      diam = p.map(bassEnergy, 150, 300, minDiam, maxDiam);
    } else {
      diam = minDiam;
    }

    // use p.height and p.width
    for (let y = 0; y < p.height + maxDiam; y += maxDiam / 2.1) {
      for (let x = 0; x < p.width + maxDiam; x += maxDiam / 2.1) {
        if (p.random(2) > 0.5) { 
          p.ellipse(x, y, diam, diam);
        }
      }
    }
  };
  
// function that handles playing/stopping
  function toggleSong() {
    if (song.isPlaying()) {
      song.stop();
    } else {
      song.play();
    }
  }
};

new p5(opticalIllusion);
