// Declaring global variables 

// initial gif arrary 

var gifs = ["sailor moon", "inuyasha", "pokemon", "tokyo ghoul", "attack on titans", "castle in the sky", "your name"];


$(document).on("click", ".gif", function () {

  var gifInfo = $(this).attr('data-name')

  // Constructing a URL to search GIPHY for the user input 

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifInfo + "&api_key=IULgPyyWW0mmxcyH0UIJtbs1vAw4jfz5&limit=10";

  // API_KEY = "&api_key=IULgPyyWW0mmxcyH0UIJtbs1vAw4jfz5";

  // Performing our AJAX GET request

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      //testing
      console.log(response);
      // storing an array of results in the results variable 
      var results = response.data;

      // creating a DIV for the gif 
      var gifDiv = $("<div>");
      gifDiv.addClass("gifs");


      // for loop over every result item 
      for (var i = 0; i < results.length; i++) {

        // grabbing the gifs with ratings 
        // if (results[i].rating === "r" && results[i].rating === "pg-13" && results[i].rating === "pg" && results[i].rating === "g") {


        // storing the rating results item's rating 
        var rating = results[i].rating;

        // creating p tag for the ratings 
        var p = $("<p>").text("Rating: " + rating);

        // creating image tag 
        var gifImg = $("<img>");

        // Image tag with src attr 
        gifImg.attr("src", results[i].images.fixed_height.url);

        // APPEND the paragraph and gifImg to "gifDiv"
        gifDiv.append(p);
        gifDiv.append(gifImg);


        // prepending the gifDiv to the "container" div in the html 
        $("#gif-dump").prepend(gifDiv);

        // }

      }


    });

});

// function for displaying gif data 
function renderButtons() {

  // delete the content inside the buttons-view div so there aren't any repeats 
  $("#buttons-view").empty();


  // loop through the gifs, generate buttons for each gif in the arrary 
  for (var j = 0; j < gifs.length; j++) {
    var button = $("<button>");
    button.addClass("gif");
    button.attr("data-name", gifs[j]);
    button.text(gifs[j]);

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


  // calling the renderbuttons function to display the initial list of gifs 
  renderButtons();


});

// STILL / ANIMATED FUNCTION 

$(".gif").on("click", function () {


  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }


});


// calling the renderbuttons function to display the initial list of gifs 
renderButtons();
// generic function for displaying gifInfo

// $(document).on("click", ".gif", displayGifInfo());