/* Homepage Search Bar Event */
let searchBar = document.getElementById("searchInp");

searchBar.addEventListener("keyup", function (evt) {
    if (evt.key === 'Enter') {
        document.getElementById("searchBtn").click();
    }
});

function getSearchResults() {
    let searchString = document.getElementById("searchInp").value;
    console.log(searchString);

    window.location.href = 'searchResults?search=' + `${searchString}`;
}

/*Plant Genus Category Events */
/* ====================================================================== */

/* Abies */
const Abies = document.getElementById("abiesBtn");

Abies.addEventListener('click', event => {
    window.location.href = 'genusResults?genus=abies';
});

/* Carex */
const Carex = document.getElementById("carexBtn");

Carex.addEventListener('click', event => {
    window.location.href = 'genusResults?genus=carex';
});

/* Fraxinus */
const Fraxinus = document.getElementById("fraxinusBtn");

Fraxinus.addEventListener('click', event => {
    window.location.href = 'genusResults?genus=fraxinus';
});

/* Senecio */
const Senecio = document.getElementById("senecioBtn");

Senecio.addEventListener('click', event => {
    window.location.href = 'genusResults?genus=senecio';
});

/* Sorbus */
const Sorbus = document.getElementById("sorbusBtn");

Sorbus.addEventListener('click', event => {
    window.location.href = 'genusResults?genus=sorbus';
});

/* Torilis */
const Torilis = document.getElementById("torilisBtn");

Torilis.addEventListener('click', event => {
    window.location.href = 'genusResults?genus=torilis';
});


/*Suggestion Card Events */
/* ====================================================================== */

/* SlideSet 1 Card 1 */
const sgtCardBtn1 = document.getElementById("carouselCard1");

sgtCardBtn1.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn1.value;
});

/* SlideSet 1 Card 2 */
const sgtCardBtn2 = document.getElementById("carouselCard2");

sgtCardBtn2.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn2.value;
});

/* SlideSet 1 Card 3 */
const sgtCardBtn3 = document.getElementById("carouselCard3");

sgtCardBtn3.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn3.value;
});

/* SlideSet 1 Card 4 */
const sgtCardBtn4 = document.getElementById("carouselCard4");

sgtCardBtn4.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn4.value;
});

/* SlideSet 2 Card 5 */
const sgtCardBtn5 = document.getElementById("carouselCard5");

sgtCardBtn5.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn5.value;
});

/* SlideSet 2 Card 6 */
const sgtCardBtn6 = document.getElementById("carouselCard6");

sgtCardBtn6.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn6.value;
});

/* SlideSet 2 Card 7 */
const sgtCardBtn7 = document.getElementById("carouselCard7");

sgtCardBtn7.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn7.value;
});

/* SlideSet 2 Card 8 */
const sgtCardBtn8 = document.getElementById("carouselCard8");

sgtCardBtn8.addEventListener('click', event => {
    window.location.href = 'plantInformation?plant=' + sgtCardBtn8.value;
});


const navSlide = function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    console.log("it has run");

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    })
    navLinks.forEach((link, index) => {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s`;
    })
}

navSlide();