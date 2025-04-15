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

// Diese Funktion erzeugt mehrere aufsteigende Bilder
function showFloatingImages(imageType) {
  // Erzeuge 5 Bilder mit Zeitabstand
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFloatingImage(imageType);
    }, i * 400);
  }
}

// Diese Funktion erzeugt ein einzelnes, animiertes Bild
function createFloatingImage(imageType) {
  // Erstelle ein neues Bild-Element
  const img = document.createElement('img');
  img.src = `assets/images/${imageType}.png`;
  img.classList.add(`${imageType}-floating-img`);
  
  // Stil für das fliegende Bild - setze z-index niedrig, aber ändere nichts am Video
  img.style.position = 'absolute';
  img.style.width = '50px';
  img.style.height = 'auto';
  img.style.zIndex = '1'; // Niedrig, sodass es hinter dem Video erscheint
  
  // Zufällige horizontale Position
  const randomX = Math.floor(Math.random() * (window.innerWidth - 50));
  
  // Start unterhalb des sichtbaren Bereichs
  img.style.left = `${randomX}px`;
  img.style.bottom = '-50px';
  
  // Füge das Bild zum Body hinzu, NICHT zu einem Canvas oder Video-Container
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
  
  // Nach einer bestimmten Zeit das Bild entfernen
  setTimeout(() => {
    if (img.parentNode) {
      img.remove();
    }
  }, 8000);
}

// Führe dies nach dem Laden der Seite aus
document.addEventListener('DOMContentLoaded', () => {
  // Setze den z-index des Videoelements höher
  const videoElements = document.querySelectorAll('video, canvas, .webcam-container');
  videoElements.forEach(el => {
    el.style.position = 'relative'; // Notwendig für z-index
    el.style.zIndex = '10';
  });
});




