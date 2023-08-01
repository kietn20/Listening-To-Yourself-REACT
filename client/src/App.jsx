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
		console.log("access_token in getRefreshToken:", token);
		const response = await axios.get(
			"http://localhost:3000/refresh_token",
			{
				data: {
					refresh_token: refreshToken,
				},
			}
		);
	};

	useEffect(() => {
		console.log("access_token at start:", token);
		const getToken = async () => {
			try {
				const response = await axios("http://localhost:3000/token");
				// console.log(
				// 	"response.data.access_token: " + response.data.access_token
				// );
				setToken(response.data.access_token);
				setRefreshToken(response.data.refresh_token);
			} catch (error) {
				console.log(error);
			}
		};

		getToken();
	}, [token, getRefreshToken]);

	return (
		<div className="App">
			<HashRouter>
				<Navbar token={token} />
				<Routes>
					<Route path="/*" element={<Home />}></Route>
					<Route
						path="/top-songs"
						element={
							<Topsongs
								access_token={token}
								setToken={setToken}
							/>
						}
					></Route>
					<Route
						path="/moods"
						element={
							<Moods access_token={token} setToken={setToken} />
						}
					></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
