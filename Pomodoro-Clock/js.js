$(document).ready(function() {
  $("#reset").hide();
  var break_val = parseInt($("#break_value").html());
  var session_val = parseInt($("#session_value").html());
  $("#session_time").html(session_val);
  $("#session_minus").on("click", function() {
    session_val = parseInt($("#session_value").html());
    if (session_val > 1) {
      session_val = session_val - 1;
      $("#session_value").html(session_val);
    }
  });

  $("#session_plus").on("click", function() {
    session_val = parseInt($("#session_value").html())+1;
    $("#session_value").html(session_val);
  });

  $("#break_minus").on("click", function() {
    break_val = parseInt($("#break_value").html());
    if (break_val > 1) {
      break_val = break_val - 1;
      $("#break_value").html(break_val);
    }
  });

  $("#break_plus").on("click", function() {
    break_val = parseInt($("#break_value").html()) + 1;
    $("#break_value").html(break_val);
  });

  $("#reset").on('click', function(){
    $("#session_value").html(25);
    $("#break_value").html(25);
    $("#start").show();
    $("#reset").hide();
    $("#type").html("");
  });

  $("#start").on('click', function(){
    $("#start").hide();
    var session = parseInt($("#session_value").html()) * 60;

    var counter = setInterval(function(){
      $("#type").html("Session");
      if(session <= 1){
        clearInterval(counter);
        var break_v = parseInt($("#break_value").html()) * 60;
        var breakTimer = setInterval(function(){
          $("#type").html("Break");
          if(break_v <= 1){
            clearInterval(breakTimer);
            $("#reset").show();
            $("#start").hide();
          }
          break_v -= 1;
          $("#session_time").html(Math.floor(break_v/60)+":"+((break_v%60)<10? ("0"+break_v%60) : break_v%60));
        },1000);
      }
      session -= 1;
      $("#session_time").html(Math.floor(session/60)+":"+((session%60)<10? ("0"+session%60) : session%60));


    },1000);
  });


});
