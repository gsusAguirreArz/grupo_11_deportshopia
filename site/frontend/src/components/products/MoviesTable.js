import React, { Component } from 'react';
import MovieRow from './MovieRow';
// import TableTitles from './TableTitles';
class MoviesTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: []
        };
    }
    apiCall(url, handler){
        fetch(url)
            .then( response => response.json() )
            .then( data => handler(data) )
            .catch( e => console.log(e) );
    }
    moviesHandler = (data) => {
        this.setState({
            movies: data.data
        });
    }
    getMovies(){
        this.apiCall( "/api/movies", this.moviesHandler );
    }
    componentDidMount(){
        console.log('me monte!!');
        this.getMovies();
    }
    componentDidUpdate(){
        console.log('me actualice!');
    }
    render(){
        let contenido;

        if ( this.state.movies.length !== 0 ){
            contenido = this.state.movies.map( (movie, idx) => <MovieRow key={idx} id={movie.id} title={movie.title} duration={movie.length} rating={movie.rating} awards={movie.awards}/> );
        }else{
            contenido = <></>;
        }

        return (
            <>
                {/*<!-- PRODUCTS LIST -->*/}
                <h1 className="h3 mb-2 text-gray-800">Favorite Movies</h1>
                {/*<!-- Info Table -->*/}
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Titulo</th>
                                        <th>Duracion</th>
                                        <th>Rating</th>
                                        <th>Premios</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contenido}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MoviesTable;