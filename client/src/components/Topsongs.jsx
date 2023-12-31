import "./Topsongs.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Navigate, useNavigate } from "react-router-dom";

export const Topsongs = ({ access_token, setToken, getRefreshToken }) => {
	const [inputs, setInputs] = useState({
		limit: 5,
		timeRange: "short_term",
	});
	const [songIDs, setSongIds] = useState([]);
	const [showRecommendation, setShowRecommendation] = useState(false);
	const [recommendations, setRecommendations] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [songToAdd, setSongToAdd] = useState("");
	const navigate = useNavigate();

	const handleChange = (event) => {
		setShowRecommendation(false);
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	const handleClick = (event) => {
		setShowRecommendation(!showRecommendation);
	};

	const getRecommendations = async () => {
		const seed_tracks = songIDs.splice(0, 5).join(",");
		const response = await axios.get(
			"https://api.spotify.com/v1/recommendations",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				params: {
					limit: 10,
					seed_tracks: seed_tracks,
				},
			}
		);
		const hold = [];
		response.data.tracks.forEach((item) => {
			hold.push(item.id);
		});
		setRecommendations(hold);
	};

	useEffect(() => {
		const getSongs = async () => {
			try {
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
				response.data.items.forEach((item) => {
					hold.push(item.id);
				});
				setSongIds(hold);
			} catch (err) {
				if (err.response.data.error.status == 401) {
					getRefreshToken();
				} else {
					setToken("");
					navigate("/");
				}
			}
		};

		getSongs();
		if (songIDs.length > 0) getRecommendations();
	}, [inputs, showRecommendation]);

	return (
		<div id="topsongs-containerid" className="topsongs-conatiner">
			<h1>My Top Songs</h1>
			<div className="topsongs-form">
				<form>
					<select
						name="limit"
						required
						onChange={handleChange}
						defaultValue={"5"}
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
						defaultValue={"30 Days"}
					>
						<option disabled>Time Period</option>
						<option value="short_term">30 Days</option>
						<option value="medium_term">6 Months</option>
						<option value="long_term">Several Years</option>
					</select>
				</form>
			</div>
			<div className="songs">
				{songIDs.map((id, index) => (
					<div key={index} className="song-item">
						<div className="song-rank">
							<h1>{index + 1}</h1>
						</div>
						<iframe
							className="song-iframe"
							src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
							width="100%"
							height="152"
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							loading="lazy"
						>
							<div className="song-popout"></div>
						</iframe>
					</div>
				))}
			</div>
			<button className="show-button" onClick={handleClick}>
				Get Recommendations For These Tracks
			</button>
			{showModal && (
				<Modal
					closeModal={setShowModal}
					access_token={access_token}
					songToAdd={songToAdd}
				/>
			)}
			<div className="songs">
				{showRecommendation &&
					recommendations.map((id, idx) => (
						<div key={idx} className="song-item-recommendation">
							<div className="song-add">
								<button
									onClick={() => {
										setShowModal(true);
										setSongToAdd(id);
									}}
								>
									<h1>+</h1>
								</button>
							</div>
							<iframe
								className="song-iframe"
								src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
								width="100%"
								height="152"
								allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
								loading="lazy"
							>
								<div className="song-popout"></div>
							</iframe>
						</div>
					))}
			</div>
		</div>
	);
};
