$(document).ready(function() {
    //GLOBAL VARIABLES
    //==========================================
    var $input = $("#input");
    var $submit = $("#submit");
    var apiKey = "cPwppHfAMZT1FXo8kDJx0g06wS73zKUE";
    var inputVal = $input.val();
    var $imgBody = $(".img-body");
  
    // get input value when the user presses submit
    $submit.on("click", function(event) {
      event.preventDefault();
      $imgBody.empty();
      var inputVal = $input.val();
      getGiphys(inputVal);
      // Empties search box after the submit button is clicked.
      $input.val("");
    });
    //Make a get request to the giphy api with the input value
    function getGiphys(inputVal) {
      $.get(
        "https://api.giphy.com/v1/gifs/search?q=" +
          inputVal +
          "&api_key=" +
          apiKey +
          "&limit=10"
      ).then(function(data) {
        console.log(data); //make it so I can see json data
        var results = data.data;
        for (var i = 0; i < results.length; i++) {
          var gifImg = data.data[i].images.downsized.url; //problem I think
          createBox(gifImg);
        }
      });
    }
  
    function createBox(gifImg) {
      var $newImg = $("<img>");
      $newImg.attr("src", gifImg);
      $newImg.addClass("img-box");
      $imgBody.append($newImg);
    }
  });