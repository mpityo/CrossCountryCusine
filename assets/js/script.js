var formEl = document.querySelector("#form");

var buttonHandler = function (e) {
    // form submit button is pressed
    if (e.target.id === "submit-form") {
        var foodToFind = getSearchStatus();
        var results = serachResults(foodToFind);
        resetSearchResults();
        createSearchResults(results);
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