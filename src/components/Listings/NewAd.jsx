/** @format */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

import Navbar from "../Navbar";
import Header from "../Header";

const NewAd = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");

	const nav = [
		["Home", `/listings?user_id=${user_id}`, false],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["My Ads", `/listings/myAds?user_id=${user_id}`, false],
		["My Wishlist", `/listings/myWishlist?user_id=${user_id}`, false],
		["Chats", `/chat?user_id=${user_id}`, false],
	];

	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [university, setUniversity] = useState("");
	const [content, setContent] = useState("");
	const [category, setcategory] = useState("");
	const [photos, setPhotos] = useState({ photo1: null });

	const handlePhotoChange = (e, photoKey) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPhotos((prevPhotos) => ({
					...prevPhotos,
					[photoKey]: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const [allCategories, setAllCategories] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(
			"Posting Ad with data:",
			title,
			price,
			university,
			content,
			category,
			photos.photo1
		);
		const bodyData = new FormData();
		bodyData.append("user_id", user_id);
		bodyData.append("title", title);
		bodyData.append("price", price);
		bodyData.append("university", university);
		bodyData.append("content", content);
		bodyData.append("category", category);
		// bodyData.append("photo1", photos.photo1);
		if (photos.photo1) {
			bodyData.append("uploadfile", photos.photo1);
		}

		try {
			const response = await fetch(API_URL + "listings/create_listing.php", {
				method: "POST",
				body: bodyData,
			});

			const responseData = await response.json();

			if (response.ok) {
				if (responseData.success) {
					alert(responseData.message);
					navigate(`/listings?user_id=${user_id}`);
				} else {
					alert("Ad was not posted: " + responseData.message);
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
			console.error("Error while posting:", error);
			// alert("An error occurred while posting ad.");
		}
	};

	// fetch all catergories
	useEffect(() => {
		fetch(API_URL + "listings/get_categories.php")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setAllCategories(data.categories);
			});
	}, [user_id]);

	return (
		<main id='new-listings'>
			<Header role='signup' />
			<Navbar navlist={nav} />

			<section style={{ padding: "20px" }}>
				<form id='listing-form' encType='multipart/form-data'>
					<div className='heading'>Post an Ad</div>
					<div className='field'>
						<label htmlFor='title'>Title</label>
						<input
							required
							type='text'
							id='title'
							name='title'
							placeholder='Enter title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='price'>Price</label>
						<input
							required
							type='text'
							id='price'
							name='price'
							placeholder='Enter price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div className='field'>
						<label htmlFor='university'>University</label>
						<input
							required
							type='text'
							id='university'
							name='university'
							placeholder='Enter university'
							value={university}
							onChange={(e) => setUniversity(e.target.value)}
						/>
					</div>

					<div className='field'>
						<label htmlFor='category'>Category</label>
						<select
							value={category}
							onChange={(e) => setcategory(e.target.value)}>
							<option value=''>Select Category</option>
							{allCategories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className='field'>
						<label htmlFor='content'>Content</label>
						<textarea
							required
							rows='20'
							type='text'
							id='content'
							name='content'
							placeholder='Enter content'
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>

					<div className='field'>
						<label htmlFor='photo1'>Upload Photos</label>
						<input
							type='file'
							id='photo1'
							name='userfile'
							onChange={(e) => handlePhotoChange(e, "photo1")}
						/>
					</div>
					{/* <div className='field'>
						<label htmlFor='photo2'>Photo 2</label>
						<input
							type='file'
							id='photo2'
							name='uploadfile'
							onChange={(e) => handlePhotoChange(e, "photo2")}
						/>
					</div> */}

					<button type='submit' onClick={handleSubmit}>
						Post
					</button>
				</form>
			</section>
		</main>
	);
};

export default NewAd;
