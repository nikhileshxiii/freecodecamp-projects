$(document).ready(function() {
  var channels = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];
  $.each(channels, function(i, channel) {
    $("#channel_list")
      .addClass("center")
      .append(channel + " <br>   ");
  });
  $("#buttons").append(
    '<button class="btn btn-success" id="online">online</button> <button class="btn btn-primary" id="all">all</button>'
  );

  function makeURL(type, name) {
    return (
      "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback?"
      // "?callback=?"
    );
  }
  var stream_urls = [];
  var channel_urls = [];
  for (var ch in channels) {
    stream_urls.push(makeURL("streams", channels[ch]));
    channel_urls.push(makeURL("channels", channels[ch]));
  }

  for (var i = 0; i < channels.length; i++) {
    $("#container").append('<div class="row" id="row' + i + '"/>');
    for (var j = 0; j < 3; j++) {
      $("#row" + i).append(
        '<div class="col-xs-3 col-md-3 col-lg-3 col" id="col' +
          i +
          j +
          '"><p>' +
          "col" +
          i +
          j +
          "</p></div>"
      );
    }
  }

  var displayer = function() {
    $.each(stream_urls, function(i, stream_url) {
      $.ajax({
        // url: "https://cors.io/?" + stream_url,
        url: stream_url,
        dataType: "jsonp",
        success: function(st) {

          if (st.stream === null) {
            $("#col" + i + "0")
              .empty()
              .append("N/A");
            $("#col" + i + "1")
              .empty()
              .append("Offline");
            $("#col" + i + "2")
              .empty()
              .append("N/A");
          } else if (st.stream === undefined) {
            $("#col" + i + "0")
              .empty()
              .append("N/A");
            $("#col" + i + "1")
              .empty()
              .append("Account Closed");
          } else {
            $("#col" + i + "0")
              .empty()
              .append('<img src="' + st.stream.preview.small + '"/>');
            $("#col" + i + "1")
              .empty()
              .append(st.stream.channel.game);
            $("#col" + i + "2")
              .empty()
              .append(
                '<a href="' +
                  st.stream.channel.url +
                  '" target="_blank"> ' +
                  st.stream.channel.status +
                  " </a>"
              );
          }
        }
      });
    });
  };
  displayer();

  var online = function() {
    // console.log("online");
    displayer();
    $('.col').each(function(i, data){
      // console.log("index = "+i+" "+"object "+$(this).text());
      if($(this).text() === "N/A" || $(this).text() === "Offline"){
        // console.log(this.id);
        document.getElementById(this.id).style.display = 'none';
        // this.id.addClass("hidden");
      }
    });

  };

  var all = function() {
    displayer();
    $('.col').each(function(i, data){
      // console.log("index = "+i+" "+"object "+$(this).text());
      if($(this).text() !== "N/A" || $(this).text() !== "Offline"){
        // console.log(this.id);
        document.getElementById(this.id).style.display = 'inline';
        // this.id.addClass("hidden");
      }
    });
  };
  $("button").on("click", function() {
    if (this.id === "all") {
      all();
    } else if (this.id === "online") {
      online();
    } else {
      offline();
    }
  });
});
