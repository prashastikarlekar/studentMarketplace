/** @format */

export const API_URL = "http://localhost/student-marketplace-backend/";
export const formatDate = (dateString) => {
	const date = new Date(dateString);
	const options = { month: "short", day: "numeric" };
	return date.toLocaleDateString("en-US", options); // 'en-US' for English language, change if needed
};
