let faceapi;
let video;
let detections;

// by default all options are set to true
const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

function setup() {
  var canvas = createCanvas(820, 620);
  canvas.parent('sketch-holder');
  
  
  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element, and just show the canvas
  faceapi = ml5.faceApi(video, detectionOptions, modelReady);
  textAlign(RIGHT);
}

function modelReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(230);
  // image(video, 0, 0, width, height);
  if (detections) {
    if (detections.length > 0) {
      // console.log(detections)
      //drawBox(detections);
      drawLandmarks(detections); // add draw score after this
      drawScore(detections);
    }
  }
  faceapi.detect(gotResults);
}

const scorePeople = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function drawScore(detections) {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255,255,52);
    noStroke(0.9);
    for (let i = 0; i < detections.length; i += 1) {
    const mouth = detections[i].parts.mouth;
    var distAC=dist(mouth[0]._x,mouth[0]._y,mouth[6]._x,mouth[6]._y);
    var distBD=dist(mouth[3]._x,mouth[3]._y,mouth[9]._x,mouth[9]._y);
    var laughValue=round(distBD/distAC,1);

    if(laughValue>0.4){scorePeople[i]=scorePeople[i]+1;}
    text(scorePeople[i], mouth[3]._x,20);
    text("P "+i, mouth[3]._x,80);
  }
}


function drawBox(detections) {
  for (let i = 0; i < detections.length; i += 1) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x;
    const y = alignedRect._box._y;
    const boxWidth = alignedRect._box._width;
    const boxHeight = alignedRect._box._height;

    noFill();
    stroke(161, 95, 251);
    strokeWeight(1);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  for (let i = 0; i < detections.length; i += 1) {
    const mouth = detections[i].parts.mouth;

    //var howMany=detections.length;
    //console.log(detections.length);

    drawPart(mouth, true);
  }
}

 // add sscore after this array is created for 10 people (you detect the number of people you take the constant mouse, and distant. part of the mouth. Text is score E point of the mouth 30 pixle form top of score add background if required 0.4)
function drawBox(detections) {
  for (let i = 0; i < detections.length; i += 1) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x;
    const y = alignedRect._box._y;
    const boxWidth = alignedRect._box._width;
    const boxHeight = alignedRect._box._height;

    noFill();
    stroke(255, 255, 51);
    strokeWeight(1);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke(255, 255, 51);
  strokeWeight(0.9);

  for (let i = 0; i < detections.length; i += 1) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    drawPart(mouth, true);
   // drawPart(nose, false);
   // drawPart(leftEye, true);
   // drawPart(leftEyeBrow, false);
   // drawPart(rightEye, true);
   // drawPart(rightEyeBrow, false);
  }
}

function drawPart(feature, closed) {
  beginShape();
  for (let i = 0; i < feature.length; i += 1) {
    const x = feature[i]._x;
    const y = feature[i]._y;
    vertex(x, y);
    fill(0,255,0);
    ellipse(feature[0]._x,feature[0]._y,10,10);
    fill(0,0,255);
    ellipse(feature[3]._x,feature[3]._y,10,10);
    fill(255,0,0);
    ellipse(feature[6]._x,feature[6]._y,10,10);
    fill(255,255,0);
    ellipse(feature[9]._x,feature[9]._y,10,10);

    var distAC=dist(feature[0]._x,feature[0]._y,feature[6]._x,feature[6]._y);
    var distBD=dist(feature[3]._x,feature[3]._y,feature[9]._x,feature[9]._y);
    
    fill(255,255,52);
    noStroke();
    textSize(25);
    textAlign(CENTER, CENTER);
    //text(int(distAC/distBD), feature[3]._x,feature[3]._y-20);
    var laughValue=round(distBD/distAC,1);
    var laughValuePlot=map(laughValue,0,2,540,300);
    text(laughValue, feature[3]._x,feature[3]._y-20);

    stroke(1);
    line(feature[0]._x,feature[0]._y,feature[6]._x,feature[6]._y);
    line(feature[3]._x,feature[3]._y,feature[9]._x,feature[9]._y);

//     //Winner
//     // line(feature[3]._x,540,feature[3]._x,laughValuePlot);
// text  ("winner", feature[3]._x,feature[3]._y-150,); 

    fill(0,255,255,52);
    //noStroke();
  }

  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }
}
