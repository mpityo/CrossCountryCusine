var formEl = document.querySelector("#form");

var buttonHandler = function (e) {
    // form submit button is pressed
    if (e.target.id === "submit-form") {
        var foodToFind = getSearchStatus();

        var results = serachResults(foodToFind);
		var trimmedResults = results.data;
        resetSearchResults();
		trimmedResults.forEach (function(index)) {
        	createSearchResults(trimmedResults[index]);
    } else
    // delete food type that was selected from appearing in results
    if (e.target.name === "delete-food-type") {
        // contained in foodFilterHandler.js
        deleteFoodType(e);
    }
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

    var APIURL = "https://api.documenu.com/v2/restaurants/state/NY?key=8497dbd8ca25fc1d31b026b9c7854ef8";
    var appid = "c66c7201cb23e0dca6ae60ccc9c0c236";
    var latLonUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchCondition.city + '&appid=' + appid;
    fetch(latLonUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                if (data.length > 0) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    console.log(lat, lon, searchCondition.typeOfFood.join("&"));
                    var APIURL = "https://api.documenu.com/v2/restaurants/search/geo?lat=" + lat + "&lon=" + lon + "&cuisine=" + searchCondition.typeOfFood.join("&") + "&distance=25&key=8497dbd8ca25fc1d31b026b9c7854ef8";
                    fetch(APIURL).then(function(response) {
                        if (response.ok) {
                            response.json().then(function(data){
                            
                                console.log(data)
                    
                            })
                    
                        };
                    });
                    
                }
            });
        }
    });
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

// ** icon clicking for addind restarunt to favorite is handled in restarauntCardDisplay.js ** //

// populate the list of food that can be filtered by user
// contained in foodFilterHandler.js
listOfFoodOptions.forEach(element => {
    createFoodTypeOptions(element);
});