/* Next Button Genus Results */
const nextGenusBtn = document.getElementById("nextGenusBtn");

nextGenusBtn.addEventListener('click', event => {
    let query = window.location.search.substring(1).split('?');
    let destruct = query[0].split('&');
    let searchStr = destruct[0].split('=');
    let pageNum = nextGenusBtn.value;

    pageNum++;
    window.location.href = 'genusResults?nextGenusPage=' + searchStr[1] + '&page=' + pageNum;
});

/* Previous Button Genus Results */
const prevGenusBtn = document.getElementById("prevGenusBtn");

prevGenusBtn.addEventListener('click', event => {
    let query = window.location.search.substring(1).split('?');
    let destruct = query[0].split('&');
    let searchStr = destruct[0].split('=');
    let pageNum = prevGenusBtn.value;

    if (pageNum != 2) {
        pageNum--;
        window.location.href = 'genusResults?nextGenusPage=' + searchStr[1] + '&page=' + pageNum;
    } else {
        window.location.href = 'genusResults?genus=' + searchStr[1];
    }
});

/* Genus Results Plant Details Btn */
function getDetails(slug) {
    window.location.href = 'plantInformation?plant=' + slug;
}

/* Search Bar */
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

// nav bar
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