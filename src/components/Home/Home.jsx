/** @format */

import Navbar from "../Navbar";

import home from "../../assets/home.jpg";
import Header from "../Header";

const Home = () => {
	const nav = [
		["Home", "/", true],
		// ["Listings", "/about", false],
		["Contact Us", "/contact", false],
		// ["Blog", "https://bxg6038.uta.cloud/wp", false],
	];

	return (
		<main id='home'>
			<Header />

			<Navbar navlist={nav} />
			<section>
				<div className='img-container'>
					<div style={{ width: "50%" }}>
						<p className='heading'>
							Your Campus, Your Marketplace: Shop, Sell, Connect
						</p>
						<p style={{ padding: "15px 0px" }}>
							Explore a variety of items within your educational community
						</p>
					</div>

					<div style={{ width: "50%" }}>
						<img src={home} alt='Home' />
					</div>
				</div>
				<div>
					<ul id='features'>
						<li>
							Join our dynamic student marketplace, where trading goods is
							effortless and secure.
						</li>
						<li>
							Explore our platform, dedicated to streamlining student life with
							a secure space for buying, selling, and networking.
						</li>
						<li>
							Immerse yourself in a marketplace exclusively for students,
							fostering sustainability and community connections.
						</li>
						<li>
							Step into a realm of student-centric commerce, where accessibility
							and affordability create a thriving ecosystem.
						</li>
						<li>
							Embrace a fresh approach to student essentials, backed by powerful
							features and a united community.
						</li>
					</ul>
				</div>
			</section>
		</main>
	);
};

export default Home;
