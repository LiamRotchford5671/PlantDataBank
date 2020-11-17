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

    window.location.href = 'results?q=' + `${searchString}`;
}

/* Major Plant Kingdom Event */

/* Vascular */

const vascular = document.getElementById("vascularBtn");

vascular.addEventListener('click', event => {
    window.location.href = 'results?genus=senecio';
});