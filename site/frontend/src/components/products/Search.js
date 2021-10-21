import React, {useState, useEffect, useRef} from 'react';
// import noPoster from '../assets/images/capamerica.png';

function apiCall(url, handler) {
	fetch(url)
		.then( response => response.json() )
		.then( data => handler(data) )
		.catch( error => console.log(error) );
}

function SearchProds(props) {

	const formInput = useRef();
	const h2 = useRef();

    const [prods, setprods] = useState([]);

    const dataHandler = data => {
        // console.log(data);
        setprods(data.data);
    }

    const getProds = async url => {
        await apiCall( url, dataHandler );
    }

    const searchProds = event => {
		// console.log(formInput.current.value);

		h2.current.innerText = `Search Results for: ${formInput.current.value}`;

        event.preventDefault();
        let keywords = event.target.keywords.value;
        let URL = `/api/products/search/?keywords=${keywords}`;
        getProds(URL);
		event.target.keywords.value = '';
    }
	
    useEffect(() => {
		// console.log('%cMe monte!', 'color: green');
    }, [])
	
    useEffect(() => {
		// console.log('%cMe actualice!', 'color: yellow');
    }, [prods])
	
    useEffect(() => {
		return () => {
			// console.log('%cMe desmonte!', 'color: red');
        };
    }, [])

    return (
        <>
            <div className="container-fluid">
            {
				( prods !== undefined) ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={searchProds} method="GET">
								<div className="form-group">
									<label htmlFor="keywords">Buscar por nombre:</label>
									<input ref={formInput} type="text" name="keywords" id="keywords" className="form-control" />
								</div>
								<button className="btn btn-info" type="submit" >Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2 ref={h2}>Search Results: </h2>
						</div>
						{/* Listado de películas */}
						{
							prods.length > 0 && prods.map((prod, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{prod.name}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={prod.image}
														alt={prod.name} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{prod.brand.name}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ prods.length === 0 && <div className="alert alert-warning text-center">No results</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Error</div>
			}
            </div>
        </>
    );
}

export default SearchProds;