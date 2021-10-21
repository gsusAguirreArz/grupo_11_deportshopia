import React from 'react';
import PropTypes from 'prop-types';

function CategoryBanner(props) {
    return (
        <>
            <div className="col-lg-6 mb-4">
                <div className="card bg-dark text-white shadow">
                    <div className="card-body">
                        {props.name}
                    </div>
                </div>
            </div>
        </>
    );
}

CategoryBanner.defaultProps = {
    name: "No Category"
};

CategoryBanner.propTypes = {
    name: PropTypes.string
};

export default CategoryBanner;