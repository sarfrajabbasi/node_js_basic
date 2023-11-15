var video1 = document.getElementById('video1');

function playPause(){
  video1.paused? video1.play():video1.pause()
}
var makeBig = ()=>{
    video1.width = 560;
}
var makeSmall = ()=>{
    video1.width = 320;
}
var  makeNormal = ()=>{
    video1.width = 420;
}
