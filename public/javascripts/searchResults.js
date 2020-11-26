/* Next Button Search Results */
const nextSearchBtn = document.getElementById("nextSearchBtn");

nextSearchBtn.addEventListener('click', event => {
    let query = window.location.search.substring(1).split('?');
    let destruct = query[0].split('&');
    let searchStr = destruct[0].split('=');
    let pageNum = nextSearchBtn.value;

    console.log(pageNum);
    console.log(searchStr);

    pageNum++;
    window.location.href = 'searchResults?nextSearchPage=' + searchStr[1] + '&page=' + pageNum;
});

/* Previous Button Genus Results */
const prevSearchBtn = document.getElementById("prevSearchBtn");

prevSearchBtn.addEventListener('click', event => {
    let query = window.location.search.substring(1).split('?');
    let destruct = query[0].split('&');
    let searchStr = destruct[0].split('=');
    let pageNum = prevSearchBtn.value;

    if (pageNum != 2) {
        pageNum--;
        window.location.href = 'searchResults?nextSearchPage=' + searchStr[1] + '&page=' + pageNum;
    } else {
        window.location.href = 'searchResults?search=' + searchStr[1];
    }
});

/* Search Results Plant Details Btn */
function getDetails(slug) {
    window.location.href = 'plantInformation?plant=' + slug;
}