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

	// Wenn Kreis erkannt – zeige das Bild
	if (label.toLowerCase() === "circle") {
		showCircleImage();
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
		showStopImage();
	}

	
	// Classifiy again!
	classifyVideo();
}

function showHeartImage() {
	// Prüfen ob schon ein Herz angezeigt wird
	if (document.querySelector(".heart-img")) return;
  
	const img = document.createElement("img");
	img.src = "assets/images/herz.png"; // Pfad zum Bild
	img.classList.add("heart-img");
	document.body.appendChild(img);
  
	// Nach 3 Sekunden wieder entfernen
	setTimeout(() => {
	  img.remove();
	}, 3000);
  }

  function showCircleImage() {
	// Prüfen ob schon ein Kreis angezeigt wird
	if (document.querySelector(".circle-img")) return;
  
	const img = document.createElement("img");
	img.src = "assets/images/kreis.png"; // Pfad zum Bild
	img.classList.add("circle-img");
	document.body.appendChild(img);
  
	// Nach 3 Sekunden wieder entfernen
	setTimeout(() => {
	  img.remove();
	}, 3000);
  }

  function showTriangleImage() {
	// Prüfen ob schon ein Dreieck angezeigt wird
	if (document.querySelector(".triangle-img")) return;
  
	const img = document.createElement("img");
	img.src = "assets/images/dreieck.png"; // Pfad zum Bild
	img.classList.add("triangle-img");
	document.body.appendChild(img);
  
	// Nach 3 Sekunden wieder entfernen
	setTimeout(() => {
	  img.remove();
	}, 3000);
  }

  function showPeaceImage() {
	// Prüfen ob schon ein Peace angezeigt wird
	if (document.querySelector(".peace-img")) return;
  
	const img = document.createElement("img");
	img.src = "assets/images/peace.png"; // Pfad zum Bild
	img.classList.add("peace-img");
	document.body.appendChild(img);
  
	// Nach 3 Sekunden wieder entfernen
	setTimeout(() => {
	  img.remove();
	}, 3000);
  }

  function showRockImage() {
	// Prüfen ob schon ein rock angezeigt wird
	if (document.querySelector(".rock-img")) return;
  
	const img = document.createElement("img");
	img.src = "assets/images/rock.png"; // Pfad zum Bild
	img.classList.add("rock-img");
	document.body.appendChild(img);
  
	// Nach 3 Sekunden wieder entfernen
	setTimeout(() => {
	  img.remove();
	}, 3000);
  }

  function showStopImage() {
	// Prüfen ob schon ein stop angezeigt wird
	if (document.querySelector(".stop-img")) return;
  
	const img = document.createElement("img");
	img.src = "assets/images/stop.png"; // Pfad zum Bild
	img.classList.add("stop-img");
	document.body.appendChild(img);
  
	// Nach 3 Sekunden wieder entfernen
	setTimeout(() => {
	  img.remove();
	}, 3000);
  }

  function showTelephoneImage() {
	// Prüfen ob schon ein telephone angezeigt wird
	if (document.querySelector(".telephone-img")) return;
  
	const img = document.createElement("img");
	img.src = "assets/images/telefon.png"; // Pfad zum Bild
	img.classList.add("telephone-img");
	document.body.appendChild(img);
  
	// Nach 3 Sekunden wieder entfernen
	setTimeout(() => {
	  img.remove();
	}, 3000);
  }

