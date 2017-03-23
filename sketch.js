var grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new Grid();
}

function draw() {
  background(51);
  grid.draw();

  text(touches.join(","), width / 2, height - 90);
  text(Math.floor(mouseX / 50) + ", " + Math.floor(mouseY / 50), width / 2, height - 60);
  text(mouseX + ", " + mouseY, width / 2, height - 30);
}
