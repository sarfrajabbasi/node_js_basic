var w;

function startWorker(){
    if(typeof Worker !== "undefined"){
        if(typeof w === "undefined"){
            w = new Worker("./demo.js")
        }
        w.onmessage = function(event){
            document.getElementById('result').innerHTML = event.data;
        }
    }else{
        document.getElementById('result').innerHTML = "Sorry,your borwser not suppport Web Workers..."
    }
}

function stopWorker(){
    w.terminate();
    w=undefined;
}