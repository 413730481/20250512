let facemesh;
let video;
let predictions = [];
// 嘴巴的外部輪廓索引
const outerLips = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 61];
const innerLips = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 78];
// 左眼索引
const leftEye1 = [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112];
const leftEye2 = [133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155];
// 右眼索引
const rightEye1 = [359, 467, 260, 259, 257, 258, 286, 444, 463, 341, 256, 252, 253, 254, 339, 255];
const rightEye2 = [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];

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

    // 繪製左眼
    drawLips(leftEye1, keypoints);
    drawLips(leftEye2, keypoints);

    // 繪製右眼
    drawLips(rightEye1, keypoints);
    drawLips(rightEye2, keypoints);
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
