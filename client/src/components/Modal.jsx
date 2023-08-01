import axios from "axios";
import { useEffect, useState } from "react";
import "./Modal.css";
import { redirect } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

export const Modal = ({ closeModal, access_token, songToAdd }) => {
	const [playlists, setPlaylists] = useState([]);
	const [chosenPlaylistID, setChosenPlaylistID] = useState("");

	const handleChange = (event) => {
		setChosenPlaylistID(event.target.value);
	};

	const handleAdd = async (event) => {
		event.preventDefault();
		await axios({
			method: "post",
			url: `https://api.spotify.com/v1/playlists/${chosenPlaylistID}/tracks`,
			headers: { Authorization: `Bearer ${access_token}` },
			data: {
				uris: [`spotify:track:${songToAdd}`],
			},
		})
			.then((response) => {
				console.log(response.status);
				closeModal(false);
				redirect("http://localhost:5173/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const getPlaylists = async () => {
			const response = await axios.get(
				"https://api.spotify.com/v1/me/playlists",
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
					},
					params: {
						limit: 10,
					},
				}
			);
			const hold = [];
			response.data.items.forEach((playlist) => hold.push(playlist));
			setPlaylists(hold);
		};

		getPlaylists();
	}, []);

	return (
		<div className="modal-background">
			<div className="modal-container">
				<button className="closeButton" onClick={() => closeModal(false)}>
					<FaWindowClose className="closeIcon"/>
				</button>
				<br />
				<h2>Add Song to Playlist</h2>
				<form>
					<select
						name="playlistChoice"
						defaultValue={"Choose a playlist to add song to"}
						onChange={handleChange}
					>
						<option disabled>
							Choose a playlist to add song to
						</option>
						{playlists.map((playlist) => (
							<option key={playlist.name} value={playlist.id}>
								{playlist.name}
							</option>
						))}
					</select>
					<div className="modal-footer">
						{/* <button className="closeForm" type="button" onClick={() => closeModal(false)}>
							Close
						</button> */}
						<button onClick={handleAdd}>Add</button>
					</div>
				</form>
			</div>
		</div>
	);
};
