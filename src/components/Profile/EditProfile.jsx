/** @format */

import Header from "../Header";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../constants";

const EditProfile = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const user_id = queryParams.get("user_id");
	const role = queryParams.get("role");
	let nav = [];
	if (role === "admin") {
		nav = [
			["Home", `/admin?user_id=${user_id}`, false],
			["My Profile", `/profile?user_id=${user_id}`, false],
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

	const firstName = queryParams.get("firstName");
	const lastName = queryParams.get("lastName");
	const email = queryParams.get("email");
	//const password = queryParams.get("password");
	const phone = queryParams.get("phone");
	const address = queryParams.get("address");
	const city = queryParams.get("city");
	const state = queryParams.get("state");
	const pincode = queryParams.get("pincode");
	const university = queryParams.get("university");

	const [formData, setFormData] = useState({
		userFirstname: firstName,
		userLastname: lastName,
		userEmail: email,
		userPhone: phone,
		userAddress: address,
		userCity: city,
		userState: state,
		userPincode: pincode,
		//userPassword: password,
		userUniversity: university,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const {
			userFirstname,
			userLastname,
			userEmail,
			//userPassword,
			userPhone,
			userAddress,
			userCity,
			userState,
			userPincode,
			userUniversity,
		} = formData;

		const apiURL = API_URL + "profile/update_profile.php";

		const body = new FormData();
		body.append("user_id", user_id);
		body.append("first_name", userFirstname);
		body.append("last_name", userLastname);
		body.append("email", userEmail);
		//body.append("password", userPassword);
		body.append("phone", userPhone);
		body.append("address", userAddress);
		body.append("city", userCity);
		body.append("state", userState);
		body.append("pincode", userPincode);
		body.append("university", userUniversity);

		fetch(apiURL, {
			method: "POST",
			body: body,
		})
			.then((response) => {
				if (response.success) {
					response.json().then((a) => {
						alert(a.message);
						navigate(`/profile?user_id=${user_id}`);
					});
				} else {
					response.json().then((a) => {
						alert(a.message);
						navigate(`/profile?user_id=${user_id}`);
					});
				}
			})
			.catch((error) => {
				console.error("Error while updating profile:", error);
				alert("An error occurred while updating profile.");
			});
	};

	return (
		<main id='register'>
			<Header role={role} title='My Profile' />
			<Navbar navlist={nav} />

			<section>
				<form id='register-form' onSubmit={handleSubmit}>
					<div className='heading'>Edit Profile</div>
					<div className='field'>
						<label htmlFor='userFirstname'>First Name</label>
						<input
							required
							type='text'
							id='userFirstname'
							name='userFirstname'
							value={formData.userFirstname}
							onChange={handleChange}
							placeholder='Enter your First Name'
						/>
					</div>
					<div className='field'>
						<label htmlFor='userLastname'>Last Name</label>
						<input
							required
							type='text'
							id='userLastname'
							name='userLastname'
							value={formData.userLastname}
							onChange={handleChange}
							placeholder='Enter your Last Name'
						/>
					</div>

					<div className='field'>
						<label htmlFor='userEmail'>Email Address</label>
						<input
							required
							type='email'
							id='userEmail'
							name='userEmail'
							value={formData.userEmail}
							onChange={handleChange}
							placeholder='Enter your Email Address'
						/>
					</div>

					{/*<div className='field'>
						<label htmlFor='userPassword'>Password</label>
						<input
							required
							type='password'
							id='userPassword'
							name='userPassword'
							value={formData.userPassword}
							onChange={handleChange}
							placeholder='Enter new password'
						/>
	</div>*/}
					<div className='field'>
						<label htmlFor='userPhone'>Phone</label>
						<input
							required
							type='text'
							id='userPhone'
							name='userPhone'
							value={formData.userPhone}
							onChange={handleChange}
							placeholder='Enter your Phone'
						/>
					</div>
					<div className='field'>
						<label htmlFor='userAddress'>Address</label>
						<input
							required
							type='text'
							id='userAddress'
							name='userAddress'
							value={formData.userAddress}
							onChange={handleChange}
							placeholder='Enter your Address'
						/>
					</div>
					<div className='field'>
						<label htmlFor='userCity'>City</label>
						<input
							required
							type='text'
							id='userCity'
							name='userCity'
							value={formData.userCity}
							onChange={handleChange}
							placeholder='Enter your City'
						/>
					</div>
					<div className='field'>
						<label htmlFor='userState'>State</label>
						<input
							required
							type='text'
							id='userState'
							name='userState'
							value={formData.userState}
							onChange={handleChange}
							placeholder='Enter your State'
						/>
					</div>
					<div className='field'>
						<label htmlFor='userPincode'>Pincode</label>
						<input
							required
							type='text'
							id='userPincode'
							name='userPincode'
							value={formData.userPincode}
							onChange={handleChange}
							placeholder='Enter your Pincode'
						/>
					</div>
					<div className='field'>
						<label htmlFor='userUniversity'>University</label>
						<input
							required
							type='text'
							id='userUniversity'
							name='userUniversity'
							value={formData.userUniversity}
							onChange={handleChange}
							placeholder='Enter your University'
						/>
					</div>

					<button type='submit'>Edit</button>
				</form>
			</section>
		</main>
	);
};

export default EditProfile;
