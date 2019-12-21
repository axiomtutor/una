var ctx = document.getElementById("crystal").getContext('2d');
var frontback = new Path2D("M 10 10 h 100 v 100 h -100 Z");
var leftright = new Path2D("M 10 10 l 20 20 v 100 l -20 -20");

ctx.save();

ctx.stroke(frontback);
ctx.stroke(leftright);

ctx.translate(20,20);
ctx.stroke(frontback);
ctx.restore();

ctx.translate(100,0);
ctx.stroke(leftright);
ctx.restore();

var pos_ion = new Path2D("M 55 55 A 10 10 0 1 0 55 55");
ctx.stroke(pos_ion);
