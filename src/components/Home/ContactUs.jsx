/** @format */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

import Navbar from "../Navbar";
import Header from "../Header";

const ContactUs = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const nav = [
		["Home", "/", false],
		// ["Listings", "/about", false],
		["Contact Us", "/contact", true],
		// ["Blog", "https://bxg6038.uta.cloud/wp", false],
	];
	const handleContactUs = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("message", message);

		try {
			const response = await fetch(API_URL + "contact.php", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData);
				// alert("Login successful!");
				if (responseData.success) {
					alert(responseData.message);
					navigate(`/`);
				} else {
					alert(responseData.message);
				}
			}
		} catch (error) {
			// console.error("Error while logging in:", error);
			alert(
				"An error occurred while contacting. Please try again later!",
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
					<div className='heading'>CONTACT US</div>
					<div className='field' style={{ gap: "8px" }}>
						<input
							type='name'
							name='name'
							placeholder='Enter your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<br />
					<div className='field' style={{ gap: "8px" }}>
						<input
							type='email'
							placeholder='Enter your email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<br />
					<div className='field' style={{ gap: "8px" }}>
						<input
							type='text'
							placeholder='Enter your message'
							name='message'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>

					<br />

					<button onClick={handleContactUs}>Send</button>
					<br />
				</form>
			</section>
		</main>
	);
};

export default ContactUs;
