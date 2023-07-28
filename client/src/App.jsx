import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import { Navbar } from "./components/Navbar";
import { Topsongs } from "./components/Topsongs";

function App() {
	const [token, setToken] = useState("");

	useEffect(() => {
		const getToken = async () => {
			const response = await axios("http://localhost:3000/token");
			console.log(
				"response.data.access_token: " + response.data.access_token
			);
			setToken(response.data.access_token);
		};

		getToken();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar token={token} />
				<Routes>
					<Route path="/*" element={<Home />}></Route>
					<Route path="/top-songs" element={<Topsongs />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
