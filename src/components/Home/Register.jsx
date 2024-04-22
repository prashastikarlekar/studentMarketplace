/** @format */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

import Navbar from "../Navbar";
import Header from "../Header";

const Register = () => {
	const navigate = useNavigate();

	const nav = [
		["Home", "/", false],
		// ["Listings", "/about", false],
		["Contact Us", "/contact", false],
	];

	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [address, setAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [university, setUniversity] = useState("");
	const [rating, setRating] = useState(0);
	const [role, setRole] = useState("user");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(
			"Registering user with data:",
			firstname,
			lastname,
			phone,
			city,
			state,
			pincode,
			university,
			rating,
			address,
			email,
			password,
			role
		);
		const bodyData = new FormData();
		bodyData.append("first_name", firstname);
		bodyData.append("last_name", lastname);
		bodyData.append("email", email);
		bodyData.append("password", password);
		bodyData.append("phone", phone);
		bodyData.append("city", city);
		bodyData.append("state", state);
		bodyData.append("address", address);
		bodyData.append("pincode", pincode);
		bodyData.append("university", university);
		bodyData.append("rating", rating);
		bodyData.append("role", role);

		try {
			const response = await fetch(API_URL + "register.php", {
				method: "POST",

				body: bodyData,
			});

			const responseData = await response.json();

			if (response.ok) {
				if (responseData.success) {
					alert("Registration successful!");
					navigate("/login");
				} else {
					alert("Registration failed: " + responseData.message);
				}
			} else {
				// Handle non-200 response (error)
				if (response.status === 422 && responseData.errors) {
					const errorMessages = Object.values(responseData.errors).flat();
					alert("Validation failed: " + errorMessages.join(", "));
				} else {
					alert("Server error: " + responseData.message);
				}
			}
		} catch (error) {
			console.error("Error while signing up:", error);
			alert("An error occurred while signing up.");
		}
	};

	return (
		<main id='register'>
			<Header role='signup' />
			<Navbar navlist={nav} />

			<section>
				<form id='register-form'>
					<div className='heading'>Register to be a Member today!</div>
					<div className='field'>
						<label htmlFor='first-name'>First Name</label>
						<input
							required
							type='text'
							id='first-name'
							name='first-name'
							placeholder='Enter your First Name'
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='last-name'>Last Name</label>
						<input
							required
							type='text'
							id='last-name'
							name='last-name'
							placeholder='Enter your Last Name'
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='email'>Email Address</label>
						<input
							required
							type='email'
							id='email'
							name='email'
							placeholder='Enter your Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
						/>
					</div>
					<div className='field'>
						<label htmlFor='password'>Password</label>
						<input
							required
							type='password'
							id='password'
							name='password'
							placeholder='Enter your Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='phone'>Phone Number</label>
						<input
							required
							type='text'
							id='phone'
							name='phone'
							placeholder='Enter your Phone Number'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							pattern='\d{10}'
						/>
					</div>
					<div className='field'>
						<label htmlFor='address'>Address</label>
						<input
							required
							type='text'
							id='address'
							name='address'
							placeholder='Enter your Address'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='city'>City</label>
						<input
							required
							type='text'
							id='city'
							name='city'
							placeholder='Enter your City'
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='state'>State</label>
						<input
							required
							type='text'
							id='state'
							name='state'
							placeholder='Enter your State'
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='pincode'>Pincode</label>
						<input
							required
							type='text'
							id='pincode'
							name='pincode'
							placeholder='Enter your Pincode'
							value={pincode}
							onChange={(e) => setPincode(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='university'>University</label>
						<input
							required
							type='text'
							id='university'
							name='university'
							placeholder='Enter your University'
							value={university}
							onChange={(e) => setUniversity(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='role'>Role</label>
						<select
							name='role'
							id='role'
							required
							value={role}
							onChange={(e) => setRole(e.target.value)}>
							<option value='user'>Student</option>
							<option value='admin'>Admin</option>
						</select>
					</div>

					<button type='submit' onClick={handleSubmit}>
						Register
					</button>
				</form>
			</section>
		</main>
	);
};

export default Register;
