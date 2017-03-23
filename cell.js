function Cell(_y, _x, _isMine, _neighborCount) {
  this.y = _y;
  this.x = _x;
  this.isMine = _isMine;
  this.value = (_isMine) ? "*" : _neighborCount;
  this.hidden = true;
  this.hover = false;

  this.draw = function(xPos, yPos, size) {
    stroke(255);
    noFill();
    rect(xPos, yPos, size, size);
    if (this.hidden) {
      if (this.hover == true) {
        fill(125);
        rect(xPos, yPos, size, size);
      }
    } else {
      fill(255);
      textSize(size - 10);
      textAlign(CENTER, CENTER);
      text(this.value, xPos + (0.5 * size), yPos + (0.5 * size));
    }
  }
}
