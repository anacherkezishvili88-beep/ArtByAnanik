const orchid = (p) => {

  p.setup = function() {
    p.createCanvas(400, 400);
  };

  p.draw = function() {
    
    p.background(51, 10); 
    
    p.noStroke();
    let c1 = p.color('rgb(30, 100, 200)');
    p.fill(c1);
    
   
    p.ellipse(p.mouseX, 175, p.mouseY);

    p.stroke(255, 204, 0);
    p.strokeWeight(6);
    
  
    p.text(`]${p.mouseX}, ${p.mouseY}`, 20, 20);

    
    p.fill(255, 204, 0, 0);
    p.triangle(p.mouseX, p.mouseY, 375, 1, 375, 375);
  };
};


new p5(orchid, 'orchid-container');
