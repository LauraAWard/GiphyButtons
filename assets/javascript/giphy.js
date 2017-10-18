$(window).on( "load", function() { //make sure window has finished loading

       var topics = ["scarecrow", "clown", "monster", "frankenstein", "dracula", "basement", "asylum", "spooky", "crypt", "pumpkin",
       				 "haunted", "gravestone", "alien", "exorcism", "bats", "ghost", "werewolf", "zombie", "slasher", "halloween",
       				 "demonic", "vampire", "witch", "mummy", "skeleton", "cannibal", "jack-o-lantern", "satanic", "trick-or-treat" ];

    function displayGiphy() {

        //Get topic from button clicked
        var topicName = $(this).attr("topic-name");
 
        //replace spaces with + for API query string
        if(topicName.indexOf(" ") > -1) {
        	topicName = topicName.split(" ").join("+");
        }

        //limit results to 10
        var resultCount = 10; 
        //adding a random offset so the giphys returned aren't always the same
        var offSet = (Math.floor(Math.random() * (50)) + 1); 
        var apiKey = "dc6zaTOxFJmzC";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + 
        				"&api_key=" + apiKey + "&limit=" + resultCount + "&offset=" + offSet;
        				console.log(queryURL);
        $.ajax({
	        url: queryURL,
	        method: "GET"
        }).done(function(response) {
         
      //loop through the array of results returned
	 		for (i = 0; i < resultCount; i++) {

	 			//replace + with - for use as class name
        		if(topicName.indexOf("+") > -1) {
        			topicName = topicName.split("+").join("-");
        		}
            //getting the rating info from API JSON and assigning to variable
		        var ratingData = response.data[i].rating;

            //creating a figcaption element for the rating data
		        var rating = $("<figcaption>");
		        
		        rating.addClass("rating");
		        //assigning same class to this and the image to link them
            rating.addClass(topicName + i);
		        rating.html("Rating: " + ratingData);
            
            //prepending the rating figcaption element to the DOM images div	
		        $("#images").prepend(rating);

            //getting the still and animated giphy urls, fixed size, from the
            // API JSON and assigning variables  
		        var imageUrlS = response.data[i].images.fixed_height_still.url;
		        var imageUrlA = response.data[i].images.fixed_height.url;
		 
		        //creating an image element for the giphy image
            var topicImage = $("<img>");

		        topicImage.addClass("giphy");
            //assigning same class to this and the figcaption to link them
		        topicImage.addClass(topicName + i);
            //setting the initial url of the giphy image with still image
		        topicImage.attr("src", imageUrlS);
		        topicImage.attr("alt", (topicName + i));
		        //assigning an attribute to hold the still image source
            topicImage.attr("image-still", imageUrlS);
		        //assigning an attribute to hold the animated image source
            topicImage.attr("image-animate", imageUrlA);
		        //setting the initial state of the giphy image as still
            topicImage.attr("image-state", "still");

            //prepending the image element to the DOM images div, which places
            //it above the corresponding figcaption  
		        $("#images").prepend(topicImage);

            //creating a new value to use as a class for the combined
            //figcaption & image pair
		    	  var giphySet = (topicName + "-" + i);

		    	  //selecting the <img> and <figcaption> tags by class and wrapping them in a <figure> tag to keep 
		    	  //them bound together even if the inline-block wraps to the next line
		        $("." + (topicName + i)).wrapAll("<figure class='topic-fig' " + giphySet + "'></figure>");

		        //Removing the class from <img> and <figcaption> so the elements don't get selected and wrapped  
		        //in a figure tag again by the above wrapAll() line the next time the same topic button is pressed
		        $("." + (topicName + i)).removeClass(topicName + i);
		    }    
 		        
        });
 
    }


    function displayButtons() {

        //clearing out any previous data from buttons-view div
       	$("#buttons-view").empty();

        //looping through the topics array
        for (var i = 0; i < topics.length; i++) {

	        //create a new button
          var topicBtn = $("<button>");

	        topicBtn.addClass("topic");
          //add a class with the value of the topic name string
	        topicBtn.attr("topic-name", topics[i]);
          //display the topic string as the button text
	        topicBtn.text(topics[i]);
          //append the button to the buttons-view div
	        $("#buttons-view").append(topicBtn);
        }
    }
    //event listener on the button to add new topics
    $("#add-topic").on("click", function(event) {
        //prevent the form button from opening new page
        event.preventDefault();
        //get the new topic from the text box entry
        var topic = $("#topic-input").val().trim();
        //add the new topic to the topics array
        topics.push(topic);

        displayButtons();
        //after the topic has been added, clear out data from the text box entry
        $("#topic-input").val("");

      });

    function animateGiphy() {
        
        //get the current image state of the giphy image when clicked
      	var state = $(this).attr("image-state");
     	if (state === "still") {
          //if the current state is still, change the image src to the animated url
	        $(this).attr("src", $(this).attr("image-animate"));
          //if the current state is still, change the image state to animate
	        $(this).attr("image-state", "animate");
      } else 
      	{
          //if the current state is animate, change the image src to the still url
	        $(this).attr("src", $(this).attr("image-still"));
          //if the current state is animate, change the image state to still
	        $(this).attr("image-state", "still");
      	}
	}
      //event listener for the topic buttons
      $(document).on("click", ".topic", displayGiphy);

      displayButtons();
      //event listener for the giphy images
      $(document).on("click", ".giphy", animateGiphy);

});