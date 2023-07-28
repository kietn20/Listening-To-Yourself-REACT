import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export const Navbar = ({ token }) => {
	// const [token, setToken] = useState("");

	// useEffect(() => {
	// 	const getToken = async () => {
	// 		const response = await axios("http://localhost:3000/auth/token");
	// 		console.log(
	// 			"response.data.access_token: " + response.data.access_token
	// 		);
	// 		setToken(response.data.access_token);
	// 	};

	// 	getToken();
	// }, []);

	// const login = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			"http://localhost:3000/auth/login"
	// 		);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	return (
		<div className="navbar">
			<div className="navbar-leftside">
				<a href="">
					<img src="./src/assets/cat.png" alt="mylogo" />
				</a>
				<div className="navlinks">
					<Link to="/">Home</Link>
					<Link to="/top-songs">Top Songs</Link>
					<Link to="/moods">Moods</Link>
					{token === "" ? (
						<Link to="http://localhost:3000/login">Login</Link>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="navbar-rightside">
				<h4>~ for Spotify ~</h4>
			</div>
		</div>
	);
};
