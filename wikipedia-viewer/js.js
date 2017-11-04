$(document).ready(function() {
  window_query = "https://en.wikipedia.org/wiki/Special:";
  url =
    "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json";

  // "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search";
  $("#search_button").on("click", function() {
    search_url = url + "&search=" + $("#search_bar").val() + "&origin=*";

    window_url = window_query + $("#search_bar").val();

    if ($("#search_bar").val() === "" || $("#search_bar").val().replace(/\s+/g, '') === "") {
      window_url = "http://en.wikipedia.org/wiki/Special:Random";
      $("#url_div").html(
        "<br><a href='" +
          window_url +
          "' target='_blank'>Click Here for random wikipedia page</a>"
      );
    } else {
      $("#url_div").html(
        "<br><a href='" +
          search_url +
          "' target='_blank'>Click Here for wikipedia JSON page for \"" +
          $("#search_bar").val() +
          '"</a>'
      );
    }
    //console.log(search_url);
    $.getJSON(search_url, function(resp) {
      $("#filler").empty();
      for (var i = 0; i < resp[1].length; i++) {
        $("#filler").append('<h1><a href='+resp[3][i]+' target = "_blank">'+resp[1][i]+'</a></h1>'+'<br>'+resp[2][i]);
      }
    });
  });
});
