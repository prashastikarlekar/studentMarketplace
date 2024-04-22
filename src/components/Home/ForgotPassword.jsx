/** @format */
import { useState } from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import { API_URL } from "../../constants";

const ForgotPassword = () => {
	const nav = [
		["Home", "/", false],
		// ["Listings", "/about", false],
		["Contact Us", "/contact", false],
		["Blog", "https://bxg6038.uta.cloud/wp", false],
	];
	const [email, setEmail] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("email", email);

		try {
			const response = await fetch(API_URL + "forgot_password.php", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const responseData = await response.json();
				alert(responseData.message);
				console.log(responseData);
				if (responseData.success) {
					// console.log(responseData);
					alert(responseData.message);
				} else {
					alert("Password reset failed: " + responseData.message);
				}

				// alert("Password reset link sent to your email.");
			}
		} catch (error) {
			console.error("Error while logging in:", error);
			// alert("An error occurred while logging in.");
			alert("Failed to send reset link. Please try again later.");
		}
	};
	return (
		<main id='login'>
			<Header />
			<Navbar navlist={nav} />

			<section>
				<form id='login-form' onSubmit={handleSubmit}>
					<div className='heading'>FORGOT PASSWORD</div>
					<h4>Submit your email id to get a link to reset password.</h4>

					<div className='field'>
						<input
							type='text'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<button type='submit'>Submit</button>
				</form>
			</section>
		</main>
	);
};

export default ForgotPassword;
