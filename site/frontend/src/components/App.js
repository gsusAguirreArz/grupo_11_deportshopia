import React from 'react';
import {Route, Switch} from 'react-router-dom';

import SideBar from './main/SideBar';
import ContentWrapper from './main/ContentWrapper';
import BestSeller from './products/BestSellerInDb';
import InfoBanners from './products/InfoBanners';
import ProdsCategoriesInDb from './products/CategoriesInDb';
import SearchProducts from './products/Search';
import NotFound from './misc/NotFound';
import UsersTable from './products/UsersTable';

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
          <Route path="/pages" exact={true} component={BestSeller} />
          <Route path="/search" exact>
            <SearchProducts apiKEY="5c5c6d24" />
          </Route>
          <Route path="/users">
            <UsersTable />
          </Route>
          <Route component={NotFound}/> 
          {/* Not found siempre debe star al final */}
        </Switch>
      </div>


    </>
  );
}

export default App;
