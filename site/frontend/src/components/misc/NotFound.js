import React from 'react'
import errorBg from '../../assets/images/404.jpg';

function notFound() {
    return (
        <>
            <div className="text-center">
                <h1>404 NOT FOUND</h1>
                <p>Pagina de error</p>
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30+'rem'}} src={errorBg} alt="404 Not Found"/>      
            </div>
        </>
    );
}

export default notFound;