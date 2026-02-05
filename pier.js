const pier = (p) => {

  let boatX;
  let boatSpeed = 1;


  p.setup = function() {
    let canvas = p.createCanvas(400, 400);
    boatX = -150;
  };

  p.draw = function() {
    p.background(200); // 400 is not a valid grayscale (0-255), so I set it to 200 (light gray)
    p.noStroke();
    
    // move Boat
    boatX = boatX + boatSpeed;
    if (boatX > p.width) {
      boatX = -100;
    }
    
    // sky
    p.fill(124, 159, 230);
    p.rect(0, 0, 400, 130);
    
    // sky Gradient
    let skyTopColor = p.color(98, 143, 191);
    let skyBottomColor = p.color(25, 99, 179);
    
    for (let y = 0; y < 130; y++) {
      let inter = p.map(y, 0, 130, 0, 1);
      let c = p.lerpColor(skyTopColor, skyBottomColor, inter);
      p.stroke(c);
      p.line(0, y, p.width, y);
    }
    p.noStroke();

    // the river
    p.fill(52, 69, 207);
    p.rect(0, 130, 400, 270);
    
    // river Gradient
    let riverTopColor = p.color(52, 69, 207);
    let riverBottomColor = p.color(143, 183, 219);
    
    for (let y = 130; y < 400; y++) {
      let inter = p.map(y, 130, 400, 0, 1);
      let c = p.lerpColor(riverTopColor, riverBottomColor, inter);
      p.stroke(c);
      p.line(0, y, p.width, y);
    }
    p.noStroke();

    // pier sticks
    
    // bottom Left
    p.fill(171, 113, 7);
    p.push();
    p.translate(0, p.height);
    p.scale(1, -1);
    
    let cx = (30 + 40) / 2;
    let cy = (30 + 70) / 2;
    p.translate(cx, cy);
    p.scale(5);       
    p.translate(-cx, -cy);
    p.quad(30, 70, 40, 68, 40, 55, 30, 30);
    p.pop();

    // bottom Right
    p.fill(171, 113, 7);
    p.push();
    p.translate(0, p.height);
    p.scale(1, -1);
    
    let centerX = (360 + 370 + 370 + 360) / 4;
    let centerY = (68 + 70 + 30 + 40) / 4;
    
    p.push();
    p.translate(centerX, centerY);
    p.scale(5);
    p.quad(360 - centerX, 68 - centerY,
           370 - centerX, 70 - centerY,
           370 - centerX, 30 - centerY,
           360 - centerX, 40 - centerY);
    p.pop();
    p.pop();

    // Middle Left
    p.push();
    p.translate(0, p.height);
    p.scale(1, -1);
    let c1x = (30 + 40) / 2;
    let c1y = (30 + 75) / 2;
    p.translate(c1x, c1y);
    p.scale(3);      
    p.translate(-c1x, -c1y);
    p.quad(50, 90, 60, 88, 60, 75, 50, 50);
    p.pop();

    // Middle Right
    p.fill(171, 113, 7);
    p.push();
    p.translate(0, p.height);
    p.scale(1, -1);
    let c2x = (360 + 360) / 2;
    let c2y = (37 + 70) / 2;
    p.translate(c2x, c2y);
    p.scale(3);      
    p.translate(-c2x, -c2y);
    p.quad(340, 88, 350, 90, 350, 50, 340, 75);
    p.pop();

    // Top Left
    p.push();
    p.translate(0, p.height);
    p.scale(1, -1);
    let c3x = (29 + 10) / 2;
    let c3y = (10 + 45) / 2;
    p.translate(c3x, c3y);
    p.scale(2);      
    p.translate(-c3x, -c3y);
    p.quad(70, 110, 80, 108, 80, 95, 70, 70);
    p.pop();

    // Top Right
    p.fill(171, 113, 7);
    p.push();
    p.translate(0, p.height);
    p.scale(1, -1);
    let c4x = (390 + 377) / 2;
    let c4y = (40 + 9) / 2;
    p.translate(c4x, c4y);
    p.scale(2);      
    p.translate(-c4x, -c4y);
    p.quad(320, 108, 330, 110, 330, 70, 320, 95);
    p.pop();

    // pier deck 
    p.fill(128, 133, 138);
    p.push();
    p.translate(0, p.height); 
    p.scale(1, -1); 
    p.quad(150, 200, 250, 200, 400, 0, 0, 0);
    p.pop();

    // boat
    p.fill(255); // White Base
    p.quad(boatX + 30, 150, boatX + 120, 150, boatX + 100, 180, boatX + 50, 180);
    
    p.fill(170); // Gray Top
    p.quad(boatX + 75, 135, boatX + 100, 135, boatX + 115, 150, boatX + 65, 150);
  };
};

// sstart the sketch
new p5(pier, 'pier-container');
