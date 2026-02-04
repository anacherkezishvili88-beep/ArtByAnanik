const faceGenerator = (p) => {

  let eye = 1;
  let face = 1;
  let nose = 1;
  let mouth = 1;
  let brows = 1;
  let hair = 1;
  let accessories = 1;
  let lashes = 1;
  let bg = 1;

  
  p.setup = function() {
    let canvas = p.createCanvas(400, 400);
    
    // the mouse click event ONLY to this canvas
    canvas.mousePressed(changeFeatures);
  };

  
  p.draw = function() {
    p.translate(p.width / 2, p.height / 2); 
    let scaleX = p.width / 400;
    let scaleY = p.height / 400;
    p.scale(scaleX, -scaleY);
    
    // Backgrounds 
    if (bg == 1) { 
      p.background(235, 164, 219); 
    } 
    if (bg == 2) {
      p.background(245, 144, 29); 
    } 
    if (bg == 3) {
      p.background(135, 165, 230); 
    } 
    if (bg == 4) {
      p.background(128, 133, 145); 
    }
    
    // Faces
    if (face == 1) { // me
      p.push(); 
      p.rectMode(p.CENTER);
      p.fill(250, 195, 132);
      p.rect(0, 0, 230, 250, 180); 
      p.pop();
    }
    
    if (face == 2) { // bianca
      p.push(); 
      p.rectMode(p.CENTER);
      p.fill(252, 237, 227);
      p.rect(0, 0, 230, 220, 150);
      p.pop();
    }
    
    if (face == 3) { // c
      p.push();
      p.rectMode(p.CENTER);
      p.fill(247, 217, 166);
      p.rect(0, 0, 220, 250, 90);
      p.pop();
    }
    
    if (face == 4) { // suri
      p.push(); 
      p.rectMode(p.CENTER); 
      p.fill(235, 196, 129);
      p.rect(0, 0, 220, 250, 180); 
      p.pop();
    }
    
    // Draw Hairs
    if (hair == 1) { // me
      p.push();
      p.translate(0, 100);  
      p.rotate(p.radians(45));
      p.noStroke();
      p.fill(139, 69, 19);
      p.ellipse(-60, 35, 170, 90);
      p.rotate(p.radians(-80));
      p.ellipse(40, 15, 200, 100);
      
      p.push();
      p.translate(110, -260);
      p.rotate(p.radians(-60));
      p.ellipse(-150, -80, 140, 80);
      p.pop();
      
      p.push();
      p.translate(0, 0);
      p.rotate(p.radians(-45));
      p.ellipse(150, 100, 180, 100);
      p.pop();
      
      p.push();
      p.translate(0,0);
      p.ellipse(0, -200, 100, 80);
      p.pop();
      
      p.push();
      p.translate(290,-190);
      p.rotate(p.degrees(91));
      p.scale(1.25);
      p.ellipse(-50, -30, 180, 90);
      p.pop();
      
      p.push();
      p.translate(20,20);
      p.rotate(p.degrees(180));
      p.ellipse(-70, -22, 90, 60);
      p.pop();
      
      p.push();
      p.translate(130,-260);
      p.rotate(p.radians(140));
      p.scale(-1.25, 1.25);
      p.ellipse(-50, 30, 150, 90);
      p.pop();

      p.pop();
    }
    
    // Eyes
    if (eye == 1) { // me
      p.fill(255);
      p.push();
      p.translate(-50, -5);     
      p.scale(2, 1);            
      p.ellipse(0, 15, 35, 40); 
      p.fill(139, 69, 19);  
      p.ellipse(-8, 8, 8, 15); 
      p.pop();

      p.push();
      p.translate(50, -5);     
      p.scale(2, 1);            
      p.ellipse(0, 15, 35, 40); 
      p.fill(139, 69, 19);  
      p.ellipse(-8, 8, 8, 15); 
      p.pop();
    }
    
    if (eye == 2) { // bianca
      p.fill(255); 
      p.push();
      p.translate(-55, -15);     
      p.scale(2, 1);            
      p.ellipse(5, 25, 30, 50); 
      p.fill(10, 89, 31);  
      p.ellipse(5, 20, 10, 20); 
      p.pop();

      p.push();
      p.translate(55, -15);     
      p.scale(2, 1);            
      p.ellipse(-5, 25, 30, 50);
      p.fill(10, 89, 31);  
      p.ellipse(-5, 20, 10, 20); 
      p.pop();
    }
    
    if (eye == 3) { // c
      p.fill(255); 
      p.push();
      p.translate(-60, -13);     
      p.scale(2, 1);            
      p.ellipse(5, 25, 40, 50); 
      p.fill(227, 151, 36);  
      p.ellipse(15, 35, 10, 20); 
      p.pop();

      p.push();
      p.translate(60, -13);     
      p.scale(2, 1);            
      p.ellipse(-5, 25, 40, 50);
      p.fill(227, 151, 36);  
      p.ellipse(6, 35, 10, 20); 
      p.pop();
    }
    
    if (eye == 4) { // suri
      p.fill(255); 
      p.push();
      p.translate(-60, 0);     
      p.scale(2, 1);            
      p.ellipse(5, 10, 40, 35); 
      p.fill(46, 29, 2);  
      p.ellipse(6, 15, 5, 15); 
      p.pop();

      p.push();
      p.translate(60, 0);     
      p.scale(2, 1);            
      p.ellipse(-5, 10, 40, 35);
      p.fill(46, 29, 2);  
      p.ellipse(-3, 15, 5, 15); 
      p.pop();
    }

    // Noses
    if (nose == 1) { // me
      p.push();
      p.noFill();
      p.stroke(0);
      p.strokeWeight(2);
      p.scale(1, 1.5);
      p.line(0, 5, -15, -25);
      p.line(13, -25, -14, -25);
      p.pop();
    }

    if (nose == 2) { // bianca
      p.push();
      p.noFill();
      p.stroke(0);
      p.strokeWeight(2);
      p.scale(1, 1.5);
      p.arc(0, -20, 30, 20, 180, 360);
      p.pop();
    }
   
    if (nose == 3) { // c
      p.push();
      p.noFill();
      p.stroke(0);
      p.strokeWeight(2);
      p.scale(1, 1.5);
      p.line(0, 0, 15, -30);
      p.line(15, -30, -10, -30);
      p.pop();
    }
   
    if (nose == 4) { // suri
      p.push();
      p.noFill();
      p.stroke(0);
      p.strokeWeight(2);
      p.scale(1, 1.5);
      p.line(15, -15, 0, -25);
      p.line(0, -25, -15, -15);
      p.pop();
    }
    
    // Mouths
    if (mouth == 1) { // me
      p.push();
      p.stroke(0);
      p.strokeWeight(1.5);
      p.fill(200, 80, 90); 
      // top lip curve
      p.beginShape();
      p.vertex(-20, -70); 
      p.bezierVertex(-10, -60, 10, -60, 20, -70);
      p.endShape();
      
      // bottom lip curve
      p.beginShape();
      p.vertex(-20, -70); 
      p.bezierVertex(-10, -75, 10, -75, 20, -70);
      p.endShape(p.CLOSE);
      p.pop();
    }
   
    if (mouth == 2) { // bianca
      p.push();
      p.stroke(0);
      p.strokeWeight(1.5);
      p.fill(171, 44, 57);
      p.beginShape();
      p.vertex(-15, -70); 
      p.bezierVertex(-10, -60, 10, -60, 15, -70); 
      p.endShape();
      p.beginShape();
      p.vertex(-15, -70);
      p.bezierVertex(-10, -75, 10, -75, 15, -70);
      p.endShape(p.CLOSE);
      p.pop();
    }

    if (mouth == 3) { // c
      p.push();
      p.stroke(0);
      p.strokeWeight(1.5);
      p.fill(230, 100, 120);
      p.arc(0, -70, 40, 15, p.PI, 0);
      p.beginShape();
      p.vertex(-22, -70);  
      p.bezierVertex(-15, -65, 15, -65, 22, -70);
      p.vertex(22, -70);
      p.vertex(-22, -70);
      p.endShape(p.CLOSE);
      p.pop();
    }
    
    if (mouth == 4) { // suri
      p.push();
      p.stroke(0);
      p.strokeWeight(1.5);
      p.fill(230, 100, 120);
      p.ellipse(0, -70, 35, 18);
      p.stroke(150, 0, 50);
      p.strokeWeight(1);
      p.line(-15, -70, 15, -70);
      p.pop();
    }
    
    // Eyebrows
    if (brows == 1) { // me
      p.push();
      p.stroke(66, 45, 3);
      p.strokeWeight(6);
      p.noFill();
      p.beginShape();
      p.vertex(-85, 40);
      p.bezierVertex(-50, 45, -10, 35, -10, 45);
      p.endShape();
      p.beginShape();
      p.vertex(85, 40);
      p.bezierVertex(50, 45, 10, 35, 10, 45);
      p.endShape();
      p.pop();
    }

    if (brows == 2) { // bianca
      p.push();
      p.stroke(0);
      p.strokeWeight (1.5);
      p.fill(100, 70, 50);
      p.ellipse(-40, 45, 55, 8);
      p.ellipse(40, 45, 55, 8);
      p.pop();
    }

    if (brows == 3) { // c
      p.push();
      p.stroke(94, 64, 3);
      p.strokeWeight(6);
      p.noFill();
      p.beginShape();
      p.vertex(-85, 50);
      p.bezierVertex(-52, 50, -11, 52, -30, 50);
      p.endShape();
      p.beginShape();
      p.vertex(85, 50);
      p.bezierVertex(52, 50, 11, 52, 30, 50);
      p.endShape();
      p.pop();
    }
      
    if (brows == 4) { // suri
      p.push();
      p.stroke(0);
      p.strokeWeight(4);
      p.line(-80, 45, -30, 40);
      p.line(80, 45, 30, 40);
      p.pop(); 
    }
    
    // Accessories
    if (accessories == 1 && face == 3) { // c
      p.push();
      p.fill(200);
      p.stroke(0);
      p.strokeWeight(0.5);
      p.ellipse(-77, 60, 5, 5);
      p.ellipse(-77, 40, 5, 5);
      p.pop(); 
    }
    
    if (accessories == 1 && face == 4) { // suri
      p.push();
      p.noFill();
      p.stroke(125, 123, 120);
      p.strokeWeight(3);
      p.rectMode(p.CENTER);
      p.rect(-50, 10, 70, 40, 5);
      p.rect(50, 10, 70, 40, 5);
      p.line(-15, 10, 15, 10);
      p.line(-88, 10, -115, 8);
      p.line(88, 10, 115, 8);
      p.pop();

      p.push();
      p.fill(200); 
      p.stroke(1);
      p.strokeWeight(0.5);
      p.ellipse(0, -75, 5, 5);
      p.pop();
    }
    
    // Eyelashes
    if (face == 1 && eye == 1) {
      p.push();
      p.stroke(0);
      p.strokeWeight(2);

      // Left eye lashes
      p.push();
      p.translate(-80, -3); 
      p.line(-5, 18, -10, 25); 
      p.line(-2, 22, -5, 28);    
      p.line(-15, 20, -3, 7);    
      p.pop();

      // Right eye lashes
      p.push();
      p.translate(80, -3); 
      p.line(5, 18, 10, 25); 
      p.line(2, 22, 5, 28);    
      p.line(15, 20, 3, 7);  
      p.pop();

      p.pop();
    }

    if (face == 2 && eye == 2) {
      p.push();
      p.fill(0);
      p.noStroke();

      // Left eye lashes
      p.push();
      p.translate(-55, -15);  
      p.scale(2, 1);
      p.ellipse(-10, 35, 1.5, 12);
      p.ellipse(-8, 43, 1.5, 12);
      p.pop();
      
       // Right eye lashes
      p.push();
      p.translate(55, -15); 
      p.scale(2, 1);
      p.ellipse(10, 35, 1.5, 12);
      p.ellipse(8, 43, 1.5, 12);
      p.pop();

      p.pop();
    } 
  };

 
  // called by canvas.mousePressed() above
  function changeFeatures() {
    face = (face % 4) + 1;
    eye = (eye % 4) + 1;
    nose = (nose % 4) + 1;
    mouth = (mouth % 4) + 1;
    brows = (brows % 4) + 1;
    hair = (hair % 4) + 1;
    bg = (bg % 4) + 1; 
  }
};

// Start the sketch
new p5(faceGenerator, 'face_generator-container');
