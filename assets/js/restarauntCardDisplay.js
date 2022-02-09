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
    restarauntCard.classList = "card column is-5-tablet is-3-desktop is-3-widescreen is-2-fullhd";

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
        // star on left to favorite restaraunt
    var favoriteRestarauntContainer = document.createElement("div");
        favoriteRestarauntContainer.classList = "media-left";
    var favoriteRestaraunt = document.createElement("i");
        favoriteRestaraunt.classList = "favorite-button fa-regular fa-star fa-2x";
        favoriteRestaraunt.setAttribute('onmouseenter', 'favoriteRestarauntHandler()');
        favoriteRestaraunt.setAttribute('onmouseleave', 'favoriteRestarauntHandler()');
        favoriteRestaraunt.setAttribute('onclick', 'favoriteRestarauntHandler()');
        favoriteRestaraunt.setAttribute('favorite', false);
        // restaraunt name in center
    var mediaContent = document.createElement("div");
        mediaContent.classList = "media-content icon is-medium";
    var mediaContentTitle = document.createElement("p");
        mediaContentTitle.classList = "title is-10"
        mediaContentTitle.textContent = "Restaraunt Name";
    favoriteRestarauntContainer.appendChild(favoriteRestaraunt);
    mediaContent.appendChild(mediaContentTitle);
    media.appendChild(favoriteRestarauntContainer);
    media.appendChild(mediaContent);
    restarauntContent.appendChild(media);

    // main card content under header
    var cardContent = document.createElement("div");
        cardContent.className = "content";
        cardContent.textContent = "Here's information about the restaraunt";
        // create review stars
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

    // footer for website and other socials
    var footer = document.createElement("footer");
        footer.classList = "card-footer";
    var phoneNumber = document.createElement("p");
        phoneNumber.textContent = "(123) 456-7890";
    var website = document.createElement("a");
        website.classList = "fa-solid fa-globe fa-2x";
        website.setAttribute("href", "#");
    var socialMedia = document.createElement("a");
        socialMedia.classList = "fa-brands fa-facebook fa-2x";
        socialMedia.setAttribute("href", "#");
    footer.appendChild(phoneNumber);
    footer.appendChild(website);
    footer.appendChild(socialMedia);

    // append image, header, and main content to card div
    restarauntCard.appendChild(restarauntImage);
    restarauntCard.appendChild(restarauntContent);
    restarauntCard.appendChild(footer);
    resultsAreaEl.appendChild(restarauntCard);

}