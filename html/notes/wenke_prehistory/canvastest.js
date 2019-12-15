
// Some useful basic functions.
// fillRect
// lineTo
// arc
// quadraticCurveTo
// bezierCurveTo
function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // fillRect(x,y,width,height)
  ctx.fillStyle = 'green';
  ctx.fillRect(10,10,100,40);
  ctx.fillStyle = 'rgba(0,0,200, 0.5)';
  ctx.fillRect(30,30,50,50);

  // Draw a polygon with vertices defined by moveTo and lineTo.
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(10,10);
  ctx.lineTo(10,200);
  ctx.lineTo(20,100);
  ctx.fill();

  // Draw a closed line sequence.
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(200,100);
  ctx.lineTo(100,200);
  ctx.closePath();
  ctx.stroke();

  // arc(x,y,radius,startAngle,endAngle,anticlockwise)
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.arc(100,100,50,20, Math.PI*2, false);
  ctx.stroke();
  // arcTo(x1,y1, x2,y2, radius)

  // quadraticCurveTo(cp1x,cp1y, x,y) with third end-point defined by the pen
  // position.
  ctx.lineWidth = 2;
  ctx.moveTo(0,250);
  ctx.quadraticCurveTo(100,200, 200,250);
  ctx.stroke();
  // bezierCurveTo(cp1x,cp1y, cp2x,cp2y, x,y)
  ctx.moveTo(0,250);
  ctx.bezierCurveTo(10,200, 150,200, 200,250);
  ctx.stroke();
}

// Use of Path2D and a text example.  Text measurement will be useful for
// typesetting.
function draw2() {
  var canvas = document.getElementById('canvas2');
  var ctx = canvas.getContext('2d');

  var rect = new Path2D();
  rect.rect(10,10,50,50);

  var circ = new Path2D();
  circ.moveTo(100,10);
  circ.arc(100,100,50,0,Math.PI,true);

  ctx.stroke(rect); ctx.stroke(circ);

  ctx.font = '48px serif';
  ctx.fillText("Hello", 100,200);
  var textMeasures = ctx.measureText("Hello");
  var height = textMeasures.fontBoundingBoxAscent;
  ctx.fillText(height, 100, 200+height);
}

// An animation example.
function draw3(cg, ctx, can) {
  ctx.clearRect(0,0,can.width,can.height);
  ctx.stroke(cg);
}
function march(i, gl, ct, can) {
  var g = gl[i];
  draw3(g, ct, can);
  setTimeout( function () { march((i+1)%2, gl, ct, can); }, 40);
}
function draw3main() {
  var canvas = document.getElementById('canvas3');
  var ctx = canvas.getContext('2d');

  var coolGuy = new Path2D("M0 0 h 50 v 50 h -50 Z");
  var coolGuy2 = new Path2D("M11 11 h 50 v 50 h -50 Z");
  var guysList = [coolGuy, coolGuy2];

  march(0, guysList, ctx, canvas);
}

// A save and restore example.
function draw4() {
  var ctx = document.getElementById('canvas4').getContext('2d');

  ctx.fillRect(0, 0, 150, 150);   // Draw a rectangle with default settings
  ctx.save();                  // Save the default state (color, alpha)

  ctx.fillStyle = '#09F';      // Make changes to the settings
  ctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings

  ctx.save();                  // Save the current state
  ctx.fillStyle = '#FFF';      // Make changes to the settings
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90);   // Draw a rectangle with new settings

  ctx.restore();               // Restore previous state
  ctx.fillRect(45, 45, 60, 60);   // Draw a rectangle with restored settings

  ctx.restore();               // Restore original state
  ctx.fillRect(60, 60, 30, 30);   // Draw a rectangle with restored settings
}

// The translate function translates the drawing origin.
// A similar example applies to rotate and scale. A negative scale can reflect!
// More generally you can specify any 2-d transform matrix!!!!!!!!!!!!!!!!!
function draw5() {
  var ctx = document.getElementById('canvas5').getContext('2d');
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}
