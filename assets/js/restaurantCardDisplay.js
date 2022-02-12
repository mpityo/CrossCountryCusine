var restaurantData = [];

var favoriterestaurantHandler = function (city) {  
    var restaurant = event.target;
    if (event.type === "mouseenter") {
        if (restaurant.classList.contains("fa-regular")) {
            // when star is hovered, show user it can be favorited
            restaurant.classList.remove("fa-regular");
            restaurant.classList.add("fa-solid");
        }
        // do nothing if the class is already solid
    } else 
    if (event.type === "mouseleave") {
        if (restaurant.classList.contains("fa-solid") && restaurant.getAttribute("favorite") == 'false') {
            // when mouse leaves, change back to not solid
            restaurant.classList.remove("fa-solid");
            restaurant.classList.add("fa-regular");
        }
    } else 
    if (event.type === "click") {
        if (restaurant.getAttribute('favorite') === 'true') {
            restaurant.setAttribute('favorite', false);
            removeFromSaved(JSON.parse(restaurant.getAttribute('info')));
        } else {
            restaurant.setAttribute('favorite', true);
            saveToFavorites(restaurant.getAttribute('city'), restaurantData[restaurant.getAttribute('index')]);
        }
    }
};

var createSearchResultElement = function (infoToAdd, index, favorite) {
    var resultsAreaEl = document.getElementById('search-results-container');
    // main card
    var restaurantCard = document.createElement("div");
    restaurantCard.classList = "card column is-5-tablet is-4-desktop is-3-widescreen is-one-fifth-fullhd";

    // card image at the top
    var restaurantImage = document.createElement("div");
        restaurantImage.classList = "card-image";
    var imgFigure = document.createElement("figure");
        imgFigure.classList = "image";
    var imageSrc = document.createElement("img");
        imageSrc.setAttribute('src', '././assets/images/card_title.jpg');
    imgFigure.appendChild(imageSrc);
    restaurantImage.appendChild(imgFigure);

    // card content under image
    var restaurantContent = document.createElement("div");
        restaurantContent.classList = "card-content";

    // top of card content (restaurant name and favorite button)
    var media = document.createElement("div");
        media.classList = "media";
        // star on left to favorite restaurant
    var favoriterestaurantContainer = document.createElement("div");
        favoriterestaurantContainer.classList = "media-left";
    var favoriterestaurant = document.createElement("i");
        favoriterestaurant.setAttribute('favorite', favorite);
        favoriterestaurant.classList = getFavoriteIconStatus(favorite);
        favoriterestaurant.setAttribute('onmouseenter', 'favoriterestaurantHandler()');
        favoriterestaurant.setAttribute('onmouseleave', 'favoriterestaurantHandler()');
        favoriterestaurant.setAttribute('onclick', 'favoriterestaurantHandler()');
        favoriterestaurant.setAttribute('city', infoToAdd.address.city);
        favoriterestaurant.setAttribute('info', JSON.stringify(infoToAdd));
        favoriterestaurant.setAttribute('index', JSON.stringify(index))
        // restaurant name in center
    var mediaContent = document.createElement("div");
        mediaContent.classList = "media-content icon is-medium";
    var mediaContentTitle = document.createElement("p");
        mediaContentTitle.classList = "title is-10"
        mediaContentTitle.textContent = infoToAdd.restaurant_name;
    favoriterestaurantContainer.appendChild(favoriterestaurant);
    mediaContent.appendChild(mediaContentTitle);
    media.appendChild(favoriterestaurantContainer);
    media.appendChild(mediaContent);
    restaurantContent.appendChild(media);

    // main card content under header
    var cardContent = document.createElement("div");
        cardContent.className = "content";
        // cardContent.textContent = "";
        // create review stars
    var reviewContainer = document.createElement("div");
        reviewContainer.textContent = "Reviews: ";
    var stars = 4.5;
    var halfStar = (stars % 1 !== 0) ? true : false;
    if (halfStar) stars -= stars%1;
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
            stars++;
        }
        for (var i = 0; i < (5-stars); i++) {
            var star = document.createElement("i");
                star.classList = "fa-regular fa-star";
            reviewContainer.appendChild(star);
        }
    }
	var hoursOfOperation = document.createElement("div");
	if (infoToAdd.hours)
		hoursOfOperation.textContent = "Hours of Operation: " + infoToAdd.hours;
    var priceRange = document.createElement("div");
	if (infoToAdd.price_range)
        priceRange.textContent = "Price range: " + infoToAdd.price_range;
    var cuisineType = document.createElement("div");
	if (infoToAdd.cuisines != "")
        cuisineType.textContent = "Cuisine type: " + infoToAdd.cuisines.join(', ');
    cardContent.appendChild(reviewContainer);
    cardContent.appendChild(priceRange);
	cardContent.appendChild(hoursOfOperation);
    cardContent.appendChild(cuisineType);
    restaurantContent.appendChild(cardContent);

    // footer for website and other socials
    var footer = document.createElement("footer");
        footer.classList = "card-footer";
    var phoneNumber = document.createElement("p");
        phoneNumber.textContent = infoToAdd.restaurant_phone;
    var website = document.createElement("a");
	if (infoToAdd.restaurant_website != "") {
        website.classList = "fa-solid fa-globe fa-2x mr-2";
        website.setAttribute("href", infoToAdd.restaurant_website);
        website.setAttribute("target", "_blank");
	}
    var address = document.createElement("p");
		address.textContent = infoToAdd.address.formatted;
    footer.appendChild(phoneNumber);
	footer.appendChild(website);
    footer.appendChild(address);

    // append image, header, and main content to card div
    restaurantCard.appendChild(restaurantImage);
    restaurantCard.appendChild(restaurantContent);
    restaurantCard.appendChild(footer);
    resultsAreaEl.appendChild(restaurantCard);

}

var createSearchResults = function (restaurantToAdd, localStorageArray) {
    // if there is already search results, remove them
    if (document.getElementById('search-results-container')) {
        document.getElementById('search-results-container').remove();
    }
    // create new container to house new search results
    var searchResultsContainer = document.createElement("div");
    searchResultsContainer.id = "search-results-container";
    searchResultsContainer.classList = "columns is-multiline";
    document.getElementById("search-results").appendChild(searchResultsContainer);
    restaurantData = restaurantToAdd;
    // create the results
    // parse local storage array
    if (localStorageArray) {
    localStorageArray.forEach(function(element, index) {
        if (restaurantToAdd === "default") {
            element.restaurants.forEach(function (element, index) {  
                createSearchResultElement(element, index, "true");
            });
        } else {
        // if the first city === the restaurant to add city
        if (element.city.toLowerCase() === restaurantToAdd[0].address.city.toLowerCase()) {
            // if the city in localStorage equals the restaruant to add city
            element.restaurants.forEach(function(currentLocalRestaurant, index) {
                createSearchResultElement(currentLocalRestaurant, index, "true");
                for (var i = 0; i < restaurantToAdd.length; i++) {
                    if (restaurantToAdd[i].restaurant_name === currentLocalRestaurant.restaurant_name) {
                        restaurantToAdd.splice(i, 1);
                        i = restaurantToAdd.length;
                    }
                }
            });
        }
    }
    });
}
    if (restaurantToAdd != "default") {
    restaurantToAdd.forEach (function(element, index) {
    	createSearchResultElement(element, index, "false");
    });
}
}