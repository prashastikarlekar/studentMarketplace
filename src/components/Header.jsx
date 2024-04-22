/** @format */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ role }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div>
			<header>
				<div id='left'>
					<div>Student Marketplace</div>
					{/* <div>Integrated Healthcare Ecosystem</div> */}
				</div>

				{role !== "signup" && (
					<div className='buttons'>
						{
							!role ? (
								<>
									<Link to='/register'>
										<button>Register</button>
									</Link>
									<Link to='/login'>
										<button>Log In</button>
									</Link>
								</>
							) : (
								<>
									<Link to='/login'>
										<button>Log out</button>
									</Link>
								</>
							) // <div style={{ position: "relative" }}>
							// 	<img
							// 		src=''
							// 		alt=''
							// 		onClick={toggleDropdown}
							// 		style={{ cursor: "pointer" }}
							// 	/>

							// 	{isDropdownOpen && (
							// 		<div
							// 			className='dropdown'
							// 			style={{ position: "absolute", top: "98%", left: "-92px" }}>
							// 			<ul>
							// 				<Link to={`/${role}/profile?user_id=${user_id}`}>
							// 					My Profile
							// 				</Link>
							// 				{role === "patient" && (
							// 					<Link
							// 						to={`/patient/medicalReminders?user_id=${user_id}`}>
							// 						Medical Reminders
							// 					</Link>
							// 				)}
							// 				<Link to={`/chat?role=${role}&user_id=${user_id}`}>
							// 					My Messages
							// 				</Link>

							// 				<Link to='/login'>Sign Out</Link>
							// 			</ul>
							// 		</div>
							// 	)}
							// </div>
						}
					</div>
				)}
			</header>
		</div>
	);
};

export default Header;
