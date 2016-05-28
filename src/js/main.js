(function () { 'use strict';

}()); // end 'use strict'


// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().toMaster();
synth.oscillator.type = "sine";

// var synth = new Tone.DrumSynth().toMaster();
// synth.triggerAttackRelease("C2", "8n");

var snare = new Tone.NoiseSynth().toMaster();
// snare.triggerAttackRelease("8n");
// snare.oscillator.type = "triangle";

var kick = new Tone.DrumSynth().toMaster();
// console.log(synth.oscillator.type);


paper.install(window);
  // Only executed our code once the DOM is ready.
  window.onload = function() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('paperCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    // Create a Paper.js Path to draw a line into it:
    // var myCircle = new paper.Path.Circle(new paper.Point(100, 70), 50);
    // myCircle.fillColor = 'black';


    var selectr = 1;
    var oldSelector = 1;

    var phRadius = 200;

    var getCirclePos = function(centerPos, inc, Radius) {
      var angle = Math.radians(inc);
      var x = centerPos.x + Math.sin(angle) * Radius;
      var y = centerPos.y + Math.cos(angle) * Radius;
      var pos = new paper.Point(x,y);
      return pos;
    }


    var rotrPos = new paper.Point(paper.view.center);

    var playHeadPath = new paper.Path.Circle(paper.view.center, phRadius);
    playHeadPath.strokeColor = 'NavajoWhite';
    playHeadPath.strokeWidth = 5.0;

    var playHead = new paper.Path.Circle(rotrPos, 20);
    playHead.fillColor = 'LightSlateGray';

    var countr = 1;

    var allSteps = [];
    var movrs = [];

    var counttt = 1;




    // for(var i =0; i < 100 ; i++){

    //   var distr = easeInOutExpo(i, 0, 200, 100);
    //   var from = new paper.Point(i*5,0);
    //   var to = new paper.Point(i*5, distr);
    //   var path = new Path.Line(from, to);
    //   path.strokeColor = 'Tomato';
    //   path.strokeWidth = '1.0';
    // }


    paper.view.onFrame = function(event) {
      // On each frame, rotate the path by 3 degrees:
      // dog.drawStep();

      countr +=2;

      var rotrPos = getCirclePos(paper.view.center, countr, phRadius);

      playHead.position = rotrPos;


      counttt +=1;
      for(var i =0; i<allSteps.length; i++){
        // console.log(counttt);
        allSteps[i].distanceTest(rotrPos);
      }

      for(var i =0; i<movrs.length; i++){
        // console.log(counttt);
        movrs[i].loop(rotrPos);
        // console.log(movrs);
      }

      if(selectr == oldSelector) {
        // Do NOTHING
      } else {
        console.log("selector changed to " + selectr);
        selectionIcon();
      }
      oldSelector = selectr;
    }







      var mouseTool = new paper.Tool();

    mouseTool.onMouseDown = function(event) {

      switch(selectr) {
          case 1:
                    var newStep = createKick(event.point);
                    allSteps.push(newStep);
              break;
          case 2:
                    var newStep = createSnare(event.point);
                    allSteps.push(newStep);
              break;
          case 3:
                    var newStep = createPulse(event.point);
                    allSteps.push(newStep);
              break;
          case 4:
                    var newStep = createMovr(event.point);
                    movrs.push(newStep);
              break;
          default:
                    var newStep = createKick(event.point);
                    allSteps.push(newStep);
      }

         // allSteps.push(newStep);

    }



     var bgRadius = 50;
      var selectedIconPoint = new paper.Point(bgRadius, bgRadius);
      var selectedBackground = new paper.Path.Rectangle(selectedIconPoint.subtract(bgRadius/2), bgRadius);
      selectedBackground.fillColor = 'DimGray';

            var selectedIcon = new paper.Path.Circle(selectedIconPoint, 10);
      selectedIcon.fillColor ='DarkCyan';


    var selectionIcon = function() {


      // var selectedIcon = new paper.Path.Circle(selectedIconPoint, 10);
      // selectedIcon.fillColor ='Tomato';
      // selectedBackground.strokeColor = 'Gray';
      // selectedBackground.strokeWidth = 5.0;



      switch(selectr) {
          case 1:
                 console.log("1");
                 selectedIcon.remove();
                selectedIcon = new paper.Path.Circle(selectedIconPoint, 10);
                  selectedIcon.fillColor ='DarkCyan';

              break;
          case 2:
                 console.log("2");
                 var rectRadius = 20;
                 selectedIcon.remove();
                 selectedIcon = new paper.Path.Rectangle(
                    selectedIconPoint.subtract(rectRadius/2),
                    rectRadius
                  );
                  selectedIcon.fillColor ='Tomato';
              break;
          case 3:
                 console.log("3");
                  var rectRadius = 25;
                 selectedIcon.remove();
                 selectedIcon = new paper.Path.Rectangle(
                    new paper.Point(selectedIconPoint.x - rectRadius/2, selectedIconPoint.y - (rectRadius)),
                    new paper.Point(selectedIconPoint.x + rectRadius/2, selectedIconPoint.y +(rectRadius))
                  );
                  selectedIcon.fillColor ='NavajoWhite';
              break;
          case 4:
                 console.log("4");
                 selectedIcon.remove();
                selectedIcon = new paper.Path.Circle(selectedIconPoint, 10);
                  selectedIcon.fillColor ='SaddleBrown';
              break;
          default:
                 console.log("0");
      }
    }


    mouseTool.onKeyDown = function(event) {

       switch(event.key) {
          case '1':
                          selectr = 1;
              break;
          case '2':
                          selectr = 2;
              break;
          case '3':
                          selectr = 3;
              break;
          case '4':
                          selectr = 4;
              break;
          default:
                   selectr = 1;
      }

    }





    // Draw the view now:
    paper.view.draw();

  }


// var step1 = new drumStep();
// var person2 = new Trigger("UltraTrig");

// person1.triggerEvent();
// person2.triggerEvent();