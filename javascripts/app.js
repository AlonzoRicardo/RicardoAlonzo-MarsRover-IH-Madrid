// Rover Object Goes Here
// ======================

var rover2 = {
  icon: "R2",
  direction : "N",
  x : 4,
  y : 4,
  travellog: []
};

var rover1 = {
  icon: "R1",
  direction : "N",
  x : 0,
  y : 0,
  travellog: []
};

var grid = [                    /*N*/
      ["R1", null, "O", null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "O", null, null, null],
      [null, "O", null, null, null, null, null, null, null, null],
      [null, null, null, null, "O", null, null, null, null, null],
/*W*/ [null, null, null, null, "R2", null, "O", null, null, null],/*E*/
      [null, null, null, null, null, null, null, null, null, "O"],
      [null, null, "O", null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "O", null, null, null],
      ["O", null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, "O"],
];                              /*S*/

var obstacles = [];
var canProcede = true;
var turn = 2;
var robot;
var obstacleName = "";



// ======================

function turnLeft(robot){
  console.log("turnLeft was called!");
  if (robot.direction === "N"){
    robot.direction = "W";
    console.log("Robot is now facing West");
  } else if (robot.direction === "W"){
    robot.direction = "S";
    console.log("robot is now facing South");
  } else if (robot.direction === "S"){
    robot.direction = "E";
    console.log("robot is now facing East");
  } else if (robot.direction === "E"){
    robot.direction = "N";
    console.log("robot is now facing North");
  }
}


function turnRight(robot){
  console.log("turnRight was called!");
  if (robot.direction === "N"){
    robot.direction = "E";
    console.log("robot is now facing East");
  } else if (robot.direction === "E"){
    robot.direction = "S";
    console.log("robot is now facing South");
  } else if (robot.direction === "S"){
    robot.direction = "W";
    console.log("robot is now facing West");
  } else if (robot.direction === "W"){
    robot.direction = "N";
    console.log("robot is now facing North");
  }
}

function moveForward(robot){
  console.log("moveForward was called")
  updateObstacles(robot);
  checkForObstaclesforward(robot);
  grid[robot.x][robot.y] = null;
  if (robot.direction === "N"){
    if (robot.x <= 0) {
      robot.x = 0;
      console.log("I CANT GO ANY FURTHER");
    } else if (canProcede){
    robot.travellog.push("Y: "+ robot.y);
    robot.x--;
    console.log("Rover 1 step North");}
  } else if (robot.direction === "E"){
      if (robot.y >= 9) {
      robot.y = 9;
      console.log("I CANT GO ANY FURTHER");
    } else if(canProcede){
    robot.travellog.push("X: "+ robot.x);
    robot.y++;
    console.log("Rover 1 step East");}
  } else if (robot.direction === "S"){
    if (robot.x >= 9) {
      robot.x = 9;
      console.log("I CANT GO ANY FURTHER");
    } else if(canProcede) {
    robot.travellog.push("Y: "+ robot.y);
    robot.x++;
    console.log("Rover 1 step South");}
  } else if (robot.direction === "W"){
    if (robot.y <= 0) {
      robot.y = 0;
      console.log("I CANT GO ANY FURTHER");
    } else if(canProcede) {
    robot.travellog.push("X: "+ robot.x);
    robot.y += -1;
    console.log("Rover 1 step West");}
  }
  canProcede = true;
  grid[robot.x][robot.y] = robot.icon;
  updateHtmlGrid ();
}

