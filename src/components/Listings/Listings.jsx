/** @format */

import Navbar from "../Navbar";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL, formatDate } from "../../constants";
import Pagination from "../Pagination";

const Listings = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const user_id = searchParams.get("user_id");
	const nav = [
		["Home", `/listings?user_id=${user_id}`, true],
		["My Profile", `/profile?user_id=${user_id}`, false],
		["My Ads", `/listings/myAds?user_id=${user_id}`, false],
		["My Wishlist", `/listings/myWishlist?user_id=${user_id}`, false],
		["Chats", `/chat?user_id=${user_id}`, false],
	];

	const [listings, setListings] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("All Ads");
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// get all listings by category
	useEffect(() => {
		setLoading(true);
		fetch(API_URL + `/listings/get_listings.php?category=${selectedCategory}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.listings);
				setListings(data.listings);
				setLoading(false);
			});
	}, [selectedCategory]);

	const [allCategories, setAllCategories] = useState([]);
	// fetch all catergories
	useEffect(() => {
		fetch(API_URL + "listings/get_categories.php")
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				setAllCategories(data.categories);
			});
	}, [user_id]);

	const [loading, setLoading] = useState(true); // Add loading state

	// get listings by search term
	const handleSearch = (e) => {
		e.preventDefault();
		setLoading(true);
		fetch(API_URL + `/listings/search_listing.php?search_term=${searchTerm}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.search_results);
				setListings(data.search_results);
				setLoading(false);
			});
	};

	// pagination code
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(6);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = listings?.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(listings?.length / recordsPerPage);

	return (
		<main id='new-listings'>
			<Header role='user' />
			<Navbar navlist={nav} />
			<section>
				<div className={`sidebar ${isOpen ? "open" : ""}`}>
					<div className='menu-toggle' onClick={toggleMenu}>
						{/*<i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>*/}
						<div>+</div>
					</div>
					<ul className={`${isOpen ? "open" : ""}`}>
						<li
							className={selectedCategory === "All Ads" ? "active" : ""}
							onClick={() => setSelectedCategory("All Ads")}>
							All Categories
						</li>
						{allCategories.map((category) => (
							<li
								key={category.id}
								className={selectedCategory === category.name ? "active" : ""}
								onClick={(e) => setSelectedCategory(category.name)}>
								{category.name}
							</li>
						))}
					</ul>
				</div>
				<div className='main-content'>
					<form className='search-form' action='submit'>
						<div style={{ width: "50%" }}>
							<input
								style={{ width: "100%" }}
								type='text'
								placeholder='Search for items'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className='buttons'>
							<button onClick={handleSearch}>Search</button>
							<Link to={`/listings/newAd?user_id=${user_id}`}>
								<button>Post Ad</button>
							</Link>
						</div>
					</form>
					{loading ? (
						<div>Loading...</div>
					) : (
						<div>
							<h2 style={{ padding: "18px 2px" }}>{selectedCategory}</h2>

							{currentRecords?.length !== 0 ? (
								<div id='card-container'>
									{currentRecords?.map((listing) => (
										<Link
											key={listing.ad_id}
											className='listing-card'
											to={`/listings/view?user_id=${user_id}&id=${listing.ad_id}`}>
											<div>
												<img
													src={`${API_URL}${listing?.photo1?.replace(
														"../",
														""
													)}`}
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
								<div style={{ padding: "0px 1px" }}>
									No listings found in this category
								</div>
							)}
						</div>
					)}
				</div>
			</section>
			{listings?.length != 0 && (
				<Pagination
					nPages={nPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</main>
	);
};

export default Listings;
