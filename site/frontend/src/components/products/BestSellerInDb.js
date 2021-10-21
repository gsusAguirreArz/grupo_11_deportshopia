import React, {useState, useEffect} from 'react';
import prodIm from '../../assets/images/tuf3090.jpg';

function apiCall(url, handler) {
    fetch(url)
        .then( response => response.json() )
        .then( data => handler(data) )
        .catch( error => console.log(error) );
}

function BestSellingProd(){

    const [prod, setprod] = useState({});

    const prodHandler = data => {
        setprod(data.data);
    }

    const getProd = async url => {
        await apiCall( url, prodHandler );
    }
	
    useEffect(() => {
		// console.log('%cMe monte!', 'color: green');
        let URL = "/api/products/1";
        getProd(URL);

    }, [])
	
    useEffect(() => {
		// console.log('%cMe actualice!', 'color: yellow');
    }, [prod])
	
    useEffect(() => {
		return () => {
			// console.log('%cMe desmonte!', 'color: red');
        };
    }, [])

    return (
        <>
            {/* <!-- Last Movie in DB --> */}
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Best selling product: {prod.name}</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={prodIm} alt="best selling product" />
                        </div>
                        <p>{prod.description}</p>
                        <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View product detail</a>
                    </div>
                </div>
            </div>
            {/* <!-- End content row last movie in Data Base --> */}
        </>
    );
}

export default BestSellingProd;