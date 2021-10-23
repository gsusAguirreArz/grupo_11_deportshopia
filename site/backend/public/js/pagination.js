document.addEventListener('DOMContentLoaded', function(){

    let currentPage = 1;
    if ( getQueryParam('page') ){
        currentPage = getQueryParam('page');
    }

    let btnPrev = document.querySelector("#btn_prev");
    let btnNext = document.querySelector("#btn_next");
    
    let STRING = location.pathname;
    // console.log(STRING);

    btnPrev.addEventListener('mouseover', function(e) {
        e.preventDefault();
        btnPrev.classList.add('active');
    } );

    btnNext.addEventListener('mouseover', function(e) {
        e.preventDefault();
        btnNext.classList.add('active');
    } );

    btnPrev.addEventListener('click', function() {
        // console.log("clickeaste flecha izquierda");
        prevPage(currentPage,STRING);
    } );

    btnNext.addEventListener('click', function(e) {
        // console.log("clickeaste flecha derecha");
        nextPage(currentPage,STRING);
    } );

});

function prevPage(current_page, string) {
    // function that manages the previous page
    if ( current_page > 1 ){
        current_page--;
        return changePage(current_page, string);
    }
}

function nextPage(current_page, string) {
    // function that manages the next page
    if ( current_page < numPages() ){
        current_page++;
        changePage(current_page, string);
    }
}

function changePage(pageNum, string) {
    // logic to change page
    let URL = `http://localhost:8080${string}?page=${pageNum}`;
    // console.log(URL);
    window.location.assign(URL);

}

function numPages(){
    // add logic to get all the total pages with respect the current products
    let lastPage = 1;
    if ( document.querySelector("#last_page") ){
        lastPage = Number(document.querySelector("#last_page").innerText);
    }
    return lastPage;
}

function getQueryParam(param) {
    urlSearParams = new URLSearchParams(window.location.search);
    return Number( urlSearParams.get(param) );
}