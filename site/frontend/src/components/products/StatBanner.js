import React from 'react';
import PropTypes from 'prop-types';

function StatBanner(props) {
    return (
        <>
            {/* <!-- Stats resume banner --> */}
            <div className="col-md-4 mb-4">
                <div className={"card shadow h-100 py-2 border-left-" + props.border_color}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{props.title}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{props.value}</div>
                            </div>
                            <div className="col-auto">
                                <i className={"fas fa-2x text-gray-300 fa-" + props.icon}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
    );
}

StatBanner.defaultProps = {
    title: "Titulo",
    value: 0,
    border_color: "primary",
    icon: "film"
};

StatBanner.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
    border_color: PropTypes.string,
    icon: PropTypes.string
};

export default StatBanner;