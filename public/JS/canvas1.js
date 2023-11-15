var c = document.getElementById('mycanvas');
console.log(c);
var ctx = c.getContext('2d');

// ctx.moveTo(0,0);
// ctx.lineTo(200,100)
// ctx.stroke();
// // circle

// ctx.beginPath();
// ctx.arc(95,50,40,0,2 * Math.PI)
// ctx.stroke();
// // words
// ctx.font = "20px Arial";
// ctx.fillText('my name is sarfraj',15,50);

// Create gradient
// var grd = ctx.createLinearGradient(0,0,200,0);
var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
grd.addColorStop(0,"red");
grd.addColorStop(1,"black");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10,10,150,80);

// add image to canvas

function canvasDraw(){
    var  img = document.getElementById('image1');
    ctx.drawImage(img,10,10)
}