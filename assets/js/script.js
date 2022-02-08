var formEl = document.querySelector("#form");

formEl.querySelector("button").addEventListener("click", function () {  
    event.preventDefault();
    var cityName = document.querySelector("#city-search").value;
    var pizzaOrNo = document.querySelector("input[name='food']");
    console.log(cityName, pizzaOrNo.checked);
});