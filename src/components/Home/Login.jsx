/** @format */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import buy from "../../assets/buy.png";

import Navbar from "../Navbar";
import Header from "../Header";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const nav = [
		["Home", "/", false],
		// ["Listings", "/about", false],
		["Contact Us", "/contact", false],
	];
	const handleLogin = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);

		try {
			const response = await fetch(API_URL + "login.php", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData);
				// alert("Login successful!");
				if (responseData.success) {
					if (responseData.role === "admin") {
						navigate(`/admin?user_id=${responseData.user_id}`);
					} else {
						navigate(`/listings?user_id=${responseData.user_id}`);
					}
				} else {
					alert("Login failed: " + responseData.message);
				}

				//else if (responseData.role_id === 2) {
				// 	navigate(`/patient?user_id=${responseData.user_id}`);
				// } else if (responseData.role_id === 3) {
				// 	navigate(`/healthcareProvider?user_id=${responseData.user_id}`);
				// } else if (responseData.role_id === 4) {
				// 	navigate(`/pharmacist?user_id=${responseData.user_id}`);
				// } else if (responseData.role_id === 5) {
				// 	navigate(`/healthcareAdmin?user_id=${responseData.user_id}`);
				// } else {
				// 	alert("Login failed: " + responseData.message);
				// }
			} else {
				const errorData = await response.json();
				// console.error("Error while logging in:", errorData);
				alert(
					"An error occurred while logging in. Please enter correct password!",
					errorData
				);
			}
		} catch (error) {
			// console.error("Error while logging in:", error);
			alert(
				"An error occurred while logging in. Please enter correct password!",
				error
			);
		}
	};
	return (
		<main id='login'>
			<Header role='' />
			<Navbar navlist={nav} />

			<section>
				<form id='login-form'>
					<div className='heading'>LOGIN</div>
					<div className='field' style={{ gap: "8px" }}>
						<input
							type='email'
							name='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<br />
					<div className='field' style={{ gap: "8px" }}>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<br />
					<Link to='/forgot-password'>Forgot Password?</Link>
					<br />

					<button onClick={handleLogin}>Login</button>
					<br />
					<Link to='/register'>Not an existing user? Register today!</Link>
				</form>
			</section>
		</main>
	);
};

export default Login;
