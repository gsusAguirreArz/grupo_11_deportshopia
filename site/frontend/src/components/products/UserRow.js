import React from 'react';
import PropTypes from 'prop-types';

function UserRow(props) {
    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.fn}</td>
                <td>{props.ln}</td>
                <td>{props.email}</td>
                <td>{props.rt}</td>
            </tr>
        </>
    );
}

UserRow.defaultProps = {
    id: 0,
    title: "Movie Name",
    duration: 0,
    rating: 5,
    awards: 0 
};

UserRow.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    duration: PropTypes.number,
    rating: PropTypes.number,
    awards: PropTypes.number 
};

export default UserRow;