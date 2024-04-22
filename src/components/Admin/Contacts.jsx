/** @format */

import Navbar from "../Navbar";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";

const Contacts = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");
	const nav = [
		["Home", `/admin?user_id=${user_id}`, false],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["Guest Inquiries", `/admin/contacts?user_id=${user_id}`, true],
	];

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		// Make a GET API call to fetch users
		// fetch(API_URL + `admin/get_users.php?user_id=${user_id}`)
		fetch(API_URL + `admin/get_contacts.php`)
			.then((response) => response.json())
			.then((data) => {
				console.log("Messages:", data);
				setMessages(data.messages);
			})
			.catch((error) => {
				console.error("Error fetching messages:", error);
			});
	}, [user_id]);

	return (
		<main id='admin'>
			<Header role='admin' />
			<Navbar navlist={nav} />
			<section style={{ padding: "50px" }}>
				<div className='heading'>Messages from Contact Us Form</div>
				<div id='table'>
					<table id='records'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email Address</th>
								<th>Message</th>
							</tr>
						</thead>
						<tbody>
							{messages?.map((message) => (
								<tr key={message.id}>
									<td>{message.id}</td>
									<td>{message.name} </td>
									<td>{message.email}</td>

									<td>{message.message}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
};

export default Contacts;
