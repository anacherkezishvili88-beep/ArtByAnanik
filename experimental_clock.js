const experimentalClock = (p) => {    //basically creating a private room for each project since they're all placed on the same webpage //the  arrow is basically like a door for this "room"
 
  // variables strictly for this sketch
  let video;
  let previousPixels;
  let motionTime = 0; // time variable in "Motion Units" (M.U.)
  let stillTime = 0; // tracks frames with no motion
  const STILL_THRESHOLD = 15; // number of frames to trigger 'stillness' 
  const BACKGROUND_COLOR = 240; 
  const pixelThreshold = 30; // pixel difference threshold to count as motion

  p.setup = function() {
    p.createCanvas(600, 600);
    p.background(BACKGROUND_COLOR);
    p.colorMode(p.HSB, 255);

    // setup video
    video = p.createCapture(p.VIDEO);
    video.size(600, 600);
    video.parent('raw-video-container');
   
    p.frameRate(80);
  };

  p.draw = function() {
    p.noStroke();
    p.fill(BACKGROUND_COLOR, 10);
    p.rect(0, 0, p.width, p.height);

    // load the pixel data from the current video frame
    video.loadPixels();

    if (video.pixels.length > 0) {
      
      // store the current pixels and skip the rest of the loop if first frame
      if (!previousPixels) {
        previousPixels = video.pixels.slice(); 
        return;
      }

      let motionPixelCount = 0

      for (let i = 0; i < video.pixels.length; i += 4) {

        //RGB values of the cuurrent frame 
        let r1 = video.pixels[i];
        let g1 = video.pixels[i + 1];
        let b1 = video.pixels[i + 2];

        //RGB  values  of the previous frame
        let r2 = previousPixels[i];
        let g2 = previousPixels[i + 1];
        let b2 = previousPixels[i + 2];

        // difference between two frames
        let diff = p.abs(r1 - r2) + p.abs(g1 - g2) + p.abs(b1 - b2);
        
        if (diff > pixelThreshold * 3) {
          motionPixelCount++;
          
          // map the array index to a 2D coordinate
          let x = (i / 4) % p.width;
          let y = p.floor((i / 4) / p.width);
          
          let hue = p.map(motionTime % 10, 0, 10, 0, 255);
          p.noStroke();
          p.fill(hue, 200, 255, 100);
          p.ellipse(x, y, 5, 5);
        }
      }

      // IF/ELSE statement for the clock:
      if (motionPixelCount > 1000) { 
        motionTime += motionPixelCount / 20000;
        stillTime = 0; 
      } else {
        stillTime++;
      }
      
      // orb visuals
      let orbHue = p.map(motionTime % 10, 0, 10, 0, 255);
      let orbSize = p.map(motionTime % 10, 0, 10, 10, 500);

      // the orb
      p.noStroke();
      p.fill(orbHue, 200, 255, 180); 
      p.ellipse(p.width / 2, p.height / 2, orbSize, orbSize);

      // display Text
      p.fill(20, 100, 100); 
      p.textSize(24);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Movement Time:', p.width / 2, p.height / 2 - 40);
      
      // p.nf is the instance version of nf()
      p.text(p.nf(motionTime, 0, 2) + ' M.U.', p.width / 2, p.height / 2);

      if (stillTime > STILL_THRESHOLD) {
        p.textSize(18);
        p.fill(255, 0, 0);
        p.text("Time has stopped.", p.width / 2, p.height / 2 + 50);
      }

      // copy pixels for next frame
      previousPixels = video.pixels.slice();
    }
  };
};

// start the sketch specifically for the clock container
new p5(experimentalClock, 'experimental_clock-container');
