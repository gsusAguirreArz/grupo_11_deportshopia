import React from 'react';
import PropTypes from 'prop-types';

function MovieRow(props) {
    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.title}</td>
                <td>{props.duration}</td>
                <td>{props.rating}</td>
                <td>{props.awards}</td>
            </tr>
        </>
    );
}

MovieRow.defaultProps = {
    id: 0,
    title: "Movie Name",
    duration: 0,
    rating: 5,
    awards: 0 
};

MovieRow.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    duration: PropTypes.number,
    rating: PropTypes.number,
    awards: PropTypes.number 
};

export default MovieRow;