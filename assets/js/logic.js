$(document).ready(function () {
    //GLOBAL VARIABLES
    //==========================================
    var $input = $("#input");
    var $submit = $("#submit");
    var apiKey = "cPwppHfAMZT1FXo8kDJx0g06wS73zKUE";
    var inputVal = $input.val();
    // var $imgBody = $(".img-body");
    var presetGifs = ["cats", "dogs", "Schitt's Creek", "Gronk", "banana", "Queen", "P!nk", "penguin", "Wendy McClendon-Covey", "Dan Levy", "Catherine O'Hara", "Seinfeld", "Michelle Obama", "Whitney Houston", "Ace Ventura", "dolphins", "Harry Potter", "Snape", "Dumbledore", "Sia", "Giraffe", "SNL", "squirrel", "baseball"];


    //Make a get request to the giphy api with the input value

    function getGiphys(inputVal) {
        console.log(inputVal);
        var url = "https://api.giphy.com/v1/gifs/search?q=" +
            inputVal +
            "&api_key=" +
            apiKey +
            "&limit=12";
        console.log(url)
        $.get(url).then(function (data) {
            console.log(data); //make it so I can see json data
            var results = data.data;
            $('.results').html('');

            for (var i = 0; i < results.length; i++) {
                var animatedImg = data.data[i].images.fixed_height.url; //reference the animated version
                var stillImg = data.data[i].images.fixed_height_still.url; //reference the still version
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifDiv = $('<div class=\"gif-item\">');
                // // createBox(stillImg, animatedImg);
                gifDiv.append(p);
                // gifDiv.append(stillImg);
                // $newImg.addClass("img-box");
                gifDiv.append(
                    createBox(animatedImg, stillImg)
                );
                console.log(gifDiv);
                $(".results").prepend(gifDiv);
                //console.log($('.results').html());

            }
        });
    }

    //TO DO: 
    //       Center the add button bar, and buttons.
    //       Repeat the background image, or add another one.
    //       Make it so the buttons show up in two rows when on a phone

    function renderButtons() {
        $("#newButtons").empty();
        for (var i = 0; i < presetGifs.length; i++) {
            console.log(presetGifs[i]);
            $("#newButtons").append("<button class='goGif'>" + presetGifs[i] + "</button>");

        }
    }

    renderButtons();
    $(document).on("click", ".goGif", function () {
        console.log(this + 'clicked')
        getGiphys($(this).text());
    });




    // get input value when the user presses submit
    $submit.on("click", function (event) {
        event.preventDefault();
        var showGif = $(this).attr("data-gif")
        $imgBody.empty();
        var inputVal = $input.val();

        // Empties search box after the submit button is clicked.
        $input.val("");
    });



    function createBox(animatedImg, stillImg) {
        var $newImg = $("<img>");
        $newImg.attr("src", stillImg);
        $newImg.attr("data-state", "still");
        $newImg.attr("data-still", stillImg);
        $newImg.attr("data-animated", animatedImg);
        $newImg.addClass("img-box");
        // $imgBody.append($newImg);
        return $newImg;
    }

    $(document).on("click", ".img-box", function () {

        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log(state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        console.log($(this).attr("src"));
    });

    $("#add-gif").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var newGif = $("#gif-input").val().trim();


        // Adding the movie from the textbox to our array
        presetGifs.push(newGif);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    })
});