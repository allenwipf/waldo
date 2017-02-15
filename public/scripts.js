window.addEventListener("load", function(){

    pageLoad = window.event.timeStamp;
    document.getElementById("waldoImage").addEventListener("click", clickImage);
    document.getElementById("myModal").addEventListener("click", closeModal);
    document.getElementById("getHigh").addEventListener("click", highScores);
    document.getElementById("waldoImage").addEventListener("click", mouseCircle)

});

// After a player clicks on the waldo image this function posts my X and Y offset
// coordinance and waits for reponse text. 
// 
// If response text is "true" will run the successModal function
function clickImage(e){

    var findTime = ((e.timeStamp-pageLoad)/1000).toFixed(1);
    var ourRequest = new XMLHttpRequest();
    var params = "offsetX=" + e.offsetX + "&offsetY=" + e.offsetY + "&time=" + findTime;
    ourRequest.open('POST', '/', true);
    ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ourRequest.onreadystatechange = function(){
  
        if (ourRequest.responseText == 'true'){
             successModal(e);
        }
    };
    ourRequest.send(params);
}

// Shows the a hidden Modal when Waldo is found
function successModal(e){
  
    stopTimer();
    var findTime = ((e.timeStamp-pageLoad)/1000).toFixed(1);

    document.getElementById("find-time").innerHTML = ("You found him in " + findTime + " seconds!");
    document.getElementById('myModal').style.display = "block";
}

// Closes the Modal box if the "X" our anything outside the Modal is clicked on.
// Will then refresh the page so timer resets.
function closeModal(e){

    if (e.target == this) {
        document.getElementById('myModal').style.display = "none";
    } else if (e.target == this.getElementsByClassName("close")[0]) {
        document.getElementById('myModal').style.display = "none";
    }
    location.reload();
}

// Sends a Get request to server to retrieve the high scores when the "high Scores"
// button is clicked
function highScores(e){

    var getRequest = new XMLHttpRequest();
    getRequest.open('GET', 'http://localhost:4567/data');

    getRequest.onload = function() {
        var ourData = getRequest.responseText; 

        document.getElementById("anounce").innerHTML = "High Scores!";
        document.getElementById("find-time").innerHTML = ourData;
        document.getElementById('myModal').style.display = "block";
    };
    getRequest.send();
    e.preventDefault;
}

// place as circle around the mouse click anytime a player clicks on the image
// whether or whether not Waldo is found
function mouseCircle(e){

    document.getElementById("circle").style.top = String(e.pageY -25) + "px";
    document.getElementById("circle").style.left = String(e.pageX -25) + "px";
    document.getElementById("circle").style.display = "block";
}

// shows a Time Elapsed counter in seconds and 1/10 seconds.
// As 1/10 second goes by this function will run and update the innerHTML
// of the proper node.
function counter(e) {
    var date = new Date();
    var time = date.getTime();
    timeElapsed = ((time-pageLoad)/1000).toFixed(1);
    document.getElementById("timer").innerHTML = "Time Elapsed: " + timeElapsed;
}

// stops the Time Elapsed Counter. This fires when Waldo is found.
var waldoTimer = setInterval(counter, 100);

function stopTimer(){

    clearInterval(waldoTimer);
}



