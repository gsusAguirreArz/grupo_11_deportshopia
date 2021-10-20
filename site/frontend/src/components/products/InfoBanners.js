import React, {useState, useEffect} from 'react';
import StatBanner from './StatBanner';

function apiCall(url, handler){
    fetch(url)
        .then( response => response.json() )
        .then( data => handler(data) )
        .then( error => console.log(error) );
}

function InfoBanners(){

    const [products, setproducts] = useState([]);

    const dataHandler = data => {
        // console.log(data);
        setproducts(data.data);
    }

    const getData = async url => {
        await apiCall( url, dataHandler );
    }
	
    useEffect(() => {
		console.log('%cMe monte!', 'color: green');
        let URL = "/api/products";
        getData(URL);
    }, [])
	
    useEffect(() => {
		console.log('%cMe actualice!', 'color: yellow');
    }, [products])
	
    useEffect(() => {
		return () => {
			console.log('%cMe desmonte!', 'color: red');
        };
    }, [])

    return (
        <>
            {/* <!-- Content Row Movies--> */}
            <div className="row">
                <StatBanner title="Total products in DB" value={products.length} border_color="primary" icon="film"/>
                <StatBanner title="Total awards" value={79} border_color="success" icon="award"/>
                <StatBanner title="Actors quantity" value={49} border_color="warning" icon="user"/>
            </div>
            {/* <!-- End movies in Data Base --> */}
        </>
    );
}

export default InfoBanners;