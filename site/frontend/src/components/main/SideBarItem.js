import React from "react";
import {Link} from 'react-router-dom';

function SideBarItem(props){
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to={props.href_custom}>
                    <i className={"fas fa-fw fa-"+props.iconName}></i>
                    <span>{props.name}</span>
                </Link>
            </li>
        </>
    );
}

export default SideBarItem;