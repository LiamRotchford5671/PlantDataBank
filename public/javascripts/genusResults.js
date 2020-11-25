/* Next Button Genus Results */
const nextGenusBtn = document.getElementById("nextGenusBtn");

nextGenusBtn.addEventListener('click', event => {
    let query = window.location.search.substring(1).split('?');
    let destruct = query[0].split('&');
    let searchStr = destruct[0].split('=');
    let pageNum = nextGenusBtn.value;

    if (pageNum !== 'reset') {
        pageNum++;
        window.location.href = 'genusResults?nextGenusPage=' + searchStr[1] + '&page=' + pageNum;
    } else {
        window.location.href = 'genusResults?genus=' + searchStr[1];
    }
});

/* Genus Results Plant Details Btn */
function getDetails(slug) {
    window.location.href = 'plantInformation?plant=' + slug;
}