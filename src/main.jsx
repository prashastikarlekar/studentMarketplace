/** @format */

import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Home/Register.jsx";
import Login from "./components/Home/Login.jsx";
import ForgotPassword from "./components/Home/ForgotPassword.jsx";
import Listings from "./components/Listings/Listings.jsx";
import NewAd from "./components/Listings/NewAd.jsx";
import DisplayListing from "./components/Listings/DisplayListing.jsx";
import Wishlist from "./components/Listings/Wishlist.jsx";
import Profile from "./components/Profile/Profile.jsx";
import EditProfile from "./components/Profile/EditProfile.jsx";
import MyAds from "./components/Listings/MyAds.jsx";

import EditAd from "./components/Listings/EditAd.jsx";
import Admin from "./components/Admin/Admin.jsx";
import EditUser from "./components/Admin/EditUser.jsx";
import ContactUs from "./components/Home/ContactUs.jsx";
import Contacts from "./components/Admin/Contacts.jsx";
import Chat from "./components/Chat.jsx";

const appRouter = createBrowserRouter([
	{ path: "", element: <Home /> },
	{ path: "register", element: <Register /> },
	{ path: "login", element: <Login /> },
	{ path: "forgot-password", element: <ForgotPassword /> },
	{ path: "contact", element: <ContactUs /> },
	{ path: "profile", element: <Profile role='user' /> },
	{ path: "editProfile", element: <EditProfile role='user' /> },
	{ path: "chat", element: <Chat /> },
	{
		path: "admin",
		element: <Outlet />,
		children: [
			{ path: "", element: <Admin /> },
			{
				path: "editUser",
				element: <EditUser />,
			},
			{ path: "contacts", element: <Contacts /> },
		],
	},
	{
		path: "listings",
		element: <Outlet />,
		children: [
			{
				path: "",
				element: <Listings />,
			},
			{ path: "newAd", element: <NewAd /> },
			{ path: "view", element: <DisplayListing /> },
			{ path: "myWishlist", element: <Wishlist /> },
			{ path: "myAds", element: <MyAds /> },
			{ path: "editAd", element: <EditAd /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={appRouter}>
		<App />
	</RouterProvider>
);
