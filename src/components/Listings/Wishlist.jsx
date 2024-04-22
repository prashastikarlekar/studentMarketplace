/** @format */

import Navbar from "../Navbar";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";

const Wishlist = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");
	const nav = [
		// ["Home", "/", true],
		// ["Listings", "/about", false],
		// ["Contact Us", "/contact", false],
		// ["Blog", "https://bxg6038.uta.cloud/wp", false],
		["Home", `/listings?user_id=${user_id}`, false],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["My Ads", `/listings/myAds?user_id=${user_id}`, false],
		["My Wishlist", `/listings/myWishlist?user_id=${user_id}`, true],
		["Chats", `/chat?user_id=${user_id}`, false],
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { month: "short", day: "numeric" };
		return date.toLocaleDateString("en-US", options); // 'en-US' for English language, change if needed
	};

	const [listings, setListings] = useState([]);
	// const [selectedCategory, setSelectedCategory] = useState("All Ads");

	useEffect(() => {
		setLoading(true);
		fetch(API_URL + `/wishlist/get_wishlist.php?user_id=${user_id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.wishlist);
				setListings(data.wishlist);
				setLoading(false);
			});
	}, [user_id]);

	const [loading, setLoading] = useState(true); // Add loading state

	return (
		<main id='new-listings'>
			<Header role='user' />
			<Navbar navlist={nav} />
			<section style={{ padding: "50px" }}>
				<div>
					{listings?.length != 0 ? (
						<div id='card-container'>
							{listings?.map((listing) => (
								<Link
									key={listing.id}
									className='listing-card'
									to={`/listings/view?user_id=${user_id}&id=${listing.id}`}>
									<div>
										<img
											src={`${API_URL}${listing?.photo1?.replace("../", "")}`}
											alt=''
										/>
									</div>
									<div>{listing.title}</div>
									<div className='card-footer'>
										<div>{formatDate(listing.posting_date)}</div>
										<div>{listing.university}</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div
							style={{
								display: "flex",

								justifyContent: "center",
								fontSize: "20px",

								padding: "20px",
							}}>
							You have not added any ads to your wishlist.
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default Wishlist;
