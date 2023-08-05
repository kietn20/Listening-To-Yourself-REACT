import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import { Navbar } from "./components/Navbar";
import { Topsongs } from "./components/Topsongs";
import { Moods } from "./components/Moods";

export const server = "https://listening-to-yourself-server.vercel.app";

function App(req, res) {
	const [token, setToken] = useState("");

	useEffect(() => {
		const URLparams = new URLSearchParams(window.location.search);
		setToken(URLparams.get("token"));
	}, []);

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
