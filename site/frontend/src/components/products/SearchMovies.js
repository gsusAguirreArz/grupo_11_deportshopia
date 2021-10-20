import React, {useState, useEffect, useRef} from 'react';
// import noPoster from '../assets/images/capamerica.png';

function SearchMovies(props) {

    // Credenciales de API
    const apiKey = props.apiKEY; // Intenta poner cualquier cosa antes para probar
	const formInput = useRef();
	const h2 = useRef();

    const [movies, setmovies] = useState([]);

    const dataHandler = data => {
        // console.log(data);
        setmovies(data.Search);
    }

    const apiCall = (url, handler) => {
        fetch(url)
            .then( response => response.json() )
            .then( data => handler(data) )
            .catch( e => console.log(e) );
    }

    const getData = async url => {
        apiCall( url, dataHandler );
    }

    const searchMovie = event => {
		// console.log(formInput.current.value);

		h2.current.innerText = `Películas para la palabra: ${formInput.current.value}`;

        event.preventDefault();
        let keywords = event.target.keywords.value;
        let URL = `http://www.omdbapi.com/?apikey=${apiKey}&s=${keywords}`;
        getData(URL);
		event.target.keywords.value = '';
    }
	
    useEffect(() => {
		console.log('%cMe monte!', 'color: green');
    }, [])
	
    useEffect(() => {
		console.log('%cMe actualice!', 'color: yellow');
    }, [movies])
	
    useEffect(() => {
		return () => {
			console.log('%cMe desmonte!', 'color: red');
        };
    }, [])

    return (
        <>
            <div className="container-fluid">
            {
				(apiKey !== '' && movies !== undefined) ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={searchMovie} method="GET">
								<div className="form-group">
									<label htmlFor="keywords">Buscar por título:</label>
									<input ref={formInput} type="text" name="keywords" id="keywords" className="form-control" />
								</div>
								<button className="btn btn-info" type="submit" >Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2 ref={h2}>Películas para la palabra: </h2>
						</div>
						{/* Listado de películas */}
						{
							movies.length > 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
            </div>
        </>
    );
}

export default SearchMovies;