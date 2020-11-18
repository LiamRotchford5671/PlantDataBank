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

/*Plant Genus Category Events */

/* Abies */
const Abies = document.getElementById("abiesBtn");

Abies.addEventListener('click', event => {
    window.location.href = 'results?genus=abies';
});

/* Carex */
const Carex = document.getElementById("carexBtn");

Carex.addEventListener('click', event => {
    window.location.href = 'results?genus=carex';
});

/* Fraxinus */
const Fraxinus = document.getElementById("fraxinusBtn");

Fraxinus.addEventListener('click', event => {
    window.location.href = 'results?genus=fraxinus';
});

/* Senecio */
const Senecio = document.getElementById("senecioBtn");

Senecio.addEventListener('click', event => {
    window.location.href = 'results?genus=senecio';
});

/* Sorbus */
const Sorbus = document.getElementById("sorbusBtn");

Sorbus.addEventListener('click', event => {
    window.location.href = 'results?genus=sorbus';
});

/* Torilis */
const Torilis = document.getElementById("torilisBtn");

Torilis.addEventListener('click', event => {
    window.location.href = 'results?genus=torilis';
});