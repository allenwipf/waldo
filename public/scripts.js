window.addEventListener("load", function(){

    pageLoad = window.event.timeStamp;

    function addImageClickListener(){

        document.getElementById("waldoImage").addEventListener("click", clickImage);
    }

    function closeModalBox(){

        document.getElementById("myModal").addEventListener("click", closeModal);

    }

  addImageClickListener();
  closeModalBox();


});


function clickImage(e){

    var ourRequest = new XMLHttpRequest();

    var params = "offsetX=" + e.offsetX + "&offsetY=" + e.offsetY;
    ourRequest.open('POST', '/', true);

    //Send the proper header information along with the request
    ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ourRequest.onreadystatechange = function(){
  
        if (ourRequest.responseText == 'true'){

             profileView(e)
        }
    };

    ourRequest.send(params);
}


// function verifyClick(e){

//     var getRequest = new XMLHttpRequest();
//     getRequest.open('GET', 'http://localhost:4567/data');

//     getRequest.onload = function() {
  
//     //var ourData = JSON.parse(getRequest.responseText);
  
//     myData = getRequest.responseText

//     console.log(myData)
    
 
//     if (myData ==  'true'){
//         profileView(e)  
//     }

//     };


//     // getRequest.send()
// }


function profileView(e){
  
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

}






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








