/** @format */

import Navbar from "../Navbar";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";

const Admin = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");
	const nav = [
		["Home", `/admin?user_id=${user_id}`, true],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["Guest Inquiries", `/admin/contacts?user_id=${user_id}`, false],
	];

	const [listings, setListings] = useState([]);
	// const [selectedCategory, setSelectedCategory] = useState("All Ads");

	const [loading, setLoading] = useState(true); // Add loading state

	const handleDelete = (userId) => {
		const formData = new FormData();
		formData.append("user_id", userId);

		fetch(API_URL + "admin/delete_user.php", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					response.json().then((a) => {
						// setMessage(a.message);
						alert(a.message);
						setUsers((prevUsers) =>
							prevUsers.filter((user) => user.id !== userId)
						);
					});
				} else {
					alert("Failed to delete user.");
				}
			})

			.catch((error) => {
				console.error("Error while deleting user:", error);
			});
	};

	const [users, setUsers] = useState([]);

	useEffect(() => {
		// Make a GET API call to fetch users
		// fetch(API_URL + `admin/get_users.php?user_id=${user_id}`)
		fetch(API_URL + `admin/get_users.php`)
			.then((response) => response.json())
			.then((data) => {
				console.log("Users:", data);
				setUsers(data.users);
			})
			.catch((error) => {
				console.error("Error fetching users:", error);
			});
	}, [user_id]);

	return (
		<main id='admin'>
			<Header role='admin' />
			<Navbar navlist={nav} />
			<section style={{ padding: "50px" }}>
				<div className='heading'>Manage Users</div>
				<div id='table'>
					<table id='records'>
						<thead>
							<tr>
								<th>ID</th>
								<th>First Name</th>
								<th>Last Name</th>

								<th>Email Address</th>
								<th>Phone</th>
								<th>Address</th>
								<th>City</th>
								<th>State</th>
								<th>Pincode</th>
								<th>University</th>
								<th>Rating</th>

								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{users?.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.first_name} </td>
									<td>{user.last_name}</td>

									<td>{user.email}</td>
									<td>{user.phone}</td>
									<td>{user.address}</td>
									<td>{user?.city}</td>
									<td>{user?.state}</td>
									<td>{user?.pincode}</td>
									<td>{user?.university}</td>
									<td>{user?.rating ? user?.rating : "0"}</td>

									<td>
										<button>
											<Link
												to={`/admin/editUser?user_id=${user_id}&edit_id=${user.id}&firstName=${user.first_name}&lastName=${user.last_name}&city=${user.city}&state=${user.state}&pincode=${user.pincode}&university=${user.university}&email=${user.email}&phone=${user.phone}&address=${user.address}&rating=${user.rating}`}>
												Edit
											</Link>
										</button>

										<button onClick={() => handleDelete(user.id)}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
};

export default Admin;
