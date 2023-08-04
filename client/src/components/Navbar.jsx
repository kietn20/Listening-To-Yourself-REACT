import "./Navbar.css";
import { Link } from "react-router-dom";
import { BsSpotify } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../App";

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
				<Link to="/">
					<img className="logo" src="./LISTEN.svg" alt="mylogo" />
				</Link>
				<div className="navlinks">
					<Link to="/">Home</Link>
					<Link to={access_token ? "/top-songs" : `${server}/login`}>
						Top Songs
					</Link>
					<Link to={access_token ? "/moods" : `${server}/login`}>
						Moods
					</Link>
				</div>
			</div>
			<div className="navbar-rightside">
				{!access_token ? (
					<Link to={`${server}/login`}>
						<h4>Login With Spotify</h4>
						<BsSpotify className="spotifyIcon" />
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
