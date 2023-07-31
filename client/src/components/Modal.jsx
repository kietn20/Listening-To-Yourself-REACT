import axios from "axios";
import { useEffect, useState } from "react";
import "./Modal.css";
import { redirect } from "react-router-dom";

export const Modal = ({ closeModal, access_token, songToAdd }) => {
	const token = access_token;
	console.log("access_token: ", token);
	console.log("starting with: " + songToAdd);
	const [playlists, setPlaylists] = useState([]);
	const [chosenPlaylistID, setChosenPlaylistID] = useState("");

	const handleChange = (event) => {
		setChosenPlaylistID(event.target.value);
		console.log("handleChange: chosenID is " + chosenPlaylistID);
	};

	const handleAdd = async (event) => {
		event.preventDefault();
		console.log("in handleAdd function");
		const response = await axios.post(
			`https://api.spotify.com/v1/playlists/${chosenPlaylistID}/tracks`,
			{
				headers: {
					Authorization: `Bearer BQBFkNxW8z-2Uk94oQ1zaJNzF4Njin2i4DD50HEGeGOe2KJT5iTItM-PxOKqd2-BBKrjVWJdQW2e-QwuYMAZ-HidGdUNDFYANlqmNIhSyBjj0kfcl2XIE0cGguvZhZnw-y98lqwu8EPOdFIYkXKKPMTGqds7SutDOQY-YgUWgr7-YrzTgdK3VDt9ZMTEV-Z4rjdIrdUn4o1apaLa6c61rnDv8sBUdjTrZpsjV__Rbsvn72YKrbFR0Fe-87IryHuGJHxF_nGlO73y`,
					"Content-Type": "application/json",
				},
				params: {
					uris: [`spotify:track:${songToAdd}`],
				},
			}
		);
		console.log("statuscode: " + response.status);
		console.log(response.data);
		redirect("http://localhost:5173/");
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
				<button onClick={() => closeModal(false)}>X</button>
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
						<button type="button" onClick={() => closeModal(false)}>
							Close
						</button>
						<button onClick={handleAdd}>Add to playlist</button>
					</div>
				</form>
			</div>
		</div>
	);
};
