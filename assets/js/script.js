var formEl = document.querySelector("#form");

var buttonHandler = function (e) {
    // form submit button is pressed
    if (e.target.id === "submit-form") {
        var foodToFind = getSearchStatus();
        console.log(foodToFind);
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
var searchResults = function (){

    var APIURL = "https://api.documenu.com/v2/restaurants/state/NY?key=8497dbd8ca25fc1d31b026b9c7854ef8";
    var appid = "c66c7201cb23e0dca6ae60ccc9c0c236";
    var latLonUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchCondition.city + '&appid=' + appid;
    fetch(latLonUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                if (data.length > 0) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    console.log(lat, lon);
                    var APIURL = "https://api.documenu.com/v2/restaurants/search/geo?lat=" + lat + "&lon=" + lon + "&distance=25&key=8497dbd8ca25fc1d31b026b9c7854ef8";
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