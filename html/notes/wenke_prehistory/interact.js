var can = document.getElementById('canvas');
var ctx = can.getContext('2d');
var mouseDown = false;

var ball = {
  x: 100,
  y: 100,
  radius: 10,
  color: 'blue',
  p2d: null,
  init: function () {
    this.p2d = new Path2D();
    this.p2d.arc(0,0, this.radius, 0,Math.PI*2, true);
  },
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.fill(this.p2d);
    ctx.restore();
  }
}
ball.init();

function draw() {
  ctx.clearRect(0,0, can.width,can.height);
  ball.draw();

  window.requestAnimationFrame(draw);
}

can.addEventListener('mousemove', function(event) {
  if (mouseDown) {
    ctx.clearRect(0,0, can.width,can.height);
    ball.x = event.clientX;
    ball.y = event.clientY;
    ball.draw();
  }
});

can.addEventListener('mousedown', function(event) {
  mouseDown = true;
  window.requestAnimationFrame(draw);
});

can.addEventListener('mouseup', function(event) {
  mouseDown = false;
  window.requestAnimationFrame(draw);
});
