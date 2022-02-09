var foodAddedEl = document.querySelector("#food-added");
var listOfFoodOptions = ['Thai', 'Italian', 'French', 'American', 'Mediteranian', 'Asian', 'German', 'Comfort'];
var foodOptionsSelected = [];

var deleteFoodType = function (typeToRemove) {  
    // add food name back to food selection list
    var foodName = typeToRemove.target.parentElement.firstChild.data;
    createFoodTypeOptions(foodName);

    // remove food from the list of food that has already been selected
    typeToRemove.target.closest("span").remove();

    // loop through the array with the food being passed to API and remove from there as well
    for (var i = 0; i < foodOptionsSelected.length; i++) {
        if (foodOptionsSelected[i] === foodName) {
            foodOptionsSelected.splice(i, 1);
            break;
        }
    }
}

var createFoodTypeOptions = function (foodName) {
    // create the food cusine type drop down for user to select
    // get the element to add the options to
    var dataListEl = formEl.querySelector("datalist");

    // create an option and append to datalist (dataListEl)
    var optionEl = document.createElement("option");
    optionEl.id = foodName;
    optionEl.value = foodName;
    optionEl.name = "food-types";

    dataListEl.appendChild(optionEl);
}

var createFoodUserButtons = function (foodName) {
    // add food type to page for easy removal by user
    // hold name and delete button in one div
    var foodAddedContainer = document.createElement("div");
    foodAddedContainer.classList = "food-added-container";

    var foodToAddEl = document.createElement("span");
    foodToAddEl.textContent = foodName;
    var deleteBtn = document.createElement("button");
    deleteBtn.classList = "delete";
    deleteBtn.name = "delete-food-type";

    foodToAddEl.appendChild(deleteBtn);
    foodAddedContainer.appendChild(foodToAddEl);
    foodAddedEl.appendChild(foodAddedContainer);

    // remove the food from the list, so it cannot be selected again
    document.getElementById(foodName).remove();

    // return the form back to blank for next input
    document.getElementById("food-input").value = "";
}

function selectFood () {
    // when a food is selected from the drop down list
    var foodName = document.getElementById("food-input").value;
    var foodOptions = document.getElementById('cuisine-types').childNodes;

    for (var i = 0; i < foodOptions.length; i++) {
        // an item was selected
        if (foodOptions[i].value === foodName) {
            // add it to an array
            if (foodOptionsSelected.length > 0) {
                foodOptionsSelected.push(foodName);
            } else {
                foodOptionsSelected = [foodName];
            }
            createFoodUserButtons(foodName);
            break;
        }
    }
}
