import React from 'react';

import TopBar from './TopBar';
import ContentRowTop from './ContentRowTop';
import Footer from './Footer';
import UsersTable from '../products/UsersTable';

function ContentWrapper() {
    return (
        <>
            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">
                {/* <!-- Main Content --> */}
                <div id="content">
                    <TopBar />
                    <ContentRowTop />
                </div>
                {/* <!-- End of MainContent --> */}
                <UsersTable />
                <Footer />
            </div>
            {/* <!-- End of Content Wrapper --> */}
        </>
    );
}

export default ContentWrapper;