function moveBackwards(robot){
  console.log("moveBackwards was called")
  updateObstacles(robot);
  checkForObstaclesBackwards(robot);
  grid[robot.x][robot.y] = null;
  if (robot.direction === "N"){
    if (robot.x >= 9) {
      robot.x = 9;
      console.log("I CANT GO ANY FURTHER");
    } else if (canProcede){
    robot.travellog.push("Y: "+ robot.y);
    robot.x++;
    console.log("Rover 1 step backwards to south");}
  } else if (robot.direction === "E"){
      if (robot.y <= 0) {
      robot.y = 0;
      console.log("I CANT GO ANY FURTHER");
    } else if (canProcede){
    robot.travellog.push("X: "+ robot.x);
    robot.y--;
    console.log("Rover 1 step backwards to west");}
  } else if (robot.direction === "S"){
    if (robot.x <= 0) {
      robot.x = 0;
      console.log("I CANT GO ANY FURTHER");
    } else if (canProcede){
    robot.travellog.push("Y: "+ robot.y);
    robot.x--;
    console.log("Rover 1 step backwards to north");}
  } else if (robot.direction === "W"){
    if (robot.y >= 9) {
      robot.y = 9;
      console.log("I CANT GO ANY FURTHER");
    } else if (canProcede){
    robot.travellog.push("X: "+ robot.x);
    robot.y++;
    console.log("Rover 1 step backwards to East");}
  }
  canProcede = true;
  grid[robot.x][robot.y] = robot.icon;
  updateHtmlGrid ();

}

function checkForObstaclesBackwards(robot){
  for (var i=0; i < obstacles.length; i++){

      if (robot.direction === "N" && [(robot.x+1) +", "+robot.y].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x+1][robot.y]);
        canProcede = false;
    }

  else if (robot.direction === "E" && [robot.x +", "+(robot.y-1)].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x][robot.y-1]);
        canProcede = false;
    }

  else if (robot.direction === "S" && [(robot.x-1) +", "+robot.y].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x-1][robot.y]);
        canProcede = false;
    }
  else if (robot.direction === "W" && [robot.x +", "+(robot.y+1)].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x][robot.y+1]);
        canProcede = false;
      }
  }
}

function checkForObstaclesforward(robot){
  for (var i=0; i < obstacles.length; i++){

      if (robot.direction === "N" && [(robot.x-1) +", "+robot.y].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x-1][robot.y]);
        canProcede = false;
    }

  else if (robot.direction === "E" && [robot.x +", "+(robot.y+1)].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x][robot.y+1]);
        canProcede = false;
    }

  else if (robot.direction === "S" && [(robot.x+1) +", "+robot.y].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x+1][robot.y]);
        canProcede = false;
    }
  else if (robot.direction === "W" && [robot.x +", "+(robot.y-1)].toString() == obstacles[i].toString()){
        console.log("FOUND AND OBSTACLE... OBSTACLE ID: " + grid[robot.x][robot.y-1]);
        canProcede = false;
      }
  }
}

function updateObstacles (){
  obstacles = [];
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    for (var j = 0; j < row.length; j++) {
      var column = row[j];
      if (column === "O" || column === "R2" || column === "R1"){
        obstacles.push([i + ", " + j]);
      }
    }
  }
}

function checkTurn(){
  if (turn % 2 === 0) {
    robot = rover1;
    turn++;
    console.log("Rover1 in action");
  } else {
    robot = rover2;
    turn++;
    console.log("Rover2 in action");
  }
}

function commands(string){
  checkTurn();
  for (var i = 0; i < string.length; i++) {
    switch(string[i]) {

      case 'f':
      moveForward(robot);
      break;

      case 'r':
      turnRight(robot);
      break;

      case 'l':
      turnLeft(robot);
      break;

      case 'b':
      moveBackwards(robot);
      break;
    }
  }
}

function updateHtmlGrid () {
  removeElementsByClass()
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    for (var j = 0; j < row.length; j++) {
      var column = row[j];
      var div = document.createElement('div');
      div.className = 'cellblock';
      div.textContent = grid[i][j];

      document.getElementById('container').appendChild(div);
    }
  }
}

function removeElementsByClass(){
    var elements = document.getElementsByClassName('cellblock');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

updateObstacles();
setTimeout(function() {updateHtmlGrid(); });
