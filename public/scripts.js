window.addEventListener("load", function(){

    imageId = 1
    waldoFound = "no"
    document.getElementById("waldoImage").addEventListener("click", clickImage);
    document.getElementById("myModal").addEventListener("click", closeModal);
    document.getElementById("getHigh").addEventListener("click", highScores);
    document.getElementById("start").addEventListener("click", startGame)
    document.getElementById("reset").addEventListener("click", resetGame)
    document.getElementsByClassName("images")[0].addEventListener("click",changeImage)


});

function startGame(){

    pageLoad = Date.now()
    waldoTimer = setInterval(counter, 100);
    document.getElementById("waldoImage").addEventListener("click", mouseCircle)
    document.getElementById("start").style.display = "none";
    document.getElementById("reset").style.display = "block";
    document.getElementById("cover").style.display = "none";
    document.getElementsByClassName("images")[0].style.display = "none";
}

function resetGame(){

    location.reload();
}

// After a player clicks on the Waldo image this function posts my X and Y offset
// coordinates and waits for response text. 
// 
// If response text is "true" will run the successModal function

function clickImage(e){

    if (waldoFound == "no"){
        foundTime = Date.now()
        var findTime = ((foundTime-pageLoad)/1000).toFixed(1);
        var ourRequest = new XMLHttpRequest();
        var params = "offsetX=" + e.offsetX + "&offsetY=" + e.offsetY + "&time=" + findTime + "&imageId=" + imageId;
        ourRequest.open('POST', '/', true);
        ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        ourRequest.onreadystatechange = function(){
      
            if (ourRequest.responseText == 'true'){
                 successModal(e);
            }
        };
        ourRequest.send(params);
    }else{

        return
    }
}

function changeImage(e){

    if (e.target.id == "waldo2") {
        document.getElementById("waldoImage").src = "waldo2.jpg"
        imageId = 2

    } else if (e.target.id == "waldo3"){
        document.getElementById("waldoImage").src = "waldo3.jpg"
        imageId = 3

   } else if (e.target.id == "waldo4"){
        document.getElementById("waldoImage").src = "waldo4.jpg"
        imageId = 4
    }
}

// Shows the a hidden Modal when Waldo is found
function successModal(e){
  
    stopTimer();
    foundTime = Date.now()

    var findTime = ((foundTime-pageLoad)/1000).toFixed(1);

    document.getElementById("find-time").innerHTML = ("You found him in " + findTime + " seconds!");
    document.getElementById('myModal').style.display = "block";
    document.getElementById("anounce").innerHTML = "You found Waldo!"
    waldoFound = "yes"
}

// Closes the Modal box if the "X" our anything outside the Modal is clicked on.
// Will then refresh the page so timer resets.
function closeModal(e){

    if (e.target == this) {
        document.getElementById('myModal').style.display = "none";
    } else if (e.target == this.getElementsByClassName("close")[0]) {
        document.getElementById('myModal').style.display = "none";
    }
   
}

// Sends a Get request to server to retrieve the high scores when the "high Scores"
// button is clicked
function highScores(e){

    var imageName = document.getElementById("waldoImage").src.substr(length - 5)
    var picId = returnId(imageName)

    var params = "picId=" + picId

    var getRequest = new XMLHttpRequest();
    getRequest.open('GET', '/data' + '?' + params, true);

    getRequest.onload = function() {
        var ourData = getRequest.responseText; 

        document.getElementById("anounce").innerHTML = "Top 10 for this map!";
        document.getElementById("find-time").innerHTML = ourData;
        document.getElementById('myModal').style.display = "block";
    };
    getRequest.send();
    e.preventDefault();
}

function returnId(picId){
    if (picId == "o.jpg"){
        return 1
    } else if (picId == "2.jpg"){
        return 2
    } else if (picId == "3.jpg"){
        return 3
    } else if (picId == "4.jpg"){
        return 4
    }
}

// place as circle around the mouse click anytime a player clicks on the image
// whether or whether not Waldo is found
function mouseCircle(e){

    document.getElementById("circle").style.top = String(e.layerY -25) + "px";
    document.getElementById("circle").style.left = String(e.layerX -25) + "px";
    document.getElementById("circle").style.display = "block";
}

// shows a Time Elapsed counter in seconds and 1/10 seconds.
// As 1/10 second goes by this function will run and update the innerHTML
// of the proper node.
function counter(e) {
    var time = Date.now()

    timeElapsed = ((time-pageLoad)/1000).toFixed(1);
    document.getElementById("timer").innerHTML = "Time Elapsed: " + timeElapsed;
}

// stops the Time Elapsed Counter. This fires when Waldo is found.
// var waldoTimer = setInterval(counter, 100);

function stopTimer(){

    clearInterval(waldoTimer);
}

