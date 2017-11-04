$(document).ready(function(){

  $("#calc_buttons").append('<hr><button class="btn btn-danger" id="ce">CE</button>\
      <button class="btn btn-danger" id="ac">AC</button>\
      <button class="btn btn-primary" id="/">/</button>\
      <button class="btn btn-primary" id="*">*</button>\
      <br>');
  for(var i=1,j=0;i<10;i++){

    $("#calc_buttons").append('<button class="btn btn-primary" id="'+i+'">'+i+'</button>')
    if(i%3 === 0){
      if(j === 0){
        $("#calc_buttons").append('<button class="btn btn-primary" id="+">+</button><br>');
        j++;
      } else if(j === 1){
        $("#calc_buttons").append('<button class="btn btn-primary" id="-">-</button><br>');
        j++;
      } else{
        $("#calc_buttons").append('<button class="btn btn-primary" id=".">.</button><br>');
        j++;
      }
    }
  }
  // $("#spanElement").html("something");
  $("#calc_buttons").append('<button class="btn btn-primary" id="0">0</button>');
  $("#calc_buttons").append('<button class="btn btn-danger" id="=">=</button><br>');
  var inputs = [];
  var operators=["+","-","*","/"];
  var dot=["."]
  var numbers = [];
  for(var k=0;k<10;k++){
    numbers.push(k);
  }
  var update = function(){
    // console.log("updating");
    $("#spanElement").html(inputs.join(""));
    // console.log(inputs.join(""));
  }
  var result = function(){
    $('#spanElement').html(eval(inputs.join("")));
  }

  var getValue = function(input){
    if(operators.includes(inputs[inputs.length-1]) === true && operators.includes(input)) {
      console.log(inputs[inputs.length-1] + "at the end of previous exp!");
    }
    else if(dot.includes(inputs[inputs.length-1]) && dot.includes(input)){
      console.log(inputs[inputs.length-1] + "at the end of previous exp!");
    }
    else if(/[\.](\d*)?[\.]/.test(inputs.join(""))){
      console.log("2 dots in same number");
    }
    else{
      inputs.push(input);
      update();
    }
  }

  $('button').on('click', function(){
    // console.log(this.id);
    if(this.id === "ac"){
      inputs=[];
      update();
      // console.log(inputs.join(""));
    } else if(this.id === "ce"){
      inputs.pop();
      update();
      // console.log(inputs.join(""));
    } else if(this.id === "="){
      result();
      // console.log(inputs.join(""));
    } else{
      getValue(this.id);
      // console.log(inputs.join(""));
    }
  });

});
