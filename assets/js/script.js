var formEl = document.querySelector("#form");

var buttonHandler = function (e) {
    // form submit button is pressed
    if (e.target.id === "submit-form") {
        var foodToFind = getSearchStatus();
        createSearchResultsEl();
        console.log(foodToFind);
    } else
    // delete food type that was selected from appearing in results
    if (e.target.name === "delete-food-type") {
        // contained in foodFilterHandler.js
        deleteFoodType(e);
    }
}

var createSearchResultsEl = function () {
    var resultsAreaEl = document.getElementById('search-results');
    
    var restarauntCard = document.createElement("div");
    restarauntCard.classList = "card";

    var restarauntImage = document.createElement("div");
    restarauntImage.classList = "card-image";
    var imgFigure = document.createElement("figure");
    imgFigure.classList = "image";
    var imageSrc = document.createElement("img");
    imageSrc.setAttribute('src', './././images/food-guidelines-1.jpg');
    imgFigure.appendChild(imageSrc);
    restarauntImage.appendChild(imgFigure);

    var restarauntContent = document.createElement("div");
    restarauntContent.classList = "card-content";

    var media = document.createElement("div");
    media.classList = "media";
    var mediaContent = document.createElement("div");
    mediaContent.classList = "media-content";
    var mediaContentTitle = document.createElement("p");
    mediaContentTitle.classList = "title is-10"
    mediaContentTitle.textContent = "Restaraunt Name";
    mediaContent.appendChild(mediaContentTitle);
    media.appendChild(mediaContent);
    restarauntContent.appendChild(media);
    
    var cardContent = document.createElement("div");
    cardContent.className = "content";
    cardContent.textContent = "Here's information about the restaraunt";
    restarauntContent.appendChild(cardContent);

    restarauntCard.appendChild(restarauntImage);
    restarauntCard.appendChild(restarauntContent);
    resultsAreaEl.appendChild(restarauntCard);

}

var getSearchStatus = function () {
    if (foodOptionsSelected.length === 0) {
        foodOptionsSelected = listOfFoodOptions;
    }
    var searchConditions = {
        city: document.querySelector("#city-search").value,
        dollarAmount: {
            oneDollar: document.querySelector("input[name='one-dollar']").checked,
            twoDollar: document.querySelector("input[name='two-dollar']").checked,
            threeDollar: document.querySelector("input[name='three-dollar']").checked,
            fourDollar: document.querySelector("input[name='four-dollar']").checked
        },
        typeOfFood: foodOptionsSelected
    }

    return searchConditions;
}

// handle actions from various buttons that are clicked
formEl.querySelector("button").addEventListener("click", function(e) {  
    e.preventDefault();
    buttonHandler(e);
});
foodAddedEl.addEventListener("click", function(e) {
    e.preventDefault();
    buttonHandler(e);
});

// populate the list of food that can be filtered by user
// contained in foodFilterHandler.js
listOfFoodOptions.forEach(element => {
    createFoodTypeOptions(element);
});