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
    console.log(cityName, restaurantInfo);
    if (!favoriteRestaurants) {
        favoriteRestaurants = [
            {
                city: cityName,
                restaurants: [restaurantInfo]
            }
        ];
        console.log("saved info to whole array ", favoriteRestaurants);
    } else {
    favoriteRestaurants.forEach(function (element, index) {  
        if (element.city.toLowerCase() === cityName.toLowerCase()) {
            element.restaurants.push(restaurantInfo);
            console.log("saved " + restaurantInfo + " to " + cityName);
            saved = true;
        }
    });
    if (!saved) {
            favoriteRestaurants.push({city: cityName, restaurants: [restaurantInfo]});
            console.log("saved info to end of array ", favoriteRestaurants, {city: cityName, restaurants: restaurantInfo});
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
                        console.log(lat, lon, searchCondition.typeOfFood.join("&"));
                        var APIURL = "https://api.documenu.com/v2/restaurants/search/geo?lat=" + lat + "&lon=" + lon + "&cuisine=" + searchCondition.typeOfFood.join("&") + "&distance=10&key=0cebd14c16be99f05592ec0bb0fc639f";
                        fetch(APIURL).then(function(response) {
                            if (response.ok) {
                                response.json().then(function(obj){
                                    localStorage.setItem("restaurantData", JSON.stringify(obj.data));
                                    console.log("api called");
                                    createSearchResults(obj.data, favoriteRestaurants);
                                });
                            } else {
                                console.log(response);
                            }
                        });
                    } else {
                        console.log("No city found " + data);
                    }
                });
            } else {
                console.log("No response from openweather " + response);
            }
        });
    // } else {
    //     console.log("loaded from storage");
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

// handle actions from various buttons that are clicked
formEl.querySelector("button").addEventListener("click", function(e) {  
    e.preventDefault();
    buttonHandler(e);
});
document.querySelector("#food-added-container").addEventListener("click", function(e) {
    e.preventDefault();
    buttonHandler(e);
});

// ** icon clicking for addind restarunt to favorite is handled in restaurantCardDisplay.js ** //

// populate the list of food that can be filtered by user
// contained in foodFilterHandler.js
listOfFoodOptions.forEach(element => {
    createFoodTypeOptions(element);
});

loadFavoritesFromLocal();