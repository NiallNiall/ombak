function getColor() {
  // var clrr = 'FireBrick';
  var clrr = Color.random();
  return clrr;
}

function createVein(initialPos) {

  var veinPath = new paper.Path();
      veinPath.add(initialPos);
      veinPath.add(initialPos);

  var veinPHPos = initialPos;
  var playHead = new paper.Path.Circle(veinPHPos, 8);
  playHead.fillColor = 'FireBrick';

  var playHeadPos = initialPos;


  var vein = {
    veinPath: veinPath,
    addPoints: addPoints,
    loop: loop,
    playHeadPos: playHeadPos,
    getPHPos: getPHPos
  }

  var smlBranches = [];

  function addPoints(pointPos) {
      var segLength = veinPath.segments.length-1;
      var getLastPos = veinPath.segments[segLength].point;

      veinPath.add(pointPos);
      // endShape.position = pointPos;

      var line = new Path.Line(getLastPos, pointPos);
      line.strokeColor = getColor();
      var lWidth = 1 + (20 - veinPath.length/100);
      if(lWidth < 1.5){lWidth = 1.5;}
      line.strokeWidth = lWidth;
      line.strokeCap = 'round';

      // console.log(line);


      var branchProbability = 0.1;

      var randomBranch = Math.random() < branchProbability ? true: false;

      if(randomBranch){
          var smlBranchSize = 150;//randomIntFromInterval(25,400);
          var newBranch = makeSmallBranch(getLastPos, pointPos, 1, smlBranchSize);
          smlBranches.push(newBranch);
          var newBranch = makeSmallBranch(getLastPos, pointPos, -1, smlBranchSize);
          smlBranches.push(newBranch);
      }

  }


function makeSmallBranch(thisPos, prevPos, dir, branchL){

      var smlBranchLength = branchL;//randomIntFromInterval(50,300);

      var smlBranchStart = thisPos;
      var prevBranchPoint = prevPos;

      var branchGrow = 10;

      var tempVec = prevBranchPoint.subtract(smlBranchStart);

      if(dir > .5){
        var perpVecR = new paper.Point(tempVec.x-tempVec.y*-1, tempVec.y-tempVec.x);
      } else {
        var perpVecR = new paper.Point(tempVec.x-tempVec.y, tempVec.y-tempVec.x*-1);
      }

      var branchDir = perpVecR.normalize();

      // var newEndR = smlBranchStart.add(branchDir.multiply(75));

      var smlBranchR = new Path();//.Line(smlBranchStart, newEndR);
      // smlBranchR.strokeColor = Color.random();
      // smlBranchR.strokeWidth = 4.0;
      // smlBranchR.strokeCap = 'round';

      smlBranchR.add(smlBranchStart);
      smlBranchR.add(smlBranchStart.add(branchDir.multiply(branchGrow)));
      // smlBranchR.add(smlBranchStart.add(dirVecR.multiply(75).subtract(10)));

      // return smlBranchR;

      var smlBranch = {
        smlBranchR: smlBranchR,
        grow: grow
      }


      function grow(){
        if(branchGrow < smlBranchLength) {
          var branchPointAdd = smlBranchStart.add(branchDir.multiply(branchGrow));
          smlBranchR.add(branchPointAdd);//smlBranchStart.add(branchDir.multiply(branchGrow).add(randomIntFromInterval(-5,5))));

          var smlBranchSegLength = smlBranchR.segments.length-2;
          var prevSmlBranchPos = smlBranchR.segments[smlBranchSegLength].point;

          console.log(prevSmlBranchPos);
          var smlBranchPiece = new Path.Line(branchPointAdd, prevSmlBranchPos);
          smlBranchPiece.strokeColor = getColor();
          smlBranchPiece.strokeWidth = (smlBranchLength-branchGrow)/25;
          smlBranchPiece.strokeCap = 'round';

          branchGrow +=10;
        } else {
          // branchGrow = 150;
        }
      }


      console.log(smlBranches);

      return smlBranch;
}


function smlBranch(tempVec) {
  // var branch = new Path();

  // var perpVecR = new paper.Point(tempVec.x-tempVec.y*-1, tempVec.y-tempVec.x);

  // branch.add
  // branch.add(smlBranchStart.add(dirVecR.multiply(75)));
  // var dirVecR = perpVecR.normalize();
  // var newEndR = smlBranchStart.add(dirVecR.multiply(75));
  // var smlBranchR = new Path.Line(smlBranchStart, newEndR);

  // return branch;
}



  var pointPos = 0.001;

  function loop() {

      if(pointPos <= 1){
        pointPos += 0.005;
      } else {
        pointPos = 0.001;
      }

       for(var i = 0; i <smlBranches.length; i++){
        smlBranches[i].grow();
      }

      // console.log(pointPos);

      movePlayhead(veinPath, pointPos);
  }

  function movePlayhead(tempVein, tempPointPos) {

    var getLength = tempVein.length;
    // console.log(getLength);
    var pos = getLength * tempPointPos;

    playHeadPos = tempVein.getPointAt(pos);
    playHead.position = playHeadPos;
  }

  function getPHPos() {
    var rtnPos = playHeadPos;

    return rtnPos;

  }

  return vein;

}

// =====================================================
// =====================================================

