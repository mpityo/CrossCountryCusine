var formEl = document.querySelector("#form");
var favoriteRestaurants = [
    {
        city: "",
        restaurants: []
    }
];

var buttonHandler = function (e) {
    // form submit button is pressed
    if (e.target.id === "submit-form") {
        searchResults(getSearchStatus());
        resetSearchResults();
    } else
    // delete food type that was selected from appearing in results
    if (e.target.name === "delete-food-type") {
        // contained in foodFilterHandler.js
        deleteFoodType(e);
    }
}

var getFavoriteIconStatus = function (favorite) {
    if (favorite == "true") {
        return "favorite-button fa-solid fa-star fa-2x";
    } else {
        return "favorite-button fa-regular fa-star fa-2x";
    }
}

var saveToFavorites = function (cityName, restaurantInfo) { 
    var saved = false;
    if (!favoriteRestaurants) {
        favoriteRestaurants = [
            {
                city: cityName,
                restaurants: [restaurantInfo]
            }
        ];
    } else {
    favoriteRestaurants.forEach(function (element, index) {  
        if (element.city.toLowerCase() === cityName.toLowerCase()) {
            element.restaurants.push(restaurantInfo);
            saved = true;
        }
    });
    if (!saved) {
            favoriteRestaurants.push({city: cityName, restaurants: [restaurantInfo]});
        }
    }
    localStorage.setItem("favorite-restaurants", JSON.stringify(favoriteRestaurants));
}

var loadFavoritesFromLocal = function () {
    var storage = localStorage.getItem("favorite-restaurants");
    favoriteRestaurants = JSON.parse(storage);
    createSearchResults("default", favoriteRestaurants);
}

var removeFromSaved = function (restaurantInfo) {
    for (var i = 0; i < favoriteRestaurants.length; i ++) {
        if (favoriteRestaurants[i].city.toLowerCase() === restaurantInfo.address.city.toLowerCase()) {
            for (var a = 0; a < favoriteRestaurants[i].restaurants.length; a++) {
                if (favoriteRestaurants[i].restaurants[a].restaurant_name == restaurantInfo.restaurant_name) {
                    favoriteRestaurants[i].restaurants.splice(a, 1);
                }
            }
        }
    }
    localStorage.setItem("favorite-restaurants", JSON.stringify(favoriteRestaurants));
}

var getSearchStatus = function () {
    if (foodOptionsSelected.length === 0) {
        foodOptionsSelected = listOfFoodOptions;
    }
    var searchConditions = {
        city: document.querySelector("#city-search").value,
        dollarAmount: [
            document.querySelector("input[name='one-dollar']").checked ? "$" : "",
            document.querySelector("input[name='two-dollar']").checked ? "$$" : "",
            document.querySelector("input[name='three-dollar']").checked ? "$$$" : "",
            document.querySelector("input[name='four-dollar']").checked ? "$$$$" : ""
        ],
        typeOfFood: foodOptionsSelected
    }

    return searchConditions;
}
var searchResults = function (searchCondition){
   //if (!localStorage.getItem("restaurantData")) {
        var appid = "c66c7201cb23e0dca6ae60ccc9c0c236";
        var latLonUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchCondition.city + '&appid=' + appid;
        fetch(latLonUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    if (data.length > 0) {
                        var lat = data[0].lat;
                        var lon = data[0].lon;
                        var APIURL = "https://api.documenu.com/v2/restaurants/search/geo?lat=" + lat + "&lon=" + lon + "&cuisine=" + searchCondition.typeOfFood.join("&") + "&distance=10&key=6562a61d18895d80e93deeb71f6f82f2";
                        fetch(APIURL).then(function(response) {
                            if (response.ok) {
                                response.json().then(function(obj){
                                    localStorage.setItem("restaurantData", JSON.stringify(obj.data));
                                    createSearchResults(obj.data, favoriteRestaurants);
                                    return true;
                                });
                            } else {
                                openModal("Could not load results from the server");
                                return false;
                            }
                        });
                    } else {
                        openModal("" + searchCondition.city + " did not produce any results based on criteria searched for");
                        return false;
                    }
                });
            } else {
				openModal("No city results were found, check your search criteria");
                return false;
            }
        });
    // } else {
	// 	openModal("Loaded from local storage");
    //     createSearchResults(JSON.parse(localStorage.getItem("restaurantData")), favoriteRestaurants);
    // }
};
    
var resetSearchResults = function () {
    // reset the form and food options user selected
    formEl.reset();
    foodOptionsSelected = [];
    
    // remove the food options from the screen user selected
    formEl.querySelector("#food-added-container").remove();
    var newFoodContainer = document.createElement("div");
    newFoodContainer.classList = "is-flex";
    newFoodContainer.id = "food-added-container";
    formEl.querySelector("#food-added").appendChild(newFoodContainer);

    // reset food option drop down back to default for next search
    while (formEl.querySelector("option")) {
        formEl.querySelector("datalist").firstChild.remove();
    }
    listOfFoodOptions.forEach(element => {
        createFoodTypeOptions(element);
    });
}

var openModal = function (text) {
	var modal = document.querySelector('.modal');
	modal.querySelector(".modal-card-title").textContent = text;
	modal.classList.add("is-active");
}
var closeModal = function () {
	var modal = document.querySelector('.modal');
	modal.classList.remove("is-active");
}
var closeAllModals = function () {
	(document.querySelectorAll(".model") || []).forEach((modal) => {
		closeModal(modal);
	});
}

// handle actions from various buttons that are clicked
formEl.querySelector("button").addEventListener("click", function(e) {  
    e.preventDefault();
    buttonHandler(e);
});
document.querySelector("#food-added-container").addEventListener("click", function(e) {
    e.preventDefault();
    buttonHandler(e);
});

// listen for modal action to close
(document.querySelectorAll(".modal-background, .modal-card-foot .button") || []).forEach((close) => {
	var tar = close.closest('.model');
	
	close.addEventListener('click', () => {
		closeModal();
	});
});

document.addEventListener('keydown', (event) => {
	var e = event || window.event;
	
	// escape key is pressed
	if (e.keyCode === 27) {
		closeAllModals();
	}
});

// ** icon clicking for adding restarunt to favorite is handled in restaurantCardDisplay.js ** //

// populate the list of food that can be filtered by user
// contained in foodFilterHandler.js
listOfFoodOptions.forEach(element => {
    createFoodTypeOptions(element);
});

loadFavoritesFromLocal();