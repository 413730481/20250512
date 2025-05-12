let facemesh;
let video;
let predictions = [];
// 嘴巴的外部輪廓索引
const outerLips = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 61];
const innerLips = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 78];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  stroke(255, 0, 0); // 紅色
  strokeWeight(5); // 線條粗細為5

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 繪製外嘴唇
    drawLips(outerLips, keypoints);

    // 繪製內嘴唇
    drawLips(innerLips, keypoints);
  }
}

function drawLips(points, keypoints) {
  for (let i = 0; i < points.length - 1; i++) {
    const indexA = points[i];
    const indexB = points[i + 1];
    if (keypoints[indexA] && keypoints[indexB]) {
      const [xA, yA] = keypoints[indexA];
      const [xB, yB] = keypoints[indexB];
      line(xA, yA, xB, yB);
    }
  }
}
