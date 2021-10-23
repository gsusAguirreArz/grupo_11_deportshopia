document.addEventListener('DOMContentLoaded', function(){
    // scrollNav();

    // fijar barra de navegacion
    navegacionFija();
});

let current_page = 1;
let prods_per_page = 20;
let offset_value = 0;

function prevPage() {
    // function that manages the previous page
    if ( current_page > 1 ){
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    // function that manages the next page
    if ( current_page > numPages() ){
        current_page++;
        changePage(current_page);
    }
}

function changePage(page) {
    // function that manges the changing pages
    let btn_next = document.getElementById("btn_next");
    let btn_prev = document.getElementById("btn_prev");
    // let productsSection = document.getElementById("");
    let page_span = document.getElementById("page");
    
    // set page value 
    if ( page < 1 ) page = 1;
    if ( page > numPages() ) page = numPages();

    // add logic to show the data offset of the DB
    // productsSection.innerHTML = "";

    // add extra logic to handle visibility or content

}

function numPages(){
    // add logic to get all the total pages with respect the current products
    let totalPages = 10;
    return totalPages;
}