document.addEventListener('DOMContentLoaded', function(){
    // scrollNav();

    // fijar barra de navegacion
    navegacionFija();
});

function navegacionFija(){

    const barra = document.querySelector('.header');

    // REgistrar el Intersection OBserver
    const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting){
            barra.classList.remove('fijo');
            // console.log(`Elemento visible`);
        }else{
            barra.classList.add('fijo');
            // console.log(`ya desaparecio`);
        }
    });

    // Elemento a observar
    observer.observe(document.querySelector('.sectionTitle'));
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.nav--principal a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', (e)=> {
            e.preventDefault();

            const selector = e.target.attributes.href.value;
            const seccion = document.querySelector(selector);

            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}