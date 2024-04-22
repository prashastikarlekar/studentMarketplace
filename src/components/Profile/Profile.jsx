/** @format */
import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import Header from "../Header";
import Navbar from "../Navbar";
// import myprofile from "../assets/myprofile.png";
import { Link, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";

const Profile = ({ role }) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");
	const [profile, setProfile] = useState([]);
	let nav = [];
	if (profile?.role === "admin") {
		nav = [
			["Home", `/admin?user_id=${user_id}`, false],
			["My Profile", `/profile?user_id=${user_id}`, true],
			["Guest Inquiries", `/admin/contacts?user_id=${user_id}`, false],
		];
	} else {
		nav = [
			["Home", `/listings?user_id=${user_id}`, false],
			["My Profile", `/profile?user_id=${user_id}`, true],
			["My Ads", `/listings/myAds?user_id=${user_id}`, false],
			["My Wishlist", `/listings/myWishlist?user_id=${user_id}`, false],
			["Chats", `/chat?user_id=${user_id}`, false],
		];
	}

	useEffect(() => {
		// Make a GET API call to fetch profile
		fetch(API_URL + `profile/get_profile.php?user_id=${user_id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log("Profile:", data);
				setProfile(data.user);
			})
			.catch((error) => {
				console.error("Error fetching profile:", error);
			});
	}, [user_id]);
	return (
		<>
			<Header role={role} title='My Profile' />
			<Navbar navlist={nav} />
			<section id='profile'>
				<div className='card'>
					{/* <div className='img'>
						<img src='' />
					</div> */}
					<div className='infos'>
						<div className='name'>
							<h2>{profile?.full_name}</h2>
							<h4>{profile?.email}</h4>
						</div>

						<ul className='stats'>
							<li style={{ paddingLeft: "0px" }}>
								<h3>Phone Number</h3>
								<h4>{profile?.phone}</h4>
							</li>

							<li>
								<h3>Address</h3>
								<h4>{profile?.full_address}</h4>
							</li>
							<li>
								<h3>University</h3>
								<h4>{profile?.university}</h4>
							</li>
						</ul>
						<div className='links'>
							<button>
								<Link
									to={`/editProfile?user_id=${user_id}&role=${profile?.role}&firstName=${profile?.first_name}&lastName=${profile?.last_name}&email=${profile?.email}&address=${profile?.address}&city=${profile?.city}&state=${profile?.state}&pincode=${profile?.pincode}&phone=${profile?.phone}&university=${profile?.university}&password=${profile?.password}`}>
									Edit Profile
								</Link>
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Profile;
