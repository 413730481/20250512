let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const innerPoints = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 78];

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

    for (let i = 0; i < points.length - 1; i++) {
      const indexA = points[i];
      const indexB = points[i + 1];
      const [xA, yA] = keypoints[indexA];
      const [xB, yB] = keypoints[indexB];
      line(xA, yA, xB, yB); // 繪製兩點之間的線
    }

    // 將最後一點與第一點連接，形成閉合圖形
    const [xStart, yStart] = keypoints[points[0]];
    const [xEnd, yEnd] = keypoints[points[points.length - 1]];
    line(xEnd, yEnd, xStart, yStart);

    // 繪製嘴巴的內部輪廓
    for (let i = 0; i < innerPoints.length - 1; i++) {
      const indexA = innerPoints[i];
      const indexB = innerPoints[i + 1];
      if (keypoints[indexA] && keypoints[indexB]) {
        const [xA, yA] = keypoints[indexA];
        const [xB, yB] = keypoints[indexB];
        line(xA, yA, xB, yB);
      }
    }
  }
}
