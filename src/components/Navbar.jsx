/** @format */

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ navlist }) => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
			setIsOpen(false); // Close the menu on resize
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<nav className={`navBar ${isOpen ? "open" : ""}`}>
			<div className='menu-toggle' onClick={toggleMenu}>
				{/*<i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>*/}
				<div>+</div>
			</div>
			<ul className={`nav-links ${isOpen ? "open" : ""}`}>
				{navlist.map(([navItem, route, active]) => (
					<li
						key={navItem}
						className={active ? "active" : ""}
						style={{ padding: "10px 20px" }}>
						{navItem === "Blog" ? (
							<a href={route} target='_blank' rel='noopener noreferrer'>
								{navItem}
							</a>
						) : (
							<Link to={route}>{navItem}</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
