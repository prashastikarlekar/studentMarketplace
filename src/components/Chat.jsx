/** @format */

import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { API_URL } from "../constants";

const Chat = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const user_id = queryParams.get("user_id");
	// const receiver_id = queryParams.get("receiver_id");
	const [receiver, setReciever] = useState(0);

	const [listing_id, setListingId] = useState(0);
	const nav = [
		["Home", `/listings?user_id=${user_id}`, false],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["My Ads", `/listings/myAds?user_id=${user_id}`, false],
		["My Wishlist", `/listings/myWishlist?user_id=${user_id}`, false],
	];

	const [showConversationModal, setShowConversationModal] = useState(false);

	const [conversation, setConversation] = useState([]);
	const [messageContent, setMessageContent] = useState("");

	// const [selectedUser, setSelectedUser] = useState(null);
	const [conversationMessages, setConversationMessages] = useState([]);
	const [myChats, setMyChats] = useState([]);
	const handleCloseConversationModal = () => setShowConversationModal(false);
	const handleShowConversationModal = (receiver_id, listing_id) => {
		setShowConversationModal(true);
		setReciever(receiver_id);
		setListingId(listing_id);
	};

	const handleSend = () => {
		// console.log("recipientName:", recipientName);
		// const bodyData = new FormData();
		// bodyData.append("sender_id", user_id);
		// bodyData.append("receiver_id", receiver);
		// bodyData.append("listing_id", listing_id);
		// bodyData.append("content", messageContent);
		// console.log(bodyData);
		const bodyData = {
			sender_id: user_id,
			receiver_id: receiver,
			listing_id: listing_id,
			content: messageContent,
		};
		console.log(bodyData);
		try {
			const response = fetch(API_URL + "chat/new_message.php", {
				method: "POST",

				body: JSON.stringify(bodyData),
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
		} catch (error) {
			// Handle errors here
			console.error("Error sending message:", error);
			alert("An error occurred while sending the message.");
		}
	};

	// get all users with whom this user has interacted
	useEffect(() => {
		console.log(user_id);
		fetch(API_URL + `chat/get_my_conversations.php?user_id=${user_id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log("Messages :", data);
				setMyChats(data.chats);
				// setMyChats(data.messages);
			})
			.catch((error) => {
				console.error("Error fetching users:", error);
			});
	}, [user_id]);

	useEffect(() => {
		// setConversations([]);
		if (showConversationModal) {
			const timer = setInterval(() => {
				const endpoint = `${API_URL}chat/get_chat?user1_id=${user_id}&user2_id=${receiver}`;
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
			}, 2000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [receiver]);

	return (
		<>
			<Header role='user' />
			<Navbar navlist={nav} />

			<div className='container'>
				<section className='chat'>
					<h2>Chats</h2>
					<div className='chat-history'>
						{myChats?.map((c, index) => (
							<div
								id='chat-history-item'
								key={index}
								onClick={() =>
									handleShowConversationModal(
										c.receiver_id == user_id ? c.sender_id : c.receiver_id,
										c.listing_id
									)
								}>
								<p>
									Listing : <strong>{c.title}</strong>
								</p>
								{c.sender_id == user_id ? (
									<span>You:</span>
								) : (
									<span>From: {c.sender_name}</span>
								)}
							</div>
						))}
					</div>
				</section>
			</div>

			<Modal
				show={showConversationModal}
				onHide={handleCloseConversationModal}
				backdrop='static'>
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
					<div className='btn-group'>
						<Button variant='secondary' onClick={handleCloseConversationModal}>
							Close
						</Button>
						<Button variant='primary' onClick={handleSend}>
							Send
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Chat;
