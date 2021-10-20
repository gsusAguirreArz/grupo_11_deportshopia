import React from 'react';

import InfoBanners from '../products/InfoBanners';
import GenresInDb from '../products/GenresInDb';
import LastMoviesInDb from '../products/LastMoviesInDb';

function ContentRowTop() {
    return (
        <>
            {/* <!-- Content Row Top --> */}
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>
            
                <InfoBanners />   

                {/* <!-- Content Row Last Movie in Data Base --> */}
                <div className="row">
                    <LastMoviesInDb />
                    <GenresInDb />
                </div>
            </div>
            {/* <!--End Content Row Top--> */}
        </>
    );
}

export default ContentRowTop;