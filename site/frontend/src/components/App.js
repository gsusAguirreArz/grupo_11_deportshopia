import React from 'react';
import {Route, Switch} from 'react-router-dom';

import SideBar from './main/SideBar';
import ContentWrapper from './main/ContentWrapper';
import LastProductInDb from './products/LastMoviesInDb';
import InfoBanners from './products/InfoBanners';
import ProdsCategoriesInDb from './products/GenresInDb';
import SearchProducts from './products/SearchMovies';
import NotFound from './misc/NotFound';

function App() {
  return (
    <>
      <div id="wrapper">
        <SideBar />

        {/* <ContentWrapper /> */}
        <Switch>
          <Route exact path="/">
            <ContentWrapper />
          </Route>
          <Route path="/charts" component={InfoBanners} />
          <Route path="/tables" component={ProdsCategoriesInDb} /> 
          <Route path="/pages" exact={true} component={LastProductInDb} />
          <Route path="/search" exact>
            <SearchProducts apiKEY="5c5c6d24" />
          </Route>
          <Route component={NotFound}/> 
          {/* Not found siempre debe star al final */}
        </Switch>
      </div>


    </>
  );
}

export default App;
