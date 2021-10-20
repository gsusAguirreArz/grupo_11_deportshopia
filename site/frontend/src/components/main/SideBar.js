import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../../assets/images/logos/nvidia.png';
import SideBarItem from './SideBarItem';

const array = [
	{ icon: "search", name: "Search", href: "/search" },
	{ icon: "folder", name: "Pages" , href: "/pages"},
	{ icon: "chart-area", name: "Charts", href: "/charts"},
	{ icon: "table", name: "Tables", href: "/tables" }

];

function SideBar() {
    return (
		<>
			{/* <!-- Sidebar --> */}
			<ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

				{/* <!-- Sidebar - Brand --> */}
				<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
					<div className="sidebar-brand-icon">
						<img className="w-100" src={logo} alt="Nvidia Logo" />
					</div>
				</a>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider my-0" />

				{/* <!-- Nav Item - Dashboard --> */}
				<li className="nav-item active">
					<Link className="nav-link" to="/">
						<i className="fas fa-fw fa-tachometer-alt"></i>
						<span>LaniakShop - Dashboard</span>
					</Link>
				</li>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider" />

				{/* <!-- Heading --> */}
				<div className="sidebar-heading">Actions</div>

				{/* <!-- Nav Items --> */}
				{ array.map( (item,idx) => <SideBarItem iconName={item.icon} name={item.name} href_custom={item.href} key={idx} /> ) }


				{/* <!-- Divider --> */}
				<hr className="sidebar-divider d-none d-md-block" />
			</ul>
			{/* <!-- End of Sidebar --> */}
		</>
    );
}

export default SideBar;