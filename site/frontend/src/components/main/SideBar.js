import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../../assets/images/logos/nvidia.png';
import SideBarItem from './SideBarItem';

const array = [
	{ icon: "search", name: "Search", href: "/search" },
	{ icon: "star", name: "Best Seller" , href: "/pages"},
	{ icon: "chart-area", name: "Stats", href: "/charts"},
	{ icon: "archive", name: "Products Categories", href: "/tables" },
	{ icon: "table", name: "Users List", href: "/users"}

];

function SideBar() {
    return (
		<>
			{/* <!-- Sidebar --> */}
			<ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

				{/* <!-- Sidebar - Brand --> */}
				<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
					<Link to="/home">
						<div className="sidebar-brand-icon">
							{/* <img className="w-100" src={logo} alt="Nvidia Logo" /> */}
							<h2>LANIAKSHOP</h2>
						</div>
					</Link>
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