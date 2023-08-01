import React from "react";
import "./Moods.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Moods = ({ access_token, setToken }) => {
	const [songObjects, setSongObjects] = useState([]);
	const [ids, setIds] = useState([]);
	let audio = [];
	const navigate = useNavigate();

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
						time_range: "short_term",
						limit: 5,
					},
				}
			);
			const hold = [];
			await response.data.items.forEach((songObject) => {
				hold.push(songObject);
				ids.push(songObject.id);
			});
			setSongObjects(hold);
		} catch (error) {
			console.error(error);
		}
	};

	const getAnalysis = async () => {
		try {
			const response = await axios.get(
				"https://api.spotify.com/v1/audio-features",
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
					},
					params: {
						ids: ids.join(","),
					},
				}
			);
			console.log(response);
			var one = 0;
			var two = 0;
			var three = 0;
			var four = 0;
			var five = 0;
			await response.data.audio_features.forEach((element) => {
				one += element.acousticness;
				two += element.danceability;
				three += element.energy;
				four += element.instrumentalness;
				five += element.valence;
			});
			audio = [one, two, three, four, five];
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getSongs();
		getAnalysis();
	}, [song]);

	return (
		<div className="moods-container">
			<div className="moods-content">
				<h1>{audio.join(",")}</h1>
				<h1>Moods of Your Recent Favorites</h1>
				<div className="moods-covers">
					{songObjects.map((song, index) => (
						<div className="cover" key={index}>
							<a
								href={song.external_urls.spotify}
								target="_blank"
							>
								<img
									src={song.album.images[1].url}
									alt={song.album.images[1].url}
								/>
							</a>
							<h4>{song.name}</h4>
						</div>
					))}
				</div>
				<div className="moods-analysis">
					<div className="analysis-div">
						<div className="card1 analysis-number">
							<h1>{(audio[0] / 5).toFixed(2)}</h1>
						</div>
						<div className="analysis-text">
							<h1>Acousticness</h1>
							<p>
								A confidence measure from 0.0 to 1.0 of whether
								the track is <b>acoustic</b>. 1.0 represents
								high confidence the track is acoustic, which
								means you may perfer a{" "}
								<b>chill, calming, or romantic vibe</b>.
							</p>
						</div>
					</div>
					<div className="analysis-div">
						<div className="card2 analysis-number">
							<h1>{(audio[1] / 5).toFixed(2)}</h1>
						</div>
						<div className="analysis-text">
							<h1>Danceability</h1>
							<p>
								Danceability describes how suitable a track is
								for <b>dancing</b> based on a combination of
								musical elements including tempo, rhythm
								stability, beat strength, and overall
								regularity. A value of 0.0 is least danceable
								and 1.0 is most danceable.
							</p>
						</div>
					</div>
					<div className="analysis-div">
						<div className="card3 analysis-number">
							<h1>{(audio[2] / 5).toFixed(2)}</h1>
						</div>
						<div className="analysis-text">
							<h1>Energy</h1>
							<p>
								Energy is a measure from 0.0 to 1.0 and
								represents a{" "}
								<b>
									perceptual measure of intensity and
									activity.
								</b>{" "}
								Typically, energetic tracks feel{" "}
								<b>fast, loud, and noisy.</b> For example, death
								metal has high energy, while a Bach prelude
								scores low on the scale. Perceptual features
								contributing to this attribute include dynamic
								range, perceived loudness, timbre, onset rate,
								and general entropy.
							</p>
						</div>
					</div>
					<div className="analysis-div">
						<div className="card4 analysis-number">
							<h1>{(audio[3] / 5).toFixed(2)}</h1>
						</div>
						<div className="analysis-text">
							<h1>Instrumentalness</h1>
							<p>
								Predicts whether a track contains no vocals.
								"Ooh" and "aah" sounds are treated as
								instrumental in this context. Rap or spoken word
								tracks are clearly <b>"vocal"</b>. The closer
								the instrumentalness value is to 1.0, the
								greater likelihood the track contains no vocal
								content. Values above 0.5 are intended to
								represent instrumental tracks, but confidence is
								higher as the value approaches 1.0.
							</p>
						</div>
					</div>
					<div className="analysis-div">
						<div className="card5 analysis-number">
							<h1>{(audio[4] / 5).toFixed(2)}</h1>
						</div>
						<div className="analysis-text">
							<h1>Valence</h1>
							<p>
								A measure from 0.0 to 1.0 describing the musical
								positiveness conveyed by a track. Tracks with
								high valence sound more <b>positive</b> (e.g.
								happy, cheerful, euphoric), while tracks with
								low valence sound more <b>negative</b> (e.g.
								sad, depressed, angry).
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
