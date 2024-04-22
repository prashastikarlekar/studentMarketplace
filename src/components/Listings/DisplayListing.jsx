/** @format */

import Navbar from "../Navbar";
import Header from "../Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL, formatDate } from "../../constants";
import { Modal, Button } from "react-bootstrap";

const DisplayListing = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");
	const listing_id = searchParams.get("id");
	// const [rating, setRating] = useState(0);
	const nav = [
		["Home", `/listings?user_id=${user_id}`, false],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["My Ads", `/listings/myAds?user_id=${user_id}`, false],
		["My Wishlist", `/listings/myWishlist?user_id=${user_id}`, false],
		["Chats", `/chat?user_id=${user_id}`, false],
	];

	const [listing, setListing] = useState([]);
	const [status, setStatus] = useState("");

	const handleAddToWishlist = async (e) => {
		e.preventDefault();
		console.log("Adding with data:", user_id, listing_id);
		const bodyData = new FormData();
		bodyData.append("user_id", parseInt(user_id));
		bodyData.append("listing_id", parseInt(listing_id));

		try {
			const response = await fetch(API_URL + "wishlist/addToWishlist.php", {
				method: "POST",
				body: bodyData,
			});

			const responseData = await response.json();
			if (response.ok) {
				if (responseData.success) {
					alert(responseData.message);
					// navigate("/login");
				} else {
					alert(responseData.message);
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
			// alert("An error occurred while signing up.");
		}
	};

	const fetchListing = () => {
		fetch(API_URL + `listings/get_listing.php?listing_id=${listing_id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setListing(data.listing[0]);
				setStatus(data?.listing[0]?.status);
			});
	};

	// const fetchRating = () => {
	// 	fetch(API_URL + `listings/get_rating.php?user_id=${listing?.user_id}`)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setRating(data.rating[0].rating);
	// 		});
	// };

	useEffect(() => {
		fetchListing();
		// fetchRating();
	}, [user_id]);

	const [messageContent, setMessageContent] = useState("");
	const [conversation, setConversation] = useState([]);
	const [showChatModal, setShowChatModal] = useState(false);

	const toggleChatModal = () => {
		setShowChatModal(!showChatModal);
	};

	const handleMessage = () => {
		console.log("dfgdfgdfg");
		console.log(user_id, listing.user_id, listing_id, messageContent);

		const formData = {
			sender_id: user_id,
			receiver_id: listing.ad_id,
			listing_id: listing_id,
			content: messageContent,
		};
		console.log(formData);
		try {
			const response = fetch(API_URL + "chat/new_message.php", {
				method: "POST",

				body: JSON.stringify(formData),
			});
			response
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						alert("Message sent successfully!");
						setMessageContent("");
					} else {
						alert("Failed to send message. Please try again.");
					}
				});

			// console.log(response);
			// if (response.ok) {
			// 	// Handle successful response here
			// 	const responseData = response.json();
			// 	if (responseData.success) {
			// 		setMessageContent("");
			// 	}
			// 	// alert("Message sent successfully!");
			// } else {
			// 	// Handle failed response here
			// 	alert("Failed to send message. Please try again.");
			// }
		} catch (error) {
			// Handle errors here
			console.error("Error sending message:", error);
			alert("An error occurred while sending the message.");
		}
	};

	useEffect(() => {
		// setConversations([]);
		if (showChatModal) {
			const timer = setInterval(() => {
				const endpoint = `${API_URL}chat/get_conversation.php?user1_id=${user_id}&user2_id=${listing.user_id}&listing_id=${listing.id}`;
				fetch(endpoint)
					.then((response) => response.json())
					.then((data) => {
						console.log("Messages :", data);
						// setMyChats(data.users);
						setConversation(data.messages);
					})
					.catch((error) => {
						console.error("Error fetching users:", error);
					});
			}, 10000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [showChatModal]);

	const handleStatus = (status) => {
		const apiURL = API_URL + "listings/change_status.php";

		const body = new FormData();
		body.append("listing_id", listing?.listing_id);
		body.append("status", status === "Available" ? "Sold" : "Available");

		fetch(apiURL, {
			method: "POST",
			body: body,
		})
			.then((response) => {
				if (response.ok) {
					return response.json(); // Return the response JSON
				} else {
					throw new Error("Failed to update status"); // Throw an error if the response is not OK
				}
			})
			.then((data) => {
				const newStatus = status === "Available" ? "Sold" : "Available";
				setStatus(newStatus); // Update status state

				alert(data.message);
			})
			.catch((error) => {
				console.error("Error while updating status:", error);
				alert("An error occurred while updating status.");
			});
	};

	const handleEditAd = () => {};

	const [showRating, setShowRating] = useState(false);

	const toggleRating = () => {
		setShowRating(!showRating);
	};

	const [sellerRating, setSellerRating] = useState(0);
	const handleRating = (rating) => {
		setSellerRating(rating);
	};

	const saveRating = () => {
		const apiURL = API_URL + "listings/rate_seller.php";

		const body = new FormData();
		body.append("user_id", listing.ad_id);
		body.append("rating", sellerRating);

		fetch(apiURL, {
			method: "POST",
			body: body,
		})
			.then((response) => {
				if (response.ok) {
					return response.json(); // Return the response JSON
				} else {
					throw new Error("Failed to update rating"); // Throw an error if the response is not OK
				}
			})
			.then((data) => {
				alert(data.message);
			})
			.catch((error) => {
				console.error("Error while updating status:", error);
				alert("An error occurred while updating status.");
			});
	};

	const handleDelete = (listingId) => {
		console.log("In delete", listingId);
		const formData = new FormData();
		formData.append("listing_id", listingId);

		fetch(API_URL + "listings/delete_listing.php", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					response.json().then((a) => {
						// setMessage(a.message);
						alert(a.message);
						navigate(`/listings/myAds?user_id=${user_id}`);
					});
				} else {
					alert("Failed to delete ad.");
				}
			})

			.catch((error) => {
				console.error("Error while deleting ad:", error);
			});
	};

	return (
		<main id='view-listing'>
			<Header role='user' />
			<Navbar navlist={nav} />
			<section style={{ padding: "50px" }}>
				<div className='listing-container'>
					<div id='title'>{listing?.title}</div>
					<div id='price'>Price: ${listing?.price}</div>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div id='date'>
							<div>Posted on : {formatDate(listing?.posting_date)}</div>
							<div> at {listing?.university}</div>
						</div>
						<div>Seller Rating: {listing?.rating ? listing?.rating : "0"}</div>
					</div>
					<div id='image'>
						<img
							src={`${API_URL}${listing?.photo1?.replace("../", "")}`}
							alt=''
						/>
					</div>
					<div id='contact'>
						<div>Address: </div>
						<div>
							{listing?.address}, {listing?.city}, {listing?.state}{" "}
							{listing?.pincode}{" "}
						</div>
					</div>
					<div id='contact'>
						<div>Contact: </div>
						<div>{listing?.phone}</div>
					</div>
					<div id='contact'>
						<div>Email</div>
						<div>{listing?.email}</div>
					</div>
					<div id='button'>
						<button type='submit' onClick={handleAddToWishlist}>
							Add to Wishlist
						</button>
						{listing?.ad_id != user_id && (
							<button onClick={toggleChatModal}>Chat</button>
						)}
						{listing?.ad_id != user_id && (
							<button onClick={toggleRating}>Rate this seller</button>
						)}
						{listing?.ad_id == user_id && (
							<button onClick={() => handleStatus(listing?.status)}>{`Mark as ${
								status == "Available" ? "Sold" : "Available"
							}`}</button>
						)}
						{listing?.ad_id == user_id && (
							<>
								<button onClick={handleEditAd}>
									<Link
										to={`/listings/editAd?user_id=${user_id}&id=${listing?.listing_id}&title=${listing?.title}&price=${listing?.price}&university=${listing?.university}&content=${listing?.content}&category=${listing?.category_id}&photo=${listing?.photo1}`}>
										Edit Ad
									</Link>
								</button>
								<button onClick={() => handleDelete(listing?.listing_id)}>
									Delete Ad
								</button>
							</>
						)}
					</div>
				</div>
			</section>

			{/* Chat modal */}
			<Modal show={showChatModal} onHide={toggleChatModal}>
				<Modal.Header>
					<Modal.Title>Full Conversation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='conversation'>
						{conversation?.map((c, index) => (
							<div
								key={index}
								className={`message ${
									parseInt(c.sender_id) !== parseInt(user_id)
										? "sent"
										: "received"
								}`}>
								<p>{c.content}</p>
							</div>
						))}
					</div>
					<form id='message-form'>
						<div className='chat-form-group'>
							<label htmlFor='message-content'>Message:</label>
							<textarea
								id='message-content'
								name='message-content'
								rows='4'
								required
								value={messageContent}
								onChange={(e) => setMessageContent(e.target.value)}></textarea>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={toggleChatModal}>
						Close
					</Button>
					<Button variant='primary' onClick={handleMessage}>
						Send
					</Button>
				</Modal.Footer>
			</Modal>

			{/* rating modal */}
			<Modal show={showRating} onHide={toggleRating}>
				<Modal.Header>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<label htmlFor='rating'>Rate this seller (between 0 and 10):</label>
						<div>
							{[...Array(5)].map((_, index) => (
								<span
									key={index}
									style={{ cursor: "pointer" }}
									onClick={() => handleRating(index + 1)}>
									{index < sellerRating ? "★" : "☆"}
								</span>
							))}
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={toggleRating}>
						Close
					</Button>
					<Button variant='primary' onClick={saveRating}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</main>
	);
};

export default DisplayListing;
