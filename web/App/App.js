var App = function(connection){

  this.connection = connection;
  this.canvas = document.getElementById("canvas");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.context = this.canvas.getContext("2d");
  this.boundRect = this.canvas.getBoundingClientRect();
  this.canvLeft = this.boundRect.left;
  this.canvTop = this.boundRect.top;
  this.context.fillStyle = "black"

  this.context.strokeStyle = "black";
  this.context.lineWidth = platformWidth;
  this.orientation = {"alpha" : 0, "beta": 0, "gamma" : 0};
  this.ballSize = ballSize;
  this.worldWidth = worldWidth;
  this.worldHeight = worldHeight;
  this.player = {"x" : 0, "y" : 0};
  this.ground;
  this.platforms = [""];

  this.creatingPlatform = false;
  this.currentPlatformStart = {"x" : 0, "y" : 0};
  this.currentPlatformEnd = {"x" : 0, "y" : 0};
  this.init();
}

App.prototype = {

  init:function() {

    //BINDING ORIENTATION EVENTS
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (function(event) {
        this.orientation.alpha = event.alpha;
        this.orientation.beta = event.beta;
        this.orientation.gamma = event.gamma;
      }).bind(this));
    }





    this.platforms[0] = {
      "startPos" : {"x" : 50, "y" : 100},
      "endPos" : {"x" : 150, "y" : 100}
    };

    //TEST PLATFORM BEFORE INTEGRATING DRAWING POSSIBILITY (MIGHT BE BETTER TO DO IT WITH A PLATFORM OBJECT)
    this.platforms[1] = {
      "startPos" : {"x" : 150, "y" : 200},
      "endPos" : {"x" : 250, "y" : 200}
    };

    this.canvas.addEventListener("mousedown", (function(e) {
      this.creatingPlatform = true;
      this.currentPlatformStart.x = e.clientX - this.canvLeft;
      this.currentPlatformStart.y = e.clientY - this.canvTop;

      this.currentPlatformEnd.x = e.clientX - this.canvLeft;
      this.currentPlatformEnd.y = e.clientY - this.canvTop;
    }).bind(this));

    this.canvas.addEventListener("mousemove", (function(e) {
      if(this.creatingPlatform) {
        this.currentPlatformEnd.x = e.clientX - this.canvLeft;
        this.currentPlatformEnd.y = e.clientY - this.canvTop;
      }
    }).bind(this));


    this.canvas.addEventListener("mouseup", (function(e) {
      this.creatingPlatform = false;
      this.addNewPlatform();
    }).bind(this));



    this.draw();
  },

  draw:function() {

this.connection.send(JSON.stringify({"sendTo" : "mobile", "beta" : this.orientation.beta}));

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //DRAWING BOUNDARIES
    // this.context.beginPath();
    // this.context.moveTo(5, 5);
    // this.context.lineTo(this.worldWidth - 5, 5);
    // this.context.lineTo(this.worldWidth - 5, this.worldHeight - 5);
    // this.context.lineTo(5, this.worldHeight - 5);
    // this.context.stroke();
    //
    //
    // this.context.beginPath();
    // this.context.arc(this.player.x, this.player.y, this.ballSize, 0, 2*Math.PI);
    // this.context.fill();
    //
    // for(i = 0; i < this.platforms.length; i++) {
    //   this.context.beginPath();
    //   this.context.moveTo(this.platforms[i].startPos.x, this.platforms[i].startPos.y);
    //   this.context.lineTo(this.platforms[i].endPos.x, this.platforms[i].endPos.y);
    //   this.context.stroke();
    // }
    //
    // if(this.creatingPlatform) {
    //   this.context.strokeStyle = "#000";
    //   this.context.beginPath();
    //   this.context.moveTo(this.currentPlatformStart.x, this.currentPlatformStart.y);
    //   this.context.lineTo(this.currentPlatformEnd.x, this.currentPlatformEnd.y);
    //   this.context.stroke();
    // }

    this.context.beginPath();
    this.context.fillStyle = '#FF0033';
    this.context.rect((this.canvas.width/2),(this.canvas.height/2),this.orientation.beta,100);
    this.context.fill();


    //
    // this.context.fillStyle = '#FF0000';
    // this.context.fill();


    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.worldWidth/2, 0);
    this.context.lineTo(this.worldWidth/2, this.worldHeight*2);
    // this.context.lineTo(5, this.worldHeight - 5);
    this.context.stroke();
    this.context.fill();



    requestAnimationFrame(this.draw.bind(this));
  },

  updatePlayerPosition:function(daten) {
    this.player = daten.objects.player;
  },
  addNewPlatform:function() {
    var newPlatform = {"startPos" : {}, "endPos" : {}};
    newPlatform.startPos["x"] = this.currentPlatformStart["x"];
    newPlatform.startPos["y"] = this.currentPlatformStart["y"];
    newPlatform.endPos["x"] = this.currentPlatformEnd["x"];
    newPlatform.endPos["y"] = this.currentPlatformEnd["y"];
    this.platforms.push(newPlatform);

    this.connection.send(JSON.stringify({"sendTo" : "mobile", "newPlatform" : newPlatform}));
  }

}


//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
