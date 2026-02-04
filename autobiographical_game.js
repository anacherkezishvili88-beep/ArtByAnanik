const autobiographicalGame = ( p ) => {

  // --- SCENE DEFINITIONS ---
  let scene = 0;

  // --- COLORS ---
  let doorColor, knobColor, bgColor;
  let hoverColor; 
  let bubbleBgColor;
  let bubbleTextColor;
  let correctColor, incorrectColor; 
  let uiBackgroundColor; 

  // --- IMAGE & FONT VARIABLES ---
  let anaFont; 
  let roomLayoutImage;        
  let deskSceneBgImage;       
  let idSceneBgImage; 
  let windowSceneImage; 
  let bedSceneImage;

  // Dress-Up Game Images
  let baseDollImage, top1Image, top2Image, top3Image;
  let bottom1Image, bottom2Image, bottom3Image;

  // LOL scene photos
  let meme1Image, meme2Image;

  // --- POSITIONS ---
  let doorX, doorY, doorWidth, doorHeight; 
  let backButtonX, backButtonY, backButtonW, backButtonH; 

  // Scene 1 (Main Room) 
  let deskX, deskY, deskW, deskH;
  let bedX, bedY, bedW, bedH;
  let windowX, windowY, windowW, windowH;
  let roomDoorX, roomDoorY, roomDoorW, roomDoorH; 
  let closetX, closetY, closetW, closetH;
  let poster1X, poster1Y, poster1W, poster1H;
  let poster2X, poster2Y, poster2W, poster2H;
  let avatarX, avatarY, avatarW, avatarH;
  let underwearX, underwearY, underwearW, underwearH;

  // Scene 2 (Desk)
  let deskObjects = []; 

  // Scene 8 (ID Game)
  let truthsGameStatements = []; 
  let gameBoxX, gameBoxY, gameBoxW, gameBoxH; 
  let gameTitle = "play 2 truths and a lie (guess the lie)";
  let gameIsOver = false;

  // Dress-Up Game State
  let currentShirt = 0; 
  let currentPants = 0; 
  let uiButtons = [];
  let dollPosition;

  // Description Bubble State
  let activeDescription = null; 
  let descriptionBubbleX, descriptionBubbleY; 

  // Timer
  let doorSceneStartTime = 0;

  // --- PRELOAD ---
  p.preload = function() {
    // Make sure these files are in your main folder!
    anaFont = p.loadFont("font.ttf"); 
    roomLayoutImage = p.loadImage("room_layout.jpg"); 
    deskSceneBgImage = p.loadImage("desk_scene_bg.jpg");
    idSceneBgImage = p.loadImage("id_scene_bg.jpg");
    windowSceneImage = p.loadImage("window_scene.jpg"); 
    bedSceneImage = p.loadImage("bed_scene_bg.jpg");

    // Dress-Up Images 
    baseDollImage = p.loadImage("base_doll1.png"); 
    top1Image = p.loadImage("top1.png");
    top2Image = p.loadImage("top2.png");
    top3Image = p.loadImage("top3.png");
    bottom1Image = p.loadImage("bottom1.png");
    bottom2Image = p.loadImage("bottom2.png");
    bottom3Image = p.loadImage("bottom3.png");
    
    // Memes 
    meme1Image = p.loadImage("meme1.jpg");
    meme2Image = p.loadImage("meme2.jpg");
  };

  // --- SETUP ---
  p.setup = function() {
    let cnv = p.createCanvas(800, 600); 
    cnv.parent('autobiographical_game-container'); // MUST MATCH HTML ID

    // Define Colors
    doorColor = p.color(204, 94, 149);
    bgColor = p.color(235, 206, 219);
    knobColor = p.color(227, 201, 113); 
    hoverColor = p.color(255, 255, 0, 150); 
    bubbleBgColor = p.color(14, 119, 194, 180); 
    bubbleTextColor = p.color(255);
    correctColor = p.color(0, 200, 0); 
    incorrectColor = p.color(255, 0, 0);   
    uiBackgroundColor = p.color(240, 230, 235); 

    // Define Sizes & Positions
    doorWidth = 250;
    doorHeight = 450;
    doorX = (p.width - doorWidth) / 2; 
    doorY = (p.height - doorHeight) / 2;
    
    backButtonX = 20;
    backButtonY = 20;
    backButtonW = 130;  
    backButtonH = 40;   
    
    // Main Room Objects
    deskX = 433; deskY = 117; deskW = 185; deskH = 90;  
    bedX = 357; bedY = 278; bedW = 303; bedH = 224; 
    windowX = 637; windowY = 85;  windowW = 153; windowH = 184; 
    roomDoorX = 10; roomDoorY = 58; roomDoorW = 158; roomDoorH = 185; 
    closetX = 12; closetY = 244; closetW = 168; closetH = 103;
    poster1X = 669; poster1Y = 356; poster1W = 125; poster1H = 134;
    poster2X = 8; poster2Y = 373; poster2W = 146; poster2H = 119;
    avatarX = 190; avatarY = 165; avatarW = 89; avatarH = 182;
    underwearX = 316; underwearY = 423; underwearW = 41; underwearH = 35;

    // Desk Objects
    deskObjects.push({ name: "mirror", x: 274, y: 91, w: 102, h: 139, dotX: 331, dotY: 165, description: "An antique mirror I got in Turkey." });
    deskObjects.push({ name: "current work in progress", x: 11, y: 189, w: 242, h: 281, dotX: 124, dotY: 332, description: "My current painting in progress." });
    deskObjects.push({ name: "color palette", x: 418, y: 470, w: 40, h: 30, dotX: 438, dotY: 487, description: "A color palette my parents got me in the Netherlands." });
    deskObjects.push({ name: "an old painting of mine", x: 503, y: 39, w: 149, h: 175, dotX: 568, dotY: 138, description: "An old painting of mine from first semester studio." });
    deskObjects.push({ name: "Amy Winehouse poster", x: 680, y: 23, w: 60, h: 190, dotX: 704, dotY: 115, description: "A poster of Amy Winehouse, my favorite artist." });
    deskObjects.push({ name: "photo of Sylvia Plath", x: 458, y: 189, w: 40, h: 54, dotX: 476, dotY: 214,  description: "A photo of Sylvia Plath, my favorite author." });
    deskObjects.push({ name: "watercolors", x: 550, y: 420, w: 50, h: 40, dotX: 571, dotY: 436, description: "Watercolors my sister got me for my birthday." });
    deskObjects.push({ name: "photo of my cousin", x: 645, y: 352, w: 38, h: 35, dotX: 664, dotY: 372, description: "Photo of my cousin when she was a baby" });
    deskObjects.push({ name: "my old sketchbook", x: 660, y: 400, w: 40, h: 40, dotX: 678, dotY: 417, description: "My old sketchbook. Full of horrendus drawings." });
    deskObjects.push({ name: "poster my roommate made", x: 680, y: 220, w: 60, h: 50, dotX: 691, dotY: 239,  description: "A poster my roommate made." });

    // ID Game Setup
    gameBoxX = 10; gameBoxY = 402; gameBoxW = 769; gameBoxH = 165;
    let statementTextSize = 18; 
    let lineSpacing = 35; 
    let firstLineY = gameBoxY + 75; 
    
    truthsGameStatements = []; 
    truthsGameStatements.push({ text: "I got a concussion as a baby.", x: gameBoxX + 20, y: firstLineY,  w: gameBoxW - 40, h: statementTextSize + 10, isLie: false, state: 'neutral' });
    truthsGameStatements.push({ text: "I have older siblings.", x: gameBoxX + 20, y: firstLineY + lineSpacing,  w: gameBoxW - 40, h: statementTextSize + 10, isLie: true, state: 'neutral' });
    truthsGameStatements.push({ text: "I speak 5 languages.", x: gameBoxX + 20, y: firstLineY + lineSpacing * 2,  w: gameBoxW - 40, h: statementTextSize + 10, isLie: false, state: 'neutral' });
    
    // Closet Scene Setup
    dollPosition = { x: 525, y: 300 }; 
    uiButtons = []; 
    // Shirt Buttons
    uiButtons.push({ x: 40, y: 100, w: 80, h: 50, label: "Top 1", type: "shirt", id: 1 });
    uiButtons.push({ x: 130, y: 100, w: 80, h: 50, label: "Top 2", type: "shirt", id: 2 });
    uiButtons.push({ x: 40, y: 160, w: 80, h: 50, label: "Top 3", type: "shirt", id: 3 });
    // Pants Buttons
    uiButtons.push({ x: 40, y: 250, w: 80, h: 50, label: "Bottom 1", type: "pants", id: 1 });
    uiButtons.push({ x: 130, y: 250, w: 80, h: 50, label: "Bottom 2", type: "pants", id: 2 });
    uiButtons.push({ x: 40, y: 310, w: 80, h: 50, label: "Bottom 3", type: "pants", id: 3 });
  };

  // --- DRAW LOOP ---
  p.draw = function() {
    if (scene == 0) drawDoorScene();
    else if (scene == 1) drawRoomScene();
    else if (scene == 2) drawDeskScene(); 
    else if (scene == 3) drawBedScene();
    else if (scene == 4) drawWindowScene();
    else if (scene == 5) drawClosetScene(); 
    else if (scene == 6) drawPoster1Scene();
    else if (scene == 7) drawPoster2Scene();
    else if (scene == 8) drawAvatarScene();
    else if (scene == 9) drawPervScene();

    if (activeDescription !== null) {
      drawDescriptionBubble(activeDescription, descriptionBubbleX, descriptionBubbleY);
    }
  };

  // --- HELPER FUNCTIONS ---
  function isHovering(x, y, w, h) {
    return p.mouseX > x && p.mouseX < x + w && p.mouseY > y && p.mouseY < y + h;
  }

  function drawBackButton(hoverFillColor) {
    let isHoveringBack = isHovering(backButtonX, backButtonY, backButtonW, backButtonH);
    p.noStroke();
    p.textSize(24);
    p.textFont("Courier New");
    p.textAlign(p.LEFT, p.TOP);
    
    if (isHoveringBack) {
      p.fill(hoverFillColor);
      p.cursor(p.HAND);
    } else {
      p.fill(255); 
    }
    
    if (isHoveringBack && p.mouseIsPressed) {
      p.fill(255, 230, 150);
    }
    p.text("< back", backButtonX, backButtonY + 10);
  }

  // --- SCENE DRAWING FUNCTIONS ---
  function drawDoorScene() {
    p.background(bgColor);
    let elapsed = p.millis() - doorSceneStartTime;
    
    p.stroke(0, 0, 0, 70);
    p.strokeWeight(3); 
    p.fill(doorColor);
    p.beginShape();
    p.vertex(doorX, doorY);
    p.bezierVertex(doorX + doorWidth * 0.3, doorY - 15, doorX + doorWidth * 0.7, doorY + 10, doorX + doorWidth, doorY + 5);
    p.bezierVertex(doorX + doorWidth + 10, doorY + doorHeight * 0.6, doorX + doorWidth - 10, doorY + doorHeight * 0.8, doorX + doorWidth, doorY + doorHeight);
    p.vertex(doorX, doorY + doorHeight);
    p.endShape(p.CLOSE);

    p.noFill();
    p.stroke(0, 0, 0, 60);
    p.strokeWeight(3);
    p.bezier(doorX + 50, doorY + 60, doorX + 80, doorY + 200, doorX + 40, doorY + 300, doorX + 50, doorY + 400);
    p.bezier(doorX + 200, doorY + 50, doorX + 170, doorY + 180, doorX + 210, doorY + 320, doorX + 200, doorY + 410);

    p.stroke(0, 0, 0, 0);
    p.strokeWeight(1);
    p.fill(knobColor);
    p.ellipse(doorX + doorWidth * 0.8, doorY + doorHeight * 0.55, 40, 40);
    p.fill(255, 230, 150, 150);
    p.ellipse(doorX + doorWidth * 0.8 + 5, doorY + doorHeight * 0.55 - 5, 15, 15);

    if (elapsed < 5000) {
      let shakeAmount = 4, shakeSpeed = 0.05;
      let xOffset = p.map(p.noise(p.frameCount * shakeSpeed), 0, 1, -shakeAmount, shakeAmount);
      let yOffset = p.map(p.noise(p.frameCount * shakeSpeed + 10000), 0, 1, -shakeAmount, shakeAmount);
      p.fill (250, 194, 65); 
      p.stroke(0);
      p.strokeWeight(4);
      p.textFont(anaFont);
      p.textSize(85);
      p.textAlign(p.CENTER);
      p.text("ANA'S WORLD", p.width / 2 + xOffset, p.height / 2 + yOffset);
    } else {
      p.fill(0);
      p.noStroke();
      p.textAlign(p.CENTER);
      p.textSize(20);
      p.textFont("Georgia");
      p.text("Click To Explore!", p.width / 2, doorY + doorHeight + 40); 
    }
  }

  function drawRoomScene() {
    p.image(roomLayoutImage, 0, 0, p.width, p.height);
    
    let hoverDesk = isHovering(deskX, deskY, deskW, deskH);
    let hoverBed = isHovering(bedX, bedY, bedW, bedH);
    let hoverWindow = isHovering(windowX, windowY, windowW, windowH);
    let hoverRoomDoor = isHovering(roomDoorX, roomDoorY, roomDoorW, roomDoorH); 
    let hoverCloset = isHovering(closetX, closetY, closetW, closetH);
    let hoverPoster1 = isHovering(poster1X, poster1Y, poster1W, poster1H);
    let hoverPoster2 = isHovering(poster2X, poster2Y, poster2W, poster2H);
    let hoverAvatar = isHovering(avatarX, avatarY, avatarW, avatarH);
    let hoverUnderwear = isHovering(underwearX, underwearY, underwearW, underwearH); 
    
    if (hoverDesk) drawHintRect(deskX, deskY, deskW, deskH);
    if (hoverBed) drawHintRect(bedX, bedY, bedW, bedH);
    if (hoverWindow) drawHintRect(windowX, windowY, windowW, windowH);
    if (hoverRoomDoor) drawHintRect(roomDoorX, roomDoorY, roomDoorW, roomDoorH);
    if (hoverCloset) drawHintRect(closetX, closetY, closetW, closetH);
    if (hoverPoster1) drawHintRect(poster1X, poster1Y, poster1W, poster1H);
    if (hoverPoster2) drawHintRect(poster2X, poster2Y, poster2W, poster2H);
    if (hoverAvatar) drawHintRect(avatarX, avatarY, avatarW, avatarH);
    
    if (hoverDesk || hoverBed || hoverWindow || hoverRoomDoor || hoverCloset || hoverPoster1 || hoverPoster2 || hoverAvatar || hoverUnderwear) { 
      p.cursor(p.HAND);
    } else {
      p.cursor(p.ARROW);
    }
  }

  function drawHintRect(x, y, w, h) {
    p.noFill();
    p.stroke(hoverColor); 
    p.strokeWeight(5);
    let wobble = p.map(p.noise(p.frameCount * 0.05), 0, 1, -4, 4);
    let wobble2 = p.map(p.noise(p.frameCount * 0.05 + 1000), 0, 1, -4, 4);
    p.beginShape();
    p.vertex(x + wobble, y + wobble2);
    p.vertex(x + w + wobble2, y + wobble);
    p.vertex(x + w + wobble, y + h + wobble2);
    p.vertex(x + wobble2, y + h + wobble);
    p.endShape(p.CLOSE);
  }

  function drawHintDot(x, y) {
    p.noStroke();
    let dotSize = 10 + p.sin(p.frameCount * 0.1) * 3; 
    p.fill(hoverColor); 
    p.ellipse(x, y, dotSize, dotSize);
  }

  function drawDescriptionBubble(textMessage, x, y) {
    let padding = 15;
    let bubbleTextSize = 18;
    p.textFont("Georgia");
    p.textSize(bubbleTextSize);
    
    let maxWidth = 300;
    let words = textMessage.split(' ');
    let line = '';
    let wrappedText = '';

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let testWidth = p.textWidth(testLine);
      if (testWidth > maxWidth && i > 0) {
        wrappedText += line.trim() + '\n';
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    wrappedText += line.trim();
    
    let lines = wrappedText.split('\n');
    let maxLineWidth = 0;
    for (let l of lines) {
      if (p.textWidth(l) > maxLineWidth) {
        maxLineWidth = p.textWidth(l);
      }
    }

    let bubbleW = maxLineWidth + padding * 2;
    let bubbleH = (p.textAscent() + p.textDescent()) * lines.length + padding * 2;

    if (x + bubbleW > p.width) x = p.width - bubbleW;
    if (y + bubbleH > p.height) y = p.height - bubbleH;
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    p.fill(bubbleBgColor);
    p.noStroke();
    p.rect(x, y, bubbleW, bubbleH, 10); 

    p.fill(bubbleTextColor);
    p.textAlign(p.LEFT, p.TOP);
    p.text(wrappedText, x + padding, y + padding);
  }

  function drawDeskScene() {
    p.background(0); 
    let newImgSize = 600;
    let scaleFactor = newImgSize / 800; 
    let xOffset = (p.width - newImgSize) / 2; 
    let yOffset = 0; 
    p.image(deskSceneBgImage, xOffset, yOffset, newImgSize, newImgSize); 

    let hoverFound = false;
    if (activeDescription === null) {
      for (let item of deskObjects) {
        let hx = (item.x * scaleFactor) + xOffset;
        let hy = (item.y * scaleFactor) + yOffset;
        let hw = item.w * scaleFactor;
        let hh = item.h * scaleFactor;

        if (isHovering(hx, hy, hw, hh)) {
          let dx = (item.dotX * scaleFactor) + xOffset;
          let dy = (item.dotY * scaleFactor) + yOffset;
          drawHintDot(dx, dy); 
          hoverFound = true;
          p.cursor(p.HAND);
        }
      }
    }
    if (!hoverFound && activeDescription === null) p.cursor(p.ARROW);
    else if (activeDescription !== null) p.cursor(p.HAND);
    drawBackButton(p.color(255, 255, 255, 100));
  }

  function drawBedScene() {
    p.background(0); 
    let img = bedSceneImage;
    let imgAspect = img.width / img.height; 
    
    let newW = p.width;
    let newH = p.width / imgAspect;
    let xOffset = 0;
    let yOffset = (p.height - newH) / 2;
    
    p.image(img, xOffset, yOffset, newW, newH);
    
    let hoverBack = isHovering(backButtonX, backButtonY, backButtonW, backButtonH);
    if (hoverBack) p.cursor(p.HAND);
    else p.cursor(p.ARROW);
    drawBackButton(p.color(255, 255, 255, 100));
  }

  function drawWindowScene() {
    p.background(0); 
    let img = windowSceneImage;
    let imgAspect = img.width / img.height; 
    let canvasAspect = p.width / p.height; 
    let newW, newH, xOffset, yOffset;

    if (imgAspect > canvasAspect) {
      newW = p.width; newH = p.width / imgAspect; xOffset = 0; yOffset = (p.height - newH) / 2; 
    } else {
      newH = p.height; newW = p.height * imgAspect; xOffset = (p.width - newW) / 2; yOffset = 0;
    }
    p.image(img, xOffset, yOffset, newW, newH); 
    drawBackButton(p.color(255, 255, 255, 100));
  }

  function drawClosetScene() {
    p.background(255); 
    p.imageMode(p.CENTER);
    p.image(baseDollImage, dollPosition.x, dollPosition.y);
    if (currentPants == 1) p.image(bottom1Image, dollPosition.x, dollPosition.y);
    else if (currentPants == 2) p.image(bottom2Image, dollPosition.x, dollPosition.y);
    else if (currentPants == 3) p.image(bottom3Image, dollPosition.x, dollPosition.y);
    
    if (currentShirt == 1) p.image(top1Image, dollPosition.x, dollPosition.y);
    else if (currentShirt == 2) p.image(top2Image, dollPosition.x, dollPosition.y);
    else if (currentShirt == 3) p.image(top3Image, dollPosition.x, dollPosition.y);
   
    p.imageMode(p.CORNER);
    p.noStroke();
    p.fill(uiBackgroundColor);
    p.rect(0, 0, 250, p.height);
    
    p.fill(50);
    p.textFont(anaFont);
    p.textSize(24);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Tops", 40, 60);
    p.text("Bottoms", 40, 210); 

    let hoverFound = false;
    for (let btn of uiButtons) {
        p.fill(220);
        p.stroke(150);
        p.strokeWeight(2);
        
        if (btn.type === "shirt" && btn.id === currentShirt) {
            p.stroke(255, 0, 0); 
            p.strokeWeight(4);
        }
        if (btn.type === "pants" && btn.id === currentPants) {
            p.stroke(255, 0, 0); 
            p.strokeWeight(4);
        }
        p.rect(btn.x, btn.y, btn.w, btn.h, 10);
        
        p.fill(50);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        p.textFont("Georgia");
        p.text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
        
        if(isHovering(btn.x, btn.y, btn.w, btn.h)) hoverFound = true;
    }
    drawBackButton(p.color(0, 0, 0, 100)); 
    if(isHovering(backButtonX, backButtonY, backButtonW, backButtonH)) hoverFound = true;
    if (hoverFound) p.cursor(p.HAND);
    else p.cursor(p.ARROW);
  }

  function drawPoster1Scene() {
    p.background(50); 
    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(40);
    p.textFont(anaFont);
    p.text("A Poster...(coming soon)", p.width / 2, p.height / 2);
    drawBackButton(p.color(255, 255, 255, 100));
  }

  function drawPoster2Scene() {
    p.background(50); 
    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(40);
    p.textFont(anaFont);
    p.text("Another Poster...(coming soon)", p.width / 2, p.height / 2);
    drawBackButton(p.color(255, 255, 255, 100));
  }

  function drawAvatarScene() {
    p.background(0); 
    p.image(idSceneBgImage, 0, 0, p.width, p.height);
    p.noStroke();
    p.textFont(anaFont);
    p.textSize(22);
    p.textAlign(p.CENTER, p.TOP);
    p.fill(0); 
    p.text(gameTitle, gameBoxX + gameBoxW / 2, gameBoxY + 15); 
    p.textFont("Georgia"); 
    p.textSize(16);
    p.textAlign(p.CENTER, p.TOP);
    p.fill(50); 
    p.text("Click on the statement you think is the lie.", gameBoxX + gameBoxW / 2, gameBoxY + 45); 

    p.textFont(anaFont); 
    p.textSize(18); 
    p.textAlign(p.LEFT, p.TOP);
    
    let hoverFound = false;
    for (let item of truthsGameStatements) {
      let isHovered = isHovering(item.x, item.y, item.w, item.h);
      if (item.state === 'correct') p.fill(correctColor);
      else if (item.state === 'incorrect') p.fill(incorrectColor);
      else if (isHovered && !gameIsOver) { 
        p.fill(knobColor); 
        hoverFound = true;
      } else p.fill(0); 
      p.text(item.text, item.x, item.y);
    }
    if (hoverFound && !gameIsOver) p.cursor(p.HAND);
    else p.cursor(p.ARROW);
    drawBackButton(p.color(255, 255, 255, 100));
  }

  function drawPervScene() {
    p.background(163, 11, 11, 180); 
    p.fill(255); 
    p.noStroke(); 
    p.textFont("Arial Black"); 
    p.textSize(40); 
    p.textAlign(p.CENTER, p.CENTER);
    
    let padding = 50; 
    let textBoxX = padding;
    let textBoxY = 20; 
    let textBoxW = p.width - (padding * 2); 
    let textBoxH = p.height / 2 - 20; 
    p.text("what are you trynna find here. You perv! >:(", textBoxX, textBoxY, textBoxW, textBoxH);
    
    p.imageMode(p.CENTER);
    let memeY = p.height * 0.65;
    let memeW = 250;
    let memeH = 250;
    p.image(meme1Image, p.width * 0.25, memeY, memeW, memeH);
    p.image(meme2Image, p.width * 0.75, memeY, memeW, memeH);
    p.imageMode(p.CORNER); 
  }

  function resetAvatarGame() {
    gameIsOver = false;
    for (let item of truthsGameStatements) {
      item.state = 'neutral';
    }
  }

  // --- MOUSE PRESSED ---
  p.mousePressed = function() {
    // SECURITY CHECK: Only run code if clicking INSIDE this specific canvas
    if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) {
      return; 
    }

    if (activeDescription !== null) {
      activeDescription = null;
      return; 
    }

    let backClicked = isHovering(backButtonX, backButtonY, backButtonW, backButtonH);

    if (scene == 0) {
      let elapsed = p.millis() - doorSceneStartTime;
      if (elapsed >= 5000) {
        if (isHovering(doorX, doorY, doorWidth, doorHeight)) {
          scene = 1; 
          p.cursor(p.ARROW);
        }
      }
    } 
    else if (scene == 1) {
      if (isHovering(roomDoorX, roomDoorY, roomDoorW, roomDoorH)) {
        scene = 0; doorSceneStartTime = p.millis(); p.cursor(p.ARROW);
      }
      else if (isHovering(deskX, deskY, deskW, deskH)) { scene = 2; p.cursor(p.ARROW); } 
      else if (isHovering(bedX, bedY, bedW, bedH)) { scene = 3; p.cursor(p.ARROW); } 
      else if (isHovering(windowX, windowY, windowW, windowH)) { scene = 4; p.cursor(p.ARROW); } 
      else if (isHovering(closetX, closetY, closetW, closetH)) { scene = 5; currentShirt = 0; currentPants = 0; p.cursor(p.ARROW); } 
      else if (isHovering(poster1X, poster1Y, poster1W, poster1H)) { scene = 6; p.cursor(p.ARROW); } 
      else if (isHovering(poster2X, poster2Y, poster2W, poster2H)) { scene = 7; p.cursor(p.ARROW); } 
      else if (isHovering(avatarX, avatarY, avatarW, avatarH)) { scene = 8; resetAvatarGame(); p.cursor(p.ARROW); } 
      else if (isHovering(underwearX, underwearY, underwearW, underwearH)) {
        scene = 9;
        setTimeout(() => { scene = 1; }, 2000); 
      }
    }
    else if (scene == 2) {
      if (backClicked) { scene = 1; p.cursor(p.ARROW); } 
      else {
        let scaleFactor = 600 / 800; 
        let xOffset = 100;
        let yOffset = 0;
        for (let item of deskObjects) {
          let hx = (item.x * scaleFactor) + xOffset;
          let hy = (item.y * scaleFactor) + yOffset;
          let hw = item.w * scaleFactor;
          let hh = item.h * scaleFactor;
          if (isHovering(hx, hy, hw, hh)) {
            activeDescription = item.description; 
            descriptionBubbleX = (item.dotX * scaleFactor) + xOffset + 15; 
            descriptionBubbleY = (item.dotY * scaleFactor) + yOffset;
            break; 
          }
        }
      }
    }
    else if (scene == 3) {
      if (backClicked) { scene = 1; p.cursor(p.ARROW); } 
    }
    else if (scene == 5) {
      if (backClicked) { scene = 1; p.cursor(p.ARROW); } 
      else {
        for (let btn of uiButtons) {
          if (isHovering(btn.x, btn.y, btn.w, btn.h)) {
            if (btn.type === "shirt") currentShirt = (currentShirt === btn.id) ? 0 : btn.id;
            if (btn.type === "pants") currentPants = (currentPants === btn.id) ? 0 : btn.id;
            return; 
          }
        }
      }
    }
    else if (scene == 8) {
      if (backClicked) { scene = 1; p.cursor(p.ARROW); } 
      else if (!gameIsOver) { 
        for (let item of truthsGameStatements) {
          if (isHovering(item.x, item.y, item.w, item.h)) {
            gameIsOver = true; 
            item.state = item.isLie ? 'correct' : 'incorrect';
            break; 
          }
        }
      }
    }
    else if (scene == 4 || scene == 6 || scene == 7) { 
      if (backClicked) { scene = 1; p.cursor(p.ARROW); }
    }
  };
};

// Launch the sketch
new p5(autobiographicalGame);
