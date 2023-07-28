import { redirect, useSearchParams } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { useEffect } from "react";
import { Navbar } from "./Navbar";



export const Home = () => {
	return (
		<div className="home">
			<h1>Let's Listen to Yourself</h1>
		</div>
	);
};
