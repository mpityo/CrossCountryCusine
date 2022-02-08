var formEl = document.querySelector("#form");
var foodAddedEl = document.querySelector("#food-added");
var foodOptionsSelected = [];

// create the food cusine type drop down for user to select
var createFoodTypeEl = function () {
    var listOfFoodOptions = ['Thai', 'Italian', 'French', 'American', 'Artistic', 'Mexican'];
    // get the element to add the options to
    var dataListEl = formEl.querySelector("datalist");

    // for each food option type, create an option and append to datalist (dataListEl)
    listOfFoodOptions.forEach(element => {
        var optionEl = document.createElement("option");
        optionEl.id = element;
        optionEl.value = element;
        optionEl.name = "food-types";

        dataListEl.appendChild(optionEl);
    });
}

function selectFood () {
    var foodName = document.getElementById("food-input").value;
    var foodOptions = document.getElementById('cuisine-types').childNodes;

    for (var i = 0; i < foodOptions.length; i++) {
        if (foodOptions[i].value === foodName) {
            // an item was selected
            // add it to an array
            if (foodOptionsSelected.length > 0) {
                foodOptionsSelected.push(foodName);
            } else {
                foodOptionsSelected = [foodName];
            }
            // add food type to page for easy removal
            var foodAddedContainer = document.createElement("div");
            var foodToAddEl = document.createElement("span");
            foodToAddEl.textContent = foodName;
            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            foodToAddEl.appendChild(deleteBtn);
            foodAddedContainer.appendChild(foodToAddEl);
            foodAddedEl.appendChild(foodAddedContainer);

            // remove the food from the list, so it cannot be selected again
            document.querySelector("#" + foodName).remove();

            break;
        }
    }
}

var getSearchStatus = function () {
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

formEl.querySelector("button").addEventListener("click", function() {  
    event.preventDefault();
    var foodToFind = getSearchStatus();
    console.log(foodToFind);
});

formEl.querySelector("input").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("prevented default");
});

createFoodTypeEl();