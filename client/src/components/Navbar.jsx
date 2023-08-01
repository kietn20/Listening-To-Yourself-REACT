import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export const Navbar = ({ token }) => {
	return (
		<div className="navbar">
			<div className="navbar-leftside">
				<a href="">
					<img src="./src/assets/cat.png" alt="mylogo" />
				</a>
				<div className="navlinks">
					<Link to="/">Home</Link>
					<Link
						to={
							token ? "/top-songs" : "http://localhost:3000/login"
						}
					>
						Top Songs
					</Link>
					<Link
						to={
							token ? "/moods" : "http://localhost:3000/login"
						}
					>
						Moods
					</Link>
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
