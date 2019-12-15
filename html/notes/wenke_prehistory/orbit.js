function init() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var canDims = [canvas.width, canvas.height];
  var sun = new Path2D();
  sun.arc(0,0, 10, 0,Math.PI*2, true);
  var earth = new Path2D();
  earth.arc(0,0, 3, 0,Math.PI*2, true);
  var objects = [sun, earth];
  var initTime = new Date();

  function draw(canDims, ctx, objects, time) {
    ctx.clearRect(0,0, canDims[0],canDims[1]);

    ctx.save();
    ctx.translate(150,150);
    ctx.fillStyle = 'yellow';
    ctx.fill(objects[0]);

    ctx.rotate(time);
    ctx.translate(50,0);
    ctx.fillStyle = 'red';
    ctx.fill(objects[1]);
    ctx.restore();
    window.requestAnimationFrame(
      function () {
        draw(canDims, ctx, objects, time+0.01);
      }
    );
  }

  window.requestAnimationFrame(
    function () {
      draw(canDims, ctx, objects, 0);
    }
  );
}
