// Draw the crystal structure.

var ctx = document.getElementById("crystal").getContext('2d');

ctx.save();

var frontback = new Path2D("M 10 10 h 100 v 100 h -100 Z");
var leftright = new Path2D("M 10 10 l 20 20 v 100 l -20 -20");

var ion = new Path2D();
ion.arc(0,0, 5, 0,Math.PI*2);

function draw_ion(x,y,positive) {
  ctx.save();
  
  ctx.translate(x,y);
  ctx.fill(ion);
  ctx.translate(-4,3);
  ctx.strokeStyle = "white";
  var text = "--";
  if (positive) { text = "+"; }
  ctx.strokeText(text,0,0);
  
  ctx.restore();
}

ctx.stroke(frontback);
ctx.stroke(leftright);

ctx.translate(20,20);
ctx.stroke(frontback);

ctx.restore();
ctx.save();

ctx.translate(100,0);
ctx.stroke(leftright);

ctx.restore();
ctx.save();

draw_ion(70,70,true);
for (i = 0; i < 2; i++) {
  for (j = 0; j < 2; j++) {
    for (k = 0; k < 2; k++) {
      draw_ion(i*100 + k*20 + 10, j*100 + k*20 + 10, true);
    }
  }
  draw_ion(20+i*100, 69, false);
  draw_ion(69, 20+i*100, false);
  draw_ion(60 + 20*i, 60 + 20*i, false);
}

// Draw the coordinate system.

var ctx2 = document.getElementById("coordinates").getContext('2d');
ctx2.moveTo(10,120);
ctx2.lineTo(140,30);
ctx2.stroke();
ctx2.strokeText("x",0,130);

ctx2.moveTo(10,75);
ctx2.lineTo(140,75);
ctx2.stroke();
ctx2.strokeText("y",142,77);

ctx2.moveTo(75,10);
ctx2.lineTo(75,140);
ctx2.stroke();
ctx2.strokeText("z",75,10);
