import "./Topsongs.css";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useState } from "react";

export const Topsongs = () => {
	const [inputs, setInputs] = useState({
		limit: 5,
		timeRange: "short_term",
	});

	const handleChange = (event) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div className="topsongs-conatiner">
			<h1>My Top Songs</h1>
			<h1>limit: {inputs.limit}</h1>
			<h1>limit: {inputs.timeRange}</h1>
			<div className="topsongs-form">
				<form>
					<select name="limit" required onChange={handleChange}>
						<option value="" defaultValue="# of Songs" disabled>
							# of Songs
						</option>
						<option value={5}>Five</option>
						<option value={10}>Ten</option>
						<option value={20}>Twenty</option>
					</select>
					<label>&nbsp; from the past &nbsp;</label>
					<select name="timeRange" required onChange={handleChange}>
						<option value="" defaultValue="Time Period" disabled>
							Time Period
						</option>
						<option value="short_term">30 Days</option>
						<option value="medium_term">6 Months</option>
						<option value="long_term">Several Years</option>
					</select>
				</form>
			</div>
		</div>
	);
};
