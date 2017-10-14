$(window).on( "load", function() { //make sure window has finished loading

       var topics = ["pizza", "cupcakes", "milkshake", "broccoli"];


      function displayGiphy() {

        var topicName = $(this).attr("topic-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName +  "&api_key=dc6zaTOxFJmzC&limit=10";
 		console.log(queryURL);

 		for (i = 0; i < 10; i++) {
         $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
         
        console.log(JSON.stringify(response));	
        var rating = $("<div>");

        var ratingData = response.data.rating;
        
        rating.attr("class", "rating");
 
        rating.html("Rating: " + ratingData);
        
        var imageUrl = response.data.images.fixed_height_still;

 
        var topicImage = $("<img>");


        topicImage.attr("src", imageUrl);
        topicImage.attr("alt", "giphy");


        $("#images").append(topicImage);
        $("#images").append(rating);
          

        });
} 
      }


      function renderButtons() {

         $("#buttons-view").empty();

         for (var i = 0; i < topics.length; i++) {


          var topicBtn = $("<button>");

          topicBtn.addClass("topic");

          topicBtn.attr("topic-name", topics[i]);

          topicBtn.text(topics[i]);

          $("#buttons-view").append(topicBtn);
        }
      }

      $("#add-topic").on("click", function(event) {
        event.preventDefault();

        var topic = $("#topic-input").val().trim();

        topics.push(topic);

        renderButtons();

      });

      $(document).on("click", ".topic", displayGiphy);

      renderButtons();

});