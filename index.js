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
	const canvas = createCanvas(320, 260);

	canvas.parent('sketch')
	// Create the video
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();

	// Start classifying
	classifyVideo();
}

function draw() {
	background(255);
	// Draw the video
	image(video, 0, 0);

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


		showFloatingImages(label.toLowerCase());

	
	/*
	// Wenn Herz erkannt – zeige das Bild
	if (label.toLowerCase() === "heart") {
		showFloatingImages('heart');

	}

	// Wenn Dreieck erkannt – zeige das Bild
	if (label.toLowerCase() === "triangle") {
		showFloatingImages('triangle');

	}

	// Wenn peace erkannt – zeige das Bild
	if (label.toLowerCase() === "peace") {
		showFloatingImages('peace');

	}

	// Wenn rock erkannt – zeige das Bild
	if (label.toLowerCase() === "rock") {
		showFloatingImages('rock');

	}

	// Wenn stop erkannt – zeige das Bild
	if (label.toLowerCase() === "stop") {
		showFloatingImages('stop');

	}

	// Wenn telephone erkannt – zeige das Bild
	if (label.toLowerCase() === "telephone") {
		showFloatingImages('telephone');
	}

	*/
	
	// Classifiy again!
	classifyVideo();
}




// Diese Funktion erzeugt viele kleine, aufsteigende Bilder
function showFloatingImages(imageType) {
  // Erzeuge weniger Bilder - von 15 auf 5 reduziert
  for (let i = 0; i < 1; i++) {
    setTimeout(() => {
      createFloatingImage(imageType);
    }, i * 600); // Erzeuge alle 400ms ein neues Bild
  }
}

// Diese Funktion erzeugt ein einzelnes, animiertes Bild
function createFloatingImage(imageType) {
  // Erstelle ein neues Bild-Element
  const img = document.createElement('img');
  img.src = `assets/images/${imageType}.png`;
  img.classList.add(`${imageType}-floating-img`);
  
  // Stil für das fliegende Bild
  img.style.position = 'absolute';
  img.style.width = '50px'; // Kleinere Größe
  img.style.height = 'auto';
  
  // Zufällige horizontale Position
  const randomX = Math.floor(Math.random() * (window.innerWidth - 50));
  
  // Start unterhalb des sichtbaren Bereichs
  img.style.left = `${randomX}px`;
  img.style.bottom = '-50px'; // Starte unterhalb des Bildschirms
  
  // Füge das Bild zum Body hinzu
  document.body.appendChild(img);
  
  // Animation: Bewege das Bild nach oben
  let position = -50;
  const speed = 2 + Math.random() * 3; // Zufällige Geschwindigkeit
  
  const moveUp = () => {
    position += speed;
    img.style.bottom = `${position}px`;
    
    // Wenn das Bild den oberen Rand erreicht hat, entferne es
    if (position > window.innerHeight) {
      img.remove();
      return;
    }
    
    requestAnimationFrame(moveUp);
  };
  
  moveUp();
  
  // Nach einer bestimmten Zeit das Bild entfernen (falls nötig)
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




