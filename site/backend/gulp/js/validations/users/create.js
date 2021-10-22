
let first_name = document.querySelector("#first_name");
let last_name = document.querySelector("#last_name");
let email = document.querySelector("#email");
let form = document.querySelector("form");

let data = {
    first_name:'',
    last_name:'',
    email: ''
};


first_name.addEventListener('input', readText);
last_name.addEventListener('input', readText);
email.addEventListener('input', readText);
form.addEventListener('submit', event => {
    event.preventDefault();

    let {first_name, last_name, email} = data;

    if ( first_name === '' || last_name === '' || email === ''){
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