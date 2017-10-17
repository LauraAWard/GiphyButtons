$(window).on( "load", function() { //make sure window has finished loading

       var topics = ["scarecrow", "clown", "monster", "frankenstein", "coffin", "basement", "asylum", "spooky", "crypt", "pumpkin",
       				 "haunted", "gravestone", "alien", "exorcism", "bats", "ghost", "werewolf", "zombie", "slasher", "poltergeist",
       				 "demonic", "vampire", "witch", "mummy", "skeleton", "cannibal", "jack-o-lantern", "satanic", "trick-or-treat" ];


    function displayGiphy() {

        var topicName = $(this).attr("topic-name");
        var resultCount = 10;
        var offSet = (Math.floor(Math.random() * (15)) + 1);
        var apiKey = "dc6zaTOxFJmzC";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + 
        				"&api_key=" + apiKey + "&limit=" + resultCount + "&offset=" + offSet;

        $.ajax({
	        url: queryURL,
	        method: "GET"
        }).done(function(response) {
         
 
	 		for (i = 0; i < resultCount; i++) {

		        var ratingData = response.data[i].rating;

		        var rating = $("<figcaption>");
		        
		        rating.addClass("rating");
		        rating.addClass(topicName + i);
		        rating.html("Rating: " + ratingData);
		
		        $("#images").prepend(rating);

		        var imageUrlS = response.data[i].images.fixed_height_still.url;
		        var imageUrlA = response.data[i].images.fixed_height.url;
		 
		        var topicImage = $("<img>");

		        topicImage.addClass("giphy");
		        topicImage.addClass(topicName + i);
		        topicImage.attr("src", imageUrlS);
		        topicImage.attr("alt", (topicName + i));
		        topicImage.attr("image-still", imageUrlS);
		        topicImage.attr("image-animate", imageUrlA);
		        topicImage.attr("image-state", "still");

		        $("#images").prepend(topicImage);

		    
		        $("." + (topicName + i)).wrapAll("<figure class='topic-fig'></figure>")
		    }    
          

        });
 
    }


    function displayButtons() {

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

        displayButtons();

        $("#topic-input").val("");

      });

    function animateGiphy() {
    
      	var state = $(this).attr("image-state");
     	if (state === "still") {
	        $(this).attr("src", $(this).attr("image-animate"));
	        $(this).attr("image-state", "animate");
      } else 
      	{
	        $(this).attr("src", $(this).attr("image-still"));
	        $(this).attr("image-state", "still");
      	}
	}

      $(document).on("click", ".topic", displayGiphy);

      displayButtons();

      $(document).on("click", ".giphy", animateGiphy);

});