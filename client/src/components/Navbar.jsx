import "./Navbar.css";
import { Link } from "react-router-dom";
import { BsSpotify } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";

export const Navbar = ({ access_token }) => {
	const [displayName, setDisplayName] = useState("");
	const getUser = async () => {
		try {
			const response = await axios.get("https://api.spotify.com/v1/me", {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
			});
			setDisplayName(response.data.display_name);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (access_token) getUser();
	}, [access_token]);

	return (
		<div className="navbar">
			<div className="navbar-leftside">
				<a href="">
					<img src="./assets/cat.png" alt="mylogo" />
				</a>
				<div className="navlinks">
					<Link to="/">Home</Link>
					<Link
						to={
							access_token
								? "/top-songs"
								: "http://localhost:3000/login"
						}
					>
						Top Songs
					</Link>
					<Link
						to={
							access_token
								? "/moods"
								: "http://localhost:3000/login"
						}
					>
						Moods
					</Link>
				</div>
			</div>
			<div className="navbar-rightside">
				{access_token === "" ? (
					<Link to="http://localhost:3000/login">
						Login <BsSpotify className="spotifyIcon" />
					</Link>
				) : (
					<div className="displayName">
						<h4>{displayName}</h4>
						<BsSpotify className="spotifyIcon" />
					</div>
				)}
			</div>
		</div>
	);
};
