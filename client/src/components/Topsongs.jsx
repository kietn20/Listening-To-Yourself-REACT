import "./Topsongs.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const Topsongs = ({ access_token }) => {
	const [inputs, setInputs] = useState({
		limit: 5,
		timeRange: "short_term",
	});
	const [songIDs, setSongIds] = useState([]);

	const handleChange = (event) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		console.log("access_token: " + access_token);
		const getSongs = async () => {
			const response = await axios.get(
				"https://api.spotify.com/v1/me/top/tracks",
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
					},
					params: {
						time_range: inputs.timeRange,
						limit: inputs.limit,
					},
				}
			);
			const hold = [];
			await response.data.items.forEach((item) => {
				hold.push(item.id);
			});
			setSongIds(hold);
		};

		getSongs();
	}, [inputs]);

	return (
		<div className="topsongs-conatiner">
			<h1>My Top Songs</h1>
			{/* <h1>limit: {inputs.limit}</h1>
			<h1>limit: {inputs.timeRange}</h1> */}
			<div className="topsongs-form">
				<form>
					<select
						name="limit"
						required
						onChange={handleChange}
						defaultValue={"# of Songs"}
					>
						<option disabled># of Songs</option>
						<option value={5}>Five</option>
						<option value={10}>Ten</option>
						<option value={20}>Twenty</option>
					</select>
					<label>&nbsp; from the past &nbsp;</label>
					<select
						name="timeRange"
						required
						onChange={handleChange}
						defaultValue={"Time Period"}
					>
						<option disabled>Time Period</option>
						<option value="short_term">30 Days</option>
						<option value="medium_term">6 Months</option>
						<option value="long_term">Several Years</option>
					</select>
				</form>
			</div>
			<div className="songs">
				{songIDs.map((id) => (
					<div className="song-item">
						<iframe
							className="song-iframe"
							src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
							width="100%"
							height="152"
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							loading="lazy"
						><div className="song-popout">
							</div>
							</iframe>
					</div>
				))}
			</div>
		</div>
	);
};
