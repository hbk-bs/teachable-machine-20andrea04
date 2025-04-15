// Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/03WF9IoBs/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	console.log(classifier);
}

function setup() {
	createCanvas(320, 260);
	// Create the video
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();

	// Start classifying
	classifyVideo();
}

function draw() {
	background(0);
	// Draw the video
	image(video, 0, 0);

	// Draw the label
	fill(255);
	textSize(16);
	textAlign(CENTER);
	text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
	console.log(results);
	// The results are in an array ordered by confidence.
	// console.log(results[0]);
	label = results[0].label;

	// Wenn Herz erkannt – zeige das Bild
	if (label.toLowerCase() === "heart") {
		showHeartImage();
	}

	// Wenn Dreieck erkannt – zeige das Bild
	if (label.toLowerCase() === "triangle") {
		showTriangleImage();
	}

	// Wenn peace erkannt – zeige das Bild
	if (label.toLowerCase() === "peace") {
		showPeaceImage();
	}

	// Wenn rock erkannt – zeige das Bild
	if (label.toLowerCase() === "rock") {
		showRockImage();
	}

	// Wenn stop erkannt – zeige das Bild
	if (label.toLowerCase() === "stop") {
		showStopImage();
	}

	// Wenn telephone erkannt – zeige das Bild
	if (label.toLowerCase() === "telephone") {
		showTelephoneImage();
	}

	
	// Classifiy again!
	classifyVideo();
}

function showHeartImage() {
  // Statt eines großen Bildes in der Mitte
  // Erzeuge viele kleine Bilder, die nach oben schweben
  showFloatingImages('heart');
}

function showTriangleImage() {
  showFloatingImages('triangle');
}

function showPeaceImage() {
  showFloatingImages('peace');
}

function showRockImage() {
  showFloatingImages('rock');
}

function showStopImage() {
  showFloatingImages('stop');
}

function showTelephoneImage() {
  showFloatingImages('telephone');
}

// Diese Funktion erzeugt viele kleine, aufsteigende Bilder
function showFloatingImages(imageType) {
  // Erzeuge mehrere Bilder über Zeit verteilt
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFloatingImage(imageType);
    }, i * 400); // Erzeuge alle 200ms ein neues Bild
  }
}

// Diese Funktion erzeugt ein einzelnes, animiertes Bild
function createFloatingImage(imageType) {
  // Erstelle ein neues Bild-Element
  const img = document.createElement('img');
  img.src = `assets/images/${imageType}.png`;
  img.classList.add(`${imageType}-floating-img`);
  
  // Stil für das fliegende Bild - niedrigerer z-index
  img.style.position = 'absolute';
  img.style.width = '50px';
  img.style.height = 'auto';
  img.style.zIndex = '1'; // Niedriger z-index, damit es hinter dem Video erscheint
  
  // Platzierung der Bilder außerhalb des Kamerabereichs
  // Annahme: Die Kamera ist in der Mitte des Bildschirms
  const videoElement = document.getElementById('video'); // Ersetze 'video' mit der ID deines Video-Elements
  
  // Bestimme die Position und Dimensionen des Video-Elements
  let videoRect = null;
  try {
    videoRect = videoElement ? videoElement.getBoundingClientRect() : null;
  } catch (e) {
    // Fallback, wenn wir das Video nicht finden können
    videoRect = {
      left: window.innerWidth / 2 - 160,  // Angenommene Video-Breite: 320px
      top: window.innerHeight / 2 - 120,  // Angenommene Video-Höhe: 240px
      width: 320,
      height: 240
    };
  }
  
  // Wähle zufällig links oder rechts vom Video
  let randomX;
  if (Math.random() > 0.5) {
    // Links vom Video
    randomX = Math.floor(Math.random() * (videoRect.left - 50));
  } else {
    // Rechts vom Video
    randomX = Math.floor(Math.random() * (window.innerWidth - videoRect.left - videoRect.width - 50)) + 
              videoRect.left + videoRect.width;
  }
  
  // Start unterhalb des sichtbaren Bereichs
  img.style.left = `${randomX}px`;
  img.style.bottom = '-50px';
  
  // Füge das Bild zum Body hinzu
  document.body.appendChild(img);
  
  // Animation: Bewege das Bild nach oben
  let position = -50;
  const speed = 2 + Math.random() * 3;
  
  const moveUp = () => {
    position += speed;
    img.style.bottom = `${position}px`;
    
    // Wenn das Bild den oberen Rand erreicht hat, entferne es
    if (position > window.innerHeight + 50) {
      img.remove();
      return;
    }
    
    requestAnimationFrame(moveUp);
  };
  
  moveUp();
  
  // Sicherheitsmaßnahme
  setTimeout(() => {
    if (img.parentNode) {
      img.remove();
    }
  }, 8000);
}

// Füge dies zu deinem bestehenden Code hinzu oder in deine CSS-Datei
document.getElementById('video').style.zIndex = '10'; // Ersetze 'video' mit der ID deines Video-Elements




