import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import { Navbar } from "./components/Navbar";
import { Topsongs } from "./components/Topsongs";
import { Moods } from "./components/Moods";

function App() {
	const [token, setToken] = useState("");
	const [refreshToken, setRefreshToken] = useState("");

	const getRefreshToken = async () => {
		console.log("old access token:", token);
		const response = await axios
			.get("http://localhost:3000/refresh_token", {
				data: {
					refresh_token: refreshToken,
				},
			})
			.then((access_token) => {
				console.log("new access_token:", access_token);
				setToken(access_token);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		const getToken = async () => {
			try {
				const response = await axios("http://localhost:3000/token");
				setToken(response.data.access_token);
				if (response.data.refreshToken) {
					setRefreshToken(response.data.refresh_token);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getToken();
	}, [token, getRefreshToken]);

	return (
		<div className="App">
			<HashRouter>
				<Navbar access_token={token} />
				<Routes>
					<Route path="/*" element={<Home />}></Route>
					<Route
						path="/top-songs"
						element={
							<Topsongs
								access_token={token}
								setToken={setToken}
								getRefreshToken={getRefreshToken}
							/>
						}
					></Route>
					<Route
						path="/moods"
						element={
							<Moods
								access_token={token}
								setToken={setToken}
								getRefreshToken={getRefreshToken}
							/>
						}
					></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
