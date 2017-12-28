var animals = ['Dog', 'Cat', 'Shark', 'Dove','Caiman','Bat', 'Coyote','Armadillo', 'Octopus', 'Squirrel', 'Piranha', 'Raccoon', 'Toucan', 'Rhinoceros', 'Seal', 'Shrimp' ]

buildScreen()
renderButtons()
// json()

// --Buiding the main Screen--------------------------------------------------------

function buildScreen() {
  $('#mainContainer').empty()
  var div = $('<div>');
  div.attr('id', 'topContainer');
  $('#mainContainer').append(div)
  div.addClass('topContainerClass')
  div.addClass('border')

  var div2 = $('<div>');
  div2.attr('id', 'leftContainer');
  $('#mainContainer').append(div2)
  div2.addClass('leftContainerClass')
  div2.addClass('border')

  var div3 = $('<div>');
  div3.attr('id', 'rightContainer');
  $('#mainContainer').append(div3)
  div3.addClass('rightContainerClass')
  div3.addClass('border')
  $('#rightContainer').html('<h2>' + 'Add an Animal' + '</h2>');

  var inputAnimal = $('<input/>', {
    type: 'text',
    id: 'inputAnimal',
    name: 'animal',
    placeholder: 'Add a new animal'
  })
  inputAnimal.addClass('inputNewAnimal');
  $('#rightContainer').append(inputAnimal);
  var button = $('<button> submit </button>');
  button.attr('id', 'addAnimal')
  $('#rightContainer').append(button)
  button.addClass('button')
}

// ---Function to create a new button-------------------------------------------

function renderButtons() {
  $('#topContainer').empty();
  for (var i = 0; i < animals.length; i++) {
    var buttons = $('<button>');
    buttons.addClass('buttonAnimal');
    buttons.attr('data-animal', animals[i]);
    buttons.text(animals[i]);
    $('#topContainer').append(buttons);
  }
}

// ---On click event to submit a new Animal-------------------------------------
$('#addAnimal').on('click', function(event) {
  console.log('addAnimalButton - Clicked');
  event.preventDefault();
  var animal = $('#inputAnimal').val().trim();
  console.log('Var animal' + animal);
  animals.push(animal);
  console.log('array animals: ' + animals);
  // debugger
  renderButtons();
});

// ---On click funtion to trigger the AJAX call---------------------------------
  $(".buttonAnimal").on("click", function(e) {
    var animal = $(this).attr("data-animal");
    console.log('var animal2' + animal);
    
    $('#leftContainer').empty()

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=KQArEbz4Mo7IXNJzhI2oWZUJZx8YkTwB&limit=10";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);

      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        animalDiv.addClass('animalSubcontainer')
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        animalImage.addClass("gif")
        console.log('log var animalImage :' + animalImage);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#leftContainer").prepend(animalDiv);
      }
    });
  })

// --On click event to start and pause the gif-----------------------------------

$(".gif").on("click", function(e) {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
