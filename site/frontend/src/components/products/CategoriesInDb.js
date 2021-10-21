import React, {Component} from 'react';
import CategoryBanner from './CategoryBanner';

class CategoriesInDb extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoriesList:[],
            classname: "card-body fondoCaja "
        };
    }

    apiCall(url,handler){
        // console.log('inside apiCall');
        fetch(url)
            .then( response => response.json() )
            .then( data => handler(data) )
            .catch( error => console.log(error) );
    }

    genresHandler = (data) => {
        // console.log(data.data);
        this.setState({
            categoriesList: data.data
        });
    }

    getGenres(){
        this.apiCall("/api/categories", this.genresHandler);
    }

    componentDidMount(){
        // console.log('Me monte!!');
        this.getGenres();
    }

    componentDidUpdate(){
        // console.log('Me actualize!!');
        // alert('tengo un genero nuevo!');
    }
    cambiaColor(){
        this.setState({
            classname: this.state.classname + " bg-secondary "
        });
    }

    render(){
        console.log('estoy renderizando!!');

        let contenido;

        if ( this.state.categoriesList.length !== 0 ){
            contenido = <div className="row">{ this.state.categoriesList.map( (category,idx) => <CategoryBanner name={category.name} key={idx}/>) }</div>;
        }else{
            contenido = <div className="row"><CategoryBanner/></div>;
        }

        return (
            <>
                {/* <!-- Genres in DB --> */}
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h5 onMouseOver={ () => this.cambiaColor() } className="m-0 font-weight-bold text-gray-800">All categories in DB</h5>
                        </div>
                        <div className={this.state.classname}>
                            {contenido}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CategoriesInDb;