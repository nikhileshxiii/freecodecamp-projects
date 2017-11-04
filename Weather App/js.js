$(document).ready(function() {
  if ("geolocation" in navigator) {
    //console.log("geolocation is available");
    navigator.geolocation.getCurrentPosition(function(position) {
      var units_mode = "F";
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      function myMap() {
        var mapProp = {
          center: new google.maps.LatLng(lat, lon),
          zoom: 5
        };
        var map = new google.maps.Map(
          document.getElementById("googleMap"),
          mapProp
        );
      }

      document.getElementById(
        "latitude"
      ).innerHTML = position.coords.latitude.toFixed();
      document.getElementById(
        "longitude"
      ).innerHTML = position.coords.longitude.toFixed(2);
      var myRequest = new Request(
        "https://api.weather.gov/points/" + lat + "," + lon
      );
      //console.log(myRequest.url);

      $.getJSON(myRequest.url, function(data) {
        $("#timezone").html(data.properties.timeZone);
        // console.log(data.properties);
        $("#location").html(
          data.properties.relativeLocation.properties.city +
            ", " +
            data.properties.relativeLocation.properties.state
        );
        $("#weather").html(
          data.properties.relativeLocation.properties.distance.value.toFixed(
            2
          ) +
            " m" +
            "<br>" +
            data.properties.relativeLocation.properties.bearing.value +
            " °F"
        );
        units_mode = "F";
      });

      $("#change").click(function() {
        if (units_mode == "F") {
          $.getJSON(myRequest.url, function(data) {
            $("#timezone").html(data.properties.timeZone);
            // console.log(data.properties);
            $("#weather").html(
              data.properties.relativeLocation.properties.distance.value.toFixed(
                2
              ) +
                " m" +
                "<br>" +
                ((data.properties.relativeLocation.properties.bearing.value -
                  32) /
                  180 *
                  100
                ).toFixed(2) +
                " °C"
            );
            units_mode = "C";
          });
        } else {
          $.getJSON(myRequest.url, function(data) {
            $("#timezone").html(data.properties.timeZone);
            // console.log(data.properties);
            $("#weather").html(
              data.properties.relativeLocation.properties.distance.value.toFixed(
                2
              ) +
                " m" +
                "<br>" +
                data.properties.relativeLocation.properties.bearing.value +
                " °F"
            );
            units_mode = "F";
          });
        }
      });

      var forecast_url = myRequest.url + "/forecast";

      var forecast_request = new Request(forecast_url);
      console.log("Forecast " + forecast_request.url);
      $.getJSON(forecast_request.url, function(data) {
        // console.log(data.properties.periods[0].shortForecast);
        if (
          data.properties.periods[0].shortForecast ==
            "Showers And Thunderstorms" ||
          data.properties.periods[0].shortForecast ==
            "Slight Chance Showers And Thunderstorms then Mostly Clear"
        ) {
          console.log(data.properties.periods[0].shortForecast);
          $("body").css(
            "background-image",
            "url(http://vunature.com/wp-content/uploads/2016/11/sky-clouds-lightning-nature-storm-rain-thunderstorm-image-beautiful.jpg)"
          );
        } else if (
          data.properties.periods[0].shortForecast == "Sunny" ||
          data.properties.periods[0].shortForecast == "Mostly Sunny"
        ) {
          console.log(data.properties.periods[0].shortForecast);
          $("body").css(
            "background-image",
            "url(http://eskipaper.com/images/sunshine-wallpaper-15.jpg)"
          );
        } else if (
          data.properties.periods[0].shortForecast == "Partly Cloudy" ||
          data.properties.periods[0].shortForecast == "Partly Sunny"
        ) {
          console.log(data.properties.periods[0].shortForecast);
          $("body").css(
            "background-image",
            "url(https://i.pinimg.com/originals/83/ca/0b/83ca0bba91f42a2caf59abcb7cccd3b9.jpg)"
          );
        } else {
          console.log("Someking of new weather");
        }
      });
    });
  }
});
