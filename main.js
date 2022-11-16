status = "";
objects = [];
//var SpeechRecognition = window.webkitSpeechRecognition;
//var recognition = new SpeechRecognition();
//speech = new SpeechSynthesisUtterance();
//speak = document.getElementById("search").value;

text_input_value = "";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
    
}


function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    text_input_value = document.getElementById("search").value;
    document.getElementById("status").innerHTML = "status: Detecting object";
    //text_input_value = document.getElementById("search").value;

}

function draw() {
    image (video,0,0,480,380);

    if ( status != "") {
        objectDetector.detect( video, gotResults);
        for (i = 0; i < objects.length; i++) {
           
            percent = floor(objects[i].confidence * 100);
            text ( objects[i].label + " " + percent +  "%",objects[i].x , objects[i].y );
            noFill();
            stroke ("#FF0000");
            rect (objects[i].x - 15 , objects[i].y - 15 , objects[i].width , objects[i].height);

            if(objects[i].label ==  text_input_value){
                video.stop();
                document.getElementById("status").innerHTML  =  text_input_value + "  Found  ";
               
              //objectDetector.detect(gotResults);
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(text_input_value + "Found");
              synth.speak(utterThis);

             }
             else{
                document.getElementById("status").innerHTML  =  text_input_value + " Not Found  ";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(text_input_value + "Not Found");
                synth.speak(utterThis);
             }
            
        }
    } 
  
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

