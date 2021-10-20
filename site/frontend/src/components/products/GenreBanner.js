import React from 'react';
import PropTypes from 'prop-types';

function GenreBanner(props) {
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

GenreBanner.defaultProps = {
    name: "No Genre"
};

GenreBanner.propTypes = {
    name: PropTypes.string
};

export default GenreBanner;