if(typeof(Storage) !== "undefined"){
    // store
    localStorage.setItem('name',"sarfraj");
    // retrieve
    document.getElementById('result').innerHTML = localStorage.getItem('name');
}else{
    document.getElementById('result').innerHTML = "Sorry, Your browser does not support Web Storage..."
}

// function clickCounter(){
//     if(typeof(Storage) !== "undefined"){
//         if(localStorage.clickcount){
//             localStorage.clickcount = Number(localStorage.clickcount) +1;
//         }else{
//             localStorage.clickcount = 1;
//         }
//         document.getElementById('result2').innerHTML = "you have clicked the button " + localStorage.clickcount + " time(s)."
//     }else{
//         document.getElementById('result2').innerHTML = "Sorry, Your browser does not support Web Storage..."
//     }
// }

function clickCounter() {
    if (typeof(Storage) !== "undefined") {
      if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
      } else {
        sessionStorage.clickcount = 1;
      }
      document.getElementById("result2").innerHTML = "You have clicked the button " + sessionStorage.clickcount + " time(s) in this session.";
    } else {
      document.getElementById("result2").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }