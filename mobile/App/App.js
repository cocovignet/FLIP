var App = function(connection) {

  this.connection = connection;
  this.Engine = Matter.Engine;
  this.Render = Matter.Render;
  this.World = Matter.World;
  this.Bodies = Matter.Bodies;
  this.Body = Matter.Body;
  this.Composite = Matter.Composite;
  this.Constraint = Matter.Constraint;

  this.engine;

  this.ballSize = 10;
  this.ballCreateX = 0;
  this.ballCreateY = 0;
  this.ballRender = { render: { sprite: { texture: 'img2/blanc123.png'} } };
  this.ballObject = this.Bodies.circle(this.ballCreateX,   this.ballCreateY, this.ballCreateY, this.ballRender);

  this.worldSize = 500;
  this.worldWidth = window.innerWidth;
  this.worldHeight = window.innerHeight;
  this.platformWidth = platformWidth;

  this.canvas = document.getElementById("canvas");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.context = this.canvas.getContext("2d");

  this.player;
  this.walls = [];

  this.platforms = [];
  this.orientation = {"alpha" : 0, "beta": 0, "gamma" : 0};

  this.cursorX = 0;
  this.cursorY = 0;

  this.orientationAngle = 0;

  this.worldWidthForPlatforms = this.worldWidth/12;

  this.worldHeightForPlatforms = this.worldHeigth/12;

  this.Xclicked = [];
  this.Yclicked = [];
  this.clicked = 0;




  this.init();
}

