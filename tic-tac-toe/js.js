$(document).ready(function() {
  var done = 0;
  var player = "X";
  var playerX = [];
  var playerO = [];
  var marked = [];
  var count = 0;
  var winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  var createBoard = function() {
    $("#container").empty();
    for (var el = 0; el < 9; el++) {
      marked[el] = "no";
    }

    for (var k = 0; k < 3; k++) {
      $("#container").append('<div class="row" id="row' + k + '"></div>');
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 9; j++) {
        if (i === 0 && j < 3) {
          $("#row" + i).append(
            '<div class="col btn btn-primary cell" id="' + j + '"></div>'
          );
        } else if (i === 1 && j > 2 && j < 6) {
          $("#row" + i).append(
            '<div class="col btn btn-primary cell" id="' + j + '"></div>'
          );
        } else if (i === 2 && j > 5) {
          $("#row" + i).append(
            '<div class="col btn btn-primary cell" id="' + j + '"></div>'
          );
        }
      }
    }
  };

  var callBoard = function() {
    createBoard();
  };

  callBoard();

  $(".cell").on("click", function() {
    var id = $(this).attr("id");
    if (marked[id] === "no") {
      document.getElementById(id).innerText = player;
      ++count;
      marked[id] = player;
      player = player === "X" ? (player = "O") : (player = "X");

      if (marked[id] === "X") {
        playerX.push(id);
      } else if (marked[id] === "O") {
        playerO.push(id);
      }

      if (playerX.length >= 3 || playerO.length >= 3) {
        for (var el in winCombos) {
          var a = winCombos[el].join();
          var b = Array.from(playerX).join();
          var c = Array.from(playerO).join();

          if (
            a.length <= b.length &&
            b.includes(a[0]) && b.includes(a[2]) && b.includes(a[4])
          ) {
            console.log(a + "  " + b + "  " + c);
            console.log(a.length === b.length);
            console.log(a.includes(b[0]) + " a=" + a + " b0=" + b[0]);
            console.log(a.includes(b[2]) + " a=" + a + " b2=" + b[2]);
            console.log(a.includes(b[4]) + " a=" + a + " b4=" + b[4]);
            console.log(a.includes(b[6]) + " a=" + a + " b6=" + b[6]);
            console.log(a.includes(b[8]) + " a=" + a + " b8=" + b[8]);
            console.log("PlayerX won");
            alert("PlayerX won");
            done = 1;
            break;
          } else if (
            a.length <= c.length &&
            c.includes(a[0]) && c.includes(a[2]) && c.includes(a[4])
          ) {
            console.log(a + "  " + b + "  " + c);
            console.log(a.length === c.length);
            console.log(a.includes(c[0]) + " a=" + a + " c0=" + c[0]);
            console.log(a.includes(c[2]) + " a=" + a + " c2=" + c[2]);
            console.log(a.includes(c[4]) + " a=" + a + " c4=" + c[4]);
            console.log(a.includes(c[6]) + " a=" + a + " c6=" + c[6]);
            console.log("PlayerO won");
            alert("PlayerO won");
            done = 2;
            break;
          }
        }
        if (done === 1) {
          $("#container").empty();
          $("#container").append("playerX won");
        } else if (done === 2) {
          $("#container").empty();
          $("#container").append("playerO won");
        }
      }
    } else {
      console.log("marked");
    }
    if (count === 9) {
      console.log("Game over");
      alert("Game Over");
      $("#container").empty();
      $("#container").append("Draw match");
    }
  });
});
