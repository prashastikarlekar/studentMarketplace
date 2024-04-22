/** @format */

import Header from "../Header";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";

const EditAd = ({ role }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const user_id = queryParams.get("user_id");
	const nav = [
		["Home", `/listings?user_id=${user_id}`, false],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["My Ads", `/listings/myAds?user_id=${user_id}`, false],
		["My Wishlist", `/listings/myWishlist?user_id=${user_id}`, false],
		["Chats", `/chat?user_id=${user_id}`, false],
	];

	const [allCategories, setAllCategories] = useState([]);

	const listing_id = queryParams.get("id");
	const title = queryParams.get("title");
	const price = queryParams.get("price");
	const university = queryParams.get("university");
	const content = queryParams.get("content");
	const category = queryParams.get("category");
	const photo = queryParams.get("photo"); // old photo url

	useEffect(() => {
		fetch(API_URL + "listings/get_categories.php")
			.then((response) => response.json())
			.then((data) => {
				console.log(photo);
				setAllCategories(data.categories);
			});
	}, [user_id]);

	const [remove, setRemove] = useState(false); // to remove uploaded photo
	const [photos, setPhotos] = useState({ photo1: photo }); // for new photo

	const [formData, setFormData] = useState({
		adTitle: title,
		adPrice: price,
		adContent: content,
		adUniversity: university,
		adCategory: category,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handlePhotoChange = (e, photoKey) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				console.log(reader.result);
				setPhotos((prevPhotos) => ({
					...prevPhotos,
					[photoKey]: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const { adTitle, adContent, adPrice, adUniversity, adCategory } = formData;

		const apiURL = API_URL + "listings/update_listing.php";
		console.log(photos.photo);
		const body = new FormData();
		body.append("id", listing_id);
		body.append("title", adTitle);
		body.append("price", adPrice);
		body.append("university", adUniversity);
		body.append("content", adContent);
		body.append("category", adCategory);
		// if (photos.photo1 && remove) {
		body.append("uploadfile", photos.photo1);

		fetch(apiURL, {
			method: "POST",
			body: body,
		})
			.then((response) => {
				if (response.success) {
					response.json().then((a) => {
						alert(a.message);
						alert("in first");
						navigate(`/listings/view?user_id=${user_id}&id=${listing_id}`);
					});
				} else {
					response.json().then((a) => {
						alert(a.message);
						navigate(`/listings/view?user_id=${user_id}&id=${listing_id}`);
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
			<Header role='user' />
			<Navbar navlist={nav} />

			<section>
				<form id='register-form' onSubmit={handleSubmit}>
					<div className='heading'>Edit Profile</div>
					<div className='field'>
						<label htmlFor='adTitle'>Title</label>
						<input
							required
							type='text'
							id='adTitle'
							name='adTitle'
							value={formData.adTitle}
							onChange={handleChange}
							placeholder='Enter Title'
						/>
					</div>
					<div className='field'>
						<label htmlFor='adPrice'>Price</label>
						<input
							required
							type='text'
							id='adPrice'
							name='adPrice'
							value={formData.adPrice}
							onChange={handleChange}
							placeholder='Enter price'
						/>
					</div>

					<div className='field'>
						<label htmlFor='adUniversity'>University Campus</label>
						<input
							required
							type='text'
							id='adUniversity'
							name='adUniversity'
							value={formData.adUniversity}
							onChange={handleChange}
							placeholder='Enter your university'
						/>
					</div>

					<div className='field'>
						<label htmlFor='adContent'>Content</label>
						<textarea
							required
							type='text'
							id='adContent'
							name='adContent'
							value={formData.adContent}
							onChange={handleChange}
							placeholder='Enter content'
						/>
					</div>
					<div className='field'>
						<label htmlFor='adCategory'>Category</label>
						<select
							name='adCategory'
							value={formData.adCategory}
							onChange={handleChange}>
							<option value=''>Select Category</option>
							{allCategories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					{photo == "null" || !photo || photo?.trim().length == 0 ? (
						<>
							<label htmlFor='photo1'>Upload Photos</label>
							<input
								type='file'
								id='photo1'
								name='userfile'
								accept='image/jpeg'
								onChange={(e) => handlePhotoChange(e, "photo1")}
							/>
						</>
					) : (
						<>
							<label htmlFor='photo'>Photo : {photo}</label>
							{/* <button onClick={() => setRemove(true)}>Remove</button> */}
							<div>
								<label htmlFor='photo1'>Replace Photo</label>
								<input
									type='file'
									id='photo1'
									name='userfile'
									accept='image/jpeg'
									onChange={(e) => handlePhotoChange(e, "photo1")}
								/>
							</div>
						</>
					)}

					<button type='submit'>Edit</button>
				</form>
			</section>
		</main>
	);
};

export default EditAd;
