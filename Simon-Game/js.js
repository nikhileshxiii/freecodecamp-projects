$(document).ready(function() {


  const RED = "RED";
  const GREEN = "GREEN";
  const YELLOW = "YELLOW";
  const BLUE = "BLUE";

  var strict = 0;
  var count = 0;
  var timerCount=0;
  var color = "";
  var create_sequence = [];
  var sequence = [];
  var done = 0;
  var denom = 1;
  var sounds = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  ];


  var randomColor = function() {
    var selector = Math.floor(Math.random() * 4);
    var color = [RED, GREEN, YELLOW, BLUE][selector];
    var sound = new Audio(sounds[selector]);
    return color;
  };

  var pushColor = function() {
    sequence.push(randomColor());
    console.log(sequence);
    var seq_id = sequence.length-1;
    var normalcolor = sequence[seq_id].toLowerCase();
    var lightcolor = "light"+sequence[seq_id].toLowerCase();
    $("#"+sequence[seq_id]).removeClass(normalcolor);
    $("#"+sequence[seq_id]).addClass(lightcolor);
    window.setTimeout(function(){
      $("#"+sequence[seq_id]).removeClass(lightcolor);
      $("#"+sequence[seq_id]).addClass(normalcolor);
    }, 1000);
    console.log("done");
  };



  var insertWithTimer = function() {
    if (count === 0) {
      pushColor();
      count++;
      document.getElementById("text-id").innerHTML = count;
    } else {
      var timerF = setInterval(function() {
        pushColor();
        if( timerCount == count ){
          clearInterval(timerF);
        }
        timerCount++;
      }, 1000);
      timerCount = 0;
      count++;
      document.getElementById("text-id").innerHTML = count;
    }
  };

  var colorCheck = function(COLOR) {
    if (COLOR == sequence[0]) {
      sequence.shift();
      console.log("CORRECT");
      $("text-id").text(count);
    } else {
      console.log("INCORRECT");
      if (strict === 1) {
        sequence = [];
        count = 0;
        document.getElementById("text-id").innerHTML = count;
      }
    }
  };

  var checker = function(id) {
    if (sequence.length === 0) {
      alert("Sequence is empty");
    } else{
      colorCheck(id);
    }
  };

  $("#stat").on("click", function() {
    var stat = $("#stat").html();
    if (stat === "OFF") {
      $("#start").hide();
      $("#strict").hide();
      stat = "ON";
    } else {
      $("#start").show();
      $("#strict").show();
      stat = "OFF";
    }
    $("#stat").html(stat);
  });

  $("#strict").on("click", function() {
    if (strict === 1) {
      $("#strict")
        .removeClass("btn-secondary")
        .addClass("btn-warning");
      strict = 0;
    } else if (strict === 0) {
      $("#strict")
        .removeClass("btn-warning")
        .addClass("btn-secondary");
      strict = 1;
    }
  });

  $("#start").on("click", function() {
    if (sequence.length === 0) {
      console.log("Empty sequence, inserting colors");
      insertWithTimer();
    } else {
      insertWithTimer();
    }
  });

  $(".color-button").on("click", function() {
    var idx = $(this).attr("id");
    checker(idx);
    console.log(idx);
    if(sequence.length === 0){
        insertWithTimer();
    }
    if(idx === "RED"){
      sounds[0].play();
    }
    else if(idx === "GREEN"){
      sounds[1].play();
    }
    else if(idx === "YELLOW"){
      sounds[2].play();
    }
    else if(idx === "BLUE"){
      sounds[3].play();
    }
  });
});
