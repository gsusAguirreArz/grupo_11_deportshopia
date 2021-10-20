/**
 * 
 * ----------------------------
 *  Variables
 * ----------------------------
 * 
 */

let name = document.querySelector("#name");
let description = document.querySelector("#description");
let price = document.querySelector("#price");
let form = document.querySelector("form");

let data = {
    name:'',
    description:'',
    price: ''
};

name.addEventListener('input', readText);
description.addEventListener('input', readText);
price.addEventListener('input', readText);
form.addEventListener('submit', event => {
    event.preventDefault();

    let {name, description, price} = data;

    if ( name === '' || description === '' || price === ''){
        sendAlert('Todos los campos son obligatorios', true);
        return;  
    }

    sendAlert("Todos los campos son obligatorios.");
});

function readText(event) {
    data[event.target.id] = event.target.value;   
}

function sendAlert(message, error = false) {
    let alert = document.createElement('P');
    alert.textContent = message;
    
    if(error){
        alert.classList.add('error');
    }else{
        alert.classList.add('correcto');
    }

    form.appendChild(alert);

    setTimeout( () => {
        alert.remove();
    }, 4000);
}