function Grid(difficulty) {
  this.difficulty = difficulty || "easy";
  this.cellCount = {
    "easy": 100,
    "medium": 300,
    "hard": 1000
  };
  this.mineCount = {
    "easy": 0.1 * 100,
    "medium": 0.2 * 300,
    "hard": 0.3 * 1000
  };

  this.minBorder = 10;
  this.maxCellSize = 50;
  this.widthCount = 10;
  this.heightCount = 10;

  this.borderLeft = (windowWidth - (this.maxCellSize * this.widthCount)) / 2;
  this.borderTop = (windowHeight - (this.maxCellSize * this.heightCount)) / 2;

  this.generateRandomNumbers = function(count, a, b) {
    var res = [];
    if (count > (b - a)) return [];
    while (res.length < count) {
      var r = floor(random(a, b));
      if (res.indexOf(r) == -1) res.push(r);
    }
    return res;
  }

  var calcNeighborCount = function(matrix) {
    var getVal = function(y, x) {
      if (y < 0 || y >= matrix.length ||
          x < 0 || x >= matrix[0].length) {
        return false;
      } else {
        return matrix[y][x];
      }
    }
    var sumVals = function(y, x) {
      var sum = 0;
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          if (dx == 0 && dy == 0) continue;
          if (getVal(y + dy, x + dx)) sum++;
        }
      }
      return sum;
    }
    var res = [];
    for (var i = 0; i < matrix.length; i++) {
      var line = [];
      for (var j = 0; j < matrix[i].length; j++) {
        line.push(sumVals(i, j));
      }
      res.push(line);
    }
    return res;
  }


  this.mineMatrix = [];
  this.mineIndexes = this.generateRandomNumbers(
    this.mineCount[this.difficulty],
    0,
    this.cellCount[this.difficulty]
  );

  for (var y = 0; y < this.heightCount; y++) {
    var row = [];
    for (var x = 0; x < this.widthCount; x++) {
      var pos = (y * this.widthCount) + x;
      if (this.mineIndexes.indexOf(pos) != -1) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
    this.mineMatrix.push(row);
  }

  this.neighborCount = calcNeighborCount(this.mineMatrix);

  this.matrix = [];

  for (var y = 0; y < this.heightCount; y++) {
    var row = [];
    for (var x = 0; x < this.widthCount; x++) {
      row.push(new Cell(
        y,
        x,
        this.mineMatrix[y][x],
        this.neighborCount[y][x]
      ));
    }
    this.matrix.push(row);
  }


  this.draw = function() {
    var gridX = Math.floor((mouseX - this.borderLeft) / this.maxCellSize);
    var gridY = Math.floor((mouseY - this.borderTop) / this.maxCellSize);
    for (var y = 0; y < this.matrix.length; y++) {
      for (var x = 0; x < this.matrix[y].length; x++) {
        var hover = false;
        if (x == gridX && y == gridY) {
          hover = true;
          if (mouseIsPressed) {
            this.matrix[y][x].hidden = false;
          }
        }
        this.matrix[y][x].hover = hover;
        this.matrix[y][x].draw(
          this.borderLeft + (x * this.maxCellSize),
          this.borderTop + (y * this.maxCellSize),
          this.maxCellSize
        );
      }
    }
  }
}
