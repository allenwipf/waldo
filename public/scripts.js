window.addEventListener("load", function(){

    pageLoad = window.event.timeStamp;
    
    document.getElementById("waldoImage").addEventListener("click", clickImage);
   
    document.getElementById("myModal").addEventListener("click", closeModal);
   
    document.getElementById("getHigh").addEventListener("click", highScores);

    document.getElementById("waldoImage").addEventListener("click", mouseCircle)

});

function clickImage(e){

    var findTime = ((e.timeStamp-pageLoad)/1000).toFixed(1);

    var ourRequest = new XMLHttpRequest();
    var params = "offsetX=" + e.offsetX + "&offsetY=" + e.offsetY + "&time=" + findTime;
    ourRequest.open('POST', '/', true);

    ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ourRequest.onreadystatechange = function(){
  
        if (ourRequest.responseText == 'true'){
             profileView(e)
        }
    };
    ourRequest.send(params);
}


function profileView(e){
  
    stopTimer()
    var findTime = ((e.timeStamp-pageLoad)/1000).toFixed(1);

    document.getElementById("find-time").innerHTML = ("You found him in " + findTime + " seconds!");

    document.getElementById('myModal').style.display = "block";

}


function closeModal(e){

    if (e.target == this) {
        document.getElementById('myModal').style.display = "none";
    } else if (e.target == this.getElementsByClassName("close")[0]) {
        document.getElementById('myModal').style.display = "none";
    }

    location.reload()

}

function highScores(e){

    var getRequest = new XMLHttpRequest();
    getRequest.open('GET', 'http://localhost:4567/data');

    getRequest.onload = function() {
     
    var ourData = getRequest.responseText;
  
    // myData = getRequest.responseText
    alert(ourData)
    // var ourData = JSON.parse(getRequest.responseText);

    };
 
    getRequest.send()
    e.preventDefault;
}

function mouseCircle(e){

   console.log(String(e.offsetX))
   console.log(String(e.offsetY))

    document.getElementById("circle").style.top = String(e.pageY -25) + "px"
    document.getElementById("circle").style.left = String(e.pageX -25) + "px"
    document.getElementById("circle").style.display = "block"
}


function counter(e) {
    var date = new Date();
    var time = date.getTime();
    timeElapsed = ((time-pageLoad)/1000).toFixed(1);
    document.getElementById("timer").innerHTML = "Time Elapsed: " + timeElapsed
}

var waldoTimer = setInterval(counter, 100);

function stopTimer(){

    clearInterval(waldoTimer);
}



// var sec = 0;
// function pad ( val ) { return val > 9 ? val : "0" + val; }
// setInterval( function(){
//     document.getElementById("seconds").innerHTML=pad(++sec);
// }, 1000);

// function verifyClick(e){

//     var ourRequest = new XMLHttpRequest();
//     ourRequest.open('GET', 'http://localhost:4567/data');

//     ourRequest.onload = function() {
  
//     //var ourData = JSON.parse(ourRequest.responseText);
  
//     myData = ourRequest.responseText.split(",")
//     last = myData.length-1

//     // console.log(myData[last])
//     console.log(myData)
    
 
//     if (myData[last].trim() ==  'true'){
//         profileView(e)  
//     }

//     };


//     ourRequest.send()
// }








