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

var favoriteRestarauntHandler = function () {  
    var restaraunt = event.target;
    if (event.type === "mouseenter") {
        if (restaraunt.classList.contains("fa-regular")) {
            // when star is hovered, show user it can be favorited
            restaraunt.classList.remove("fa-regular");
            restaraunt.classList.add("fa-solid");
        }
        // do nothing if the class is already solid
    } else 
    if (event.type === "mouseleave") {
        if (restaraunt.classList.contains("fa-solid") && restaraunt.getAttribute("favorite") === 'false') {
            // when mouse leaves, change back to not solid
            restaraunt.classList.remove("fa-solid");
            restaraunt.classList.add("fa-regular");
        }
    } else 
    if (event.type === "click") {
        if (restaraunt.getAttribute('favorite') === 'true') {
            restaraunt.setAttribute('favorite', false);
            // removeFromSaved(restaraunt);
        } else {
            restaraunt.setAttribute('favorite', true);
            // saveToFavorites(restaraunt);
        }
    }
};

var createSearchResultsEl = function () {
    var resultsAreaEl = document.getElementById('search-results');
    // main card
    var restarauntCard = document.createElement("div");
    restarauntCard.classList = "card";

    // card image at the top
    var restarauntImage = document.createElement("div");
    restarauntImage.classList = "card-image";
    var imgFigure = document.createElement("figure");
    imgFigure.classList = "image";
    var imageSrc = document.createElement("img");
    imageSrc.setAttribute('src', './././images/food-guidelines-1.jpg');
    imgFigure.appendChild(imageSrc);
    restarauntImage.appendChild(imgFigure);

    // card content under image
    var restarauntContent = document.createElement("div");
    restarauntContent.classList = "card-content";

    // top of card content (restaraunt name and favorite button)
    var media = document.createElement("div");
    media.classList = "media";
    var mediaContent = document.createElement("div");
    mediaContent.classList = "media-content icon is-medium";
    var favoriteRestaraunt = document.createElement("i");
    favoriteRestaraunt.classList = "favorite-button fa-regular fa-star fa-2x";
    favoriteRestaraunt.setAttribute('onmouseenter', 'favoriteRestarauntHandler()');
    favoriteRestaraunt.setAttribute('onmouseleave', 'favoriteRestarauntHandler()');
    favoriteRestaraunt.setAttribute('onclick', 'favoriteRestarauntHandler()');
    favoriteRestaraunt.setAttribute('favorite', false);
    var mediaContentTitle = document.createElement("p");
    mediaContentTitle.classList = "title is-10"
    mediaContentTitle.textContent = "Restaraunt Name";
    mediaContent.appendChild(favoriteRestaraunt);
    mediaContent.appendChild(mediaContentTitle);
    media.appendChild(mediaContent);
    restarauntContent.appendChild(media);

    // main card content under header
    var cardContent = document.createElement("div");
    cardContent.className = "content";
    cardContent.textContent = "Here's information about the restaraunt";
    //-- create review stars
    var reviewContainer = document.createElement("div");
    reviewContainer.textContent = "Number of stars: ";
    var stars = 3;
    var halfStar = true;
    for (var i = 0; i < stars; i++) {
        var star = document.createElement("i");
        star.classList = "fa-solid fa-star";
        reviewContainer.appendChild(star);
    }
    if ((5-stars) > 0) {
        if (halfStar) {
            var star = document.createElement("i");
            star.classList = "fa-solid fa-star-half-stroke";
            reviewContainer.appendChild(star);
        }
        for (var i = 0; i < (4-stars); i++) {
            var star = document.createElement("i");
            star.classList = "fa-regular fa-star";
            reviewContainer.appendChild(star);
        }
    }
    var hoursOfOperation = document.createElement("div");
    hoursOfOperation.textContent = "Hours: 12PM - 10PM M-F";
    var cuisineType = document.createElement("div");
    cuisineType.textContent = "Cuisine type: American, comfort";
    cardContent.appendChild(reviewContainer);
    cardContent.appendChild(hoursOfOperation);
    cardContent.appendChild(cuisineType);
    restarauntContent.appendChild(cardContent);

    // append image, header, and main content to card div
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