App.prototype = {

  addTruc: function() {
    console.log("add truc");
    this.World.add(this.engine.world, this.Bodies.rectangle(this.cursorX, this.cursorY , 20, 20, { isStatic: true }));
  },

  init:function() {

    // create an engine
    this.engine = this.Engine.create();
    this.engine.world.gravity["y"] = 0.8;

    // PLAYER CREATION
    this.player = this.Bodies.circle(this.worldWidth/2, 100, this.ballSize, {restitution : 0.9, friction : 0}, 50);
    //MAKING SURE PLAYER DOESNT FALL OUT

    this.walls[0] = this.Bodies.rectangle(0, this.worldHeight/2, 20, this.worldHeight, { isStatic: true }),
    this.walls[1] = this.Bodies.rectangle(this.worldWidth/2, this.worldHeight,  this.worldWidth, 20, { isStatic: true }),
    this.walls[2] = this.Bodies.rectangle(this.worldWidth, this.worldHeight/2, 20, this.worldHeight, { isStatic: true }),
    this.walls[3] = this.Bodies.rectangle(this.worldWidth/2, 0, this.worldWidth, 20, { isStatic: true }),
    this.walls[4] = this.Bodies.rectangle(this.worldWidth/2, this.worldHeight/2, 50, 50, { isStatic: true });

if ( this. clicked >= 20)
for (var i = 0 ; i <= this.clicked.length ; i++){

  this.platforms[i] = this.Bodies.rectangle( this.Xclicked[i]*this.worldHeight/100 , this.Yclicked[i]*this.worldWidth/100 , 100, 10, { isStatic: true });
  this.World.add(this.engine.world, this.platforms[i]);


}
    // this.platforms[0] = this.Bodies.rectangle(this.worldWidthForPlateform*1 , this.worldHeightForPlateform*1 , 10,10 { isStatic: true }),
    // this.platforms[1] = this.Bodies.rectangle(this.worldWidthForPlateform*2, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[2] = this.Bodies.rectangle(this.worldWidthForPlateform*3, this.worldHeight/12, 60, 10, { isStatic: true }),
    // this.platforms[3] = this.Bodies.rectangle(this.worldWidthForPlateform*4, this.worldHeight/12, 60, 10, { isStatic: true }),
    // this.platforms[4] = this.Bodies.rectangle(this.worldWidthForPlateform*5, this.worldHeight/2, 60, 10, { isStatic: true }),
    // this.platforms[5] = this.Bodies.rectangle(this.worldWidthForPlateform*6, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[6] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[7] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[8] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[9] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[10] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[11] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[12] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),
    // this.platforms[13] = this.Bodies.rectangle(this.worldWidthForPlateform /1, this.worldHeight/4, 60, 10, { isStatic: true }),




    console.log("world "+this.worldHeight);
    console.log("walls "+this.walls.length);
    console.log("canvas "+this.canvas.height);

    this.World.add(this.engine.world, [this.walls[0], this.walls[1], this.walls[2], this.walls[3], this.walls[4],/* this.platforms[0], this.platforms[1], this.platforms[2], this.platforms[3], this.platforms[4], this.platforms[5],*/ this.player]);
// bouncing ball "restitution"
    this.player.restitution = 0.8;
    this.Engine.run(this.engine);
    this.draw();
  },

  draw:function() {

    // this.engine.world.gravity["x"] = Math.sin(2* Math.PI * this.orientation.beta/360);
    // this.engine.world.gravity["y"] = Math.cos(2* Math.PI * this.orientation.beta/360);

    //this.Body.rotate(this.walls[4],Math.PI*2/100);
    //this.Body.rotate(this.walls[4],this.orientation.beta);

    //this.World.add(this.engine.world, [this.player, this.walls[0], this.walls[1], this.walls[2], this.walls[3], this.walls[4]]);
    //for (var i = 0; i <= this.platforms.length; i++){
      //this.Body.rotate(this.platforms[1],Math.PI*2/100);


      //Math.floor(val.map(0,127,0,1));
      this.orientationAngle = this.orientation.beta.map(-180,180,0,Math.PI);
      //this.orientation.beta = this.orientation.beta.map(-180,180,0,Math.PI);
      //this.Body.setAngle(this.platforms[1],this.orientation.beta*2/Math.PI);


    //}
    //
    // console.log("orientation Beta "+ this.orientation.beta);
    // console.log("angle" + this.orientationAngle);
    // // console.log("mouseY" + event.clientY);



    //this.orientation.beta

    this.context.save();
    this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);
    //this.context.translate(0, 0);
    //this.context.scale(4, 4);
    //this.context.translate(-this.player.position.x, -this.player.position.y);

    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#000';

    this.context.fillStyle = '#FF0000';


      // DRAW BALL
      // I use this ============>
    // var playerVerts = this.player.vertices;
    //   this.context.beginPath();
    //   this.context.moveTo(playerVerts[0].x, playerVerts[0].y);
    //
    //   for (i = 1; i < playerVerts.length; i++){
    //     //this.context.arc(playerVerts[i].x, playerVerts[i].y, 4, 0, 2 * Math.PI, false);
    //     this.context.lineTo(playerVerts[i].x, playerVerts[i].y);
    //   }
    //
    //   this.context.fill();

    //OR

    this.context.beginPath();
    this.context.arc(this.player.position.x, this.player.position.y, this.ballSize, 0, 2*Math.PI);
    this.context.fill();

      this.context.fillStyle = '#000';

    for (i = 0; i < this.walls.length; i++) {
      //DRAWING GROUND
      var vertices = this.walls[i].vertices;
      this.context.beginPath();
      this.context.moveTo(vertices[0].x, vertices[0].y);

      for (var j = 1; j < vertices.length; j += 1) {
          this.context.lineTo(vertices[j].x, vertices[j].y);
      }

      this.context.fill();
    }


    for (i = 0; i < this.platforms.length; i++) {
      //DRAWING Plateforms
      var platformsVertices = this.platforms[i].vertices;
      this.context.beginPath();
      this.context.moveTo(platformsVertices[0].x, platformsVertices[0].y);

      for (var j = 1; j < platformsVertices.length; j += 1) {
          this.context.lineTo(platformsVertices[j].x, platformsVertices[j].y);
      }
      this.context.fill();
    }




    this.context.strokeStyle = '#000';
    this.context.lineWidth = this.platformWidth;



    this.context.lineWidth = this.ballSize;
    this.context.fillStyle = '#000';



    //this.connection.send(JSON.stringify({"sendTo" : "webapp", "objects" : {"player" : this.player.position}}));

    // this.context.beginPath();
    // this.context.fillStyle = '#FF0033';
    // this.context.rect((this.canvas.width/2),(this.canvas.height/2),this.orientation.beta,100);
    // this.context.fill();



    this.context.restore();
    window.requestAnimationFrame(this.draw.bind(this));
  },
  addPlatform:function(daten) {
    var newCoords = daten.beta;
    this.orientation.beta = newCoords;
  }

  // addPlatform:function(daten) {
  //   var newCoords = daten.newPlatform;
  //   var length = Math.sqrt(Math.pow(newCoords.endPos.x - newCoords.startPos.x, 2) + Math.pow(newCoords.endPos.y - newCoords.startPos.y, 2));
  //   var centerX = newCoords.startPos.x + (newCoords.endPos.x - newCoords.startPos.x)/2;
  //   var centerY = newCoords.startPos.y + (newCoords.endPos.y - newCoords.startPos.y)/2;
  //   var platAngle = Math.atan((newCoords.endPos.y - newCoords.startPos.y) / (newCoords.endPos.x - newCoords.startPos.x));
  //   //TEST PLATFORM BEFORE INTEGRATING DRAWING POSSIBILITY (MIGHT BE BETTER TO DO IT WITH A PLATFORM OBJECT)
  //   this.platforms.push({
  //     "matterObject" : this.Bodies.rectangle(centerX, centerY, length, this.platformWidth, { isStatic: true, angle : platAngle }),
  //     "startPos" : newCoords.startPos,
  //     "endPos" : newCoords.endPos
  //   });
  //   this.World.add(this.engine.world, this.platforms[this.platforms.length-1].matterObject);
  // }
};



document.body.onclick = function (e) {
  //window.tibor.app.addTruc();
  //console.log("this.clicked "+ window.tibor.app.clicked);
  //console.log("X    "+ e.clientX/window.tibor.app.worldWidth*100);
  //console.log("Y   "+ e.clientY/window.tibor.app.worldHeight*100);
  // numberOfClick = window.tibor.app.clicked;
  window.tibor.app.clicked ++ ;
  this.Xclicked [ window.tibor.app.clicked] = (e.clientX/window.tibor.app.worldWidth*100);
  this.Yclicked[  window.tibor.app.clicked] = e.clientY/window.tibor.app.worldHeight*100;




}

//INTEGRATE A CONVERTER FOR PLATFORM AND PLAYER POSITIONS
//INTEGRATE A RENDERER FOR MOBILE
//to use it
//Math.floor(val.map(0,127,0,1));
//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
