// Declaring global variables 

// initial gif arrary 

var gifs = ["sailor moon", "inuyasha", "pokemon", "attack on titans", "howls moving castle", "castle in the sky", "your name"];


$("button").on("click", function() {


var gifInfo = $(this).attr("data-gif");

  // Constructing a URL to search GIPHY for the user input 

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifInfo + "&api_key=IULgPyyWW0mmxcyH0UIJtbs1vAw4jfz5"; 

// API_KEY = "&api_key=IULgPyyWW0mmxcyH0UIJtbs1vAw4jfz5";

// Performing our AJAX GET request

$.ajax({
    url: queryURL,
    method: "GET"
  })

  // after the data comes back from the API
  .then(function (response) {

    // storing an array of results in the results variable 
    var results = response.data;

    // for loop over every result item 
    for (var i = 0; i < results.length; i++) {

      // grabbing the gifs with ratings 
      if (results[i].rating === "r" && results[i].rating === "pg-13" && results[i].rating === "pg" && results[i].rating === "g") {

        // creating a DIV for the gif 
        var gifDiv = $("<div>");

        // storing the rating results item's rating 
        var rating = results[i].rating;

        // creating p tag for the ratings 
        var p = $("<p>").text("Rating: " + rating);

        // creating image tag 
        var gifImg = $("<img>");


        // Image tag with src attr 
        gifImg.attr("src", results[i].images.fixed_heigh.url);

        // APPEND the paragraph and gifImg to "gifDiv"
        gifDiv.append(p);
        gifDiv.append(gifImg);


        // prepending the gifDiv to the "container" div in the html 
        $("#gifs-here").preprend(gifDiv);

      }

    }

  }); 

    // function for displaying gif data 
    function renderButtons() {

      // delete the content inside the buttons-view div so there aren't any repeats 
      $("buttons-view").empty();

      // loop through the gifs, generate buttons for each gif in the arrary 
      for (var j = 0; j < gifs.length; j++) {
        var button = $("<button>");
        button.text(gifs[i]);

        $("#buttons-view").append(button);

      }

    }
    // function handles evenet where the add gif button is clicked 

    $("#add-gif").on("click", function (event) {

      // prevents submit button from trying to send a form 

      event.preventDefault();

      // code that grabs the text from the input field 

      var userText = $("#gif-input").val().trim();


      gifs.push(userText);

    })

    // calling the renderbuttons function to display the initial list of gifs 
    renderButtons();
  });

