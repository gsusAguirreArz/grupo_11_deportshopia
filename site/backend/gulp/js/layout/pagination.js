document.addEventListener('DOMContentLoaded', function(){

    let currentPage = 1;
    if ( getQueryParam('page') ){
        currentPage = getQueryParam('page');
    }

    let btnPrev = document.getElementById("btn_prev");
    let btnNext = document.getElementById("btn_next");

    let STRING = "products";

    btnPrev.addEventListener('mouseover', function(e) {
        e.preventDefault();
        btnPrev.classList.add('active');
    } );

    btnNext.addEventListener('mouseover', function(e) {
        e.preventDefault();
        btnNext.classList.add('active');
    } );

    btnPrev.addEventListener('click', function(e) {
        e.preventDefault();
        prevPage(STRING);
    } );

    btnNext.addEventListener('click', function(e) {
        e.preventDefault();
        nextPage(STRING);
    } );

});

function prevPage(string) {
    // function that manages the previous page
    if ( current_page > 1 ){
        current_page--;
        changePage(current_page, string);
    }
}

function nextPage(string) {
    // function that manages the next page
    if ( current_page > numPages() ){
        current_page++;
        changePage(current_page, string);
    }
}

function changePage(pageNum, string) {
    // logic to change page
    let URL = `http://localhost:8080/${string}?page=${pageNum}`;
    window.location.assign(URL);

}

function numPages(){
    // add logic to get all the total pages with respect the current products
    let lastPageNum = 1;

    if ( lastPage ){
        let lastPage = document.getElementById("last_page");
        lastPageNum = Number(lastPage.innerText);
    }

    // let totalPages = 10;
    return lastPageNum;
}

function getQueryParam(param) {
    urlSearParams = new URLSearchParams(window.location.search);
    return Number( urlSearParams.get(param) );
}