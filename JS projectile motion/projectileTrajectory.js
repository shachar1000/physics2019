var width = 500;
var height = 400;
var frameRate = 1/60; // Seconds
var frameDelay = frameRate * 1000; // ms


Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
var ball = {
    position: {x: width/2, y: 385},
    angle: Math.radians(45), // convert from degrees to radians
  	velocity: 10, // m/s
    mass: 0.1, //kg
    radius: 15, // 1px = 1cm
    restitution: -0.7
    };
var arrayX = [ball.position.x];
var arrayY = [ball.position.y];
var Cd = 0.47;  // Dimensionless drag coefficient
var rho = 1.22; // kg / m^3
var A = Math.PI * ball.radius * ball.radius / (10000); // m^2
//alert("a"+A)
var ag = 9.81;  // m / s^2

var setup = function() {
		ball.velocityX = ball.velocity*Math.cos(ball.angle)
  	ball.velocityY = ball.velocity*Math.sin(ball.angle)

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.strokeStyle = '#000000';
    loopTimer = setInterval(loop, frameDelay);
}
var loop = function() {
  //alert(0.5 * Cd * A * rho)
  // Drag force: Fd = -1/2 * Cd * A * rho * v * v
	Fx = -0.5 * Cd * A * rho * (ball.velocityX**2);
  Fx = Fx * (ball.velocityX / Math.abs(ball.velocityX));
  Fy = -0.5 * Cd * A * rho * (ball.velocityY**2);
  Fy = Fy * (ball.velocityY / Math.abs(ball.velocityY));

  Fx = (isNaN(Fx) ? 0 : Fx);
  Fy = (isNaN(Fy) ? 0 : Fy);

  var ax = Fx / ball.mass;
  var ay = ag + (Fy / ball.mass);

  ball.velocityX += ax*frameRate;
  ball.velocityY += ay*frameRate;

  ball.position.x += ball.velocityX*frameRate*100;
  ball.position.y += ball.velocityY*frameRate*100;

  if (ball.position.y > height - ball.radius) {
      ball.velocityY *= ball.restitution;
      ball.position.y = height - ball.radius;
  }
  if (ball.position.x > width - ball.radius) {
      ball.velocityX *= ball.restitution;
      ball.position.x = width - ball.radius;
  }
  if (ball.position.x < ball.radius) {
      ball.velocityX *= ball.restitution;
      ball.position.x = ball.radius;
  }

  arrayX.push(ball.position.x)
  arrayY.push(ball.position.y)

    ctx.clearRect(0,0,width,height);
    ctx.save();
    ctx.translate(ball.position.x, ball.position.y);
    ctx.beginPath();
    ctx.arc(0, 0, ball.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}
    setup();
