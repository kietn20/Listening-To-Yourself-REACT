import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
	return (
		<div className="home-container">
			<div className="cards-wrapper">
				<div className="cards-text">
					<h1>Let's Listen to Yourself</h1>
					<p>
						What is your taste in music? Let's find out, and maybe
						discover new bops along the way.
					</p>
				</div>
				<div className="cards-tiles">
					<div className="card">
						<img src="./card1.png" alt="card 1" />
						<div className="card-description">
							<Link to="/top-songs" className="home-links">
								<h4>Get Your Top Songs</h4>
							</Link>
							<p>
								Curious about your listening habits? Well, let's
								trace back to what you been listening for the
								past weeks, months, or years!
							</p>
						</div>
					</div>
					<div className="card">
						<img src="./card2alt.jpg" alt="card 2" />
						<div className="card-description">
							<Link to="/top-songs" className="home-links">
								<h4>Enjoy New Recommendations</h4>
							</Link>
							<p>
								Caught in a musical dry spell? Well we got some
								song recommendations for you based on your
								listening habits.
							</p>
						</div>
					</div>
					<div className="card">
						<img src="./card3.jpg" alt="card 3" />
						<div className="card-description">
							<Link to="/moods" className="home-links">
								<h4>
									Learn about your current musical moods and
									how they represent you.
								</h4>
							</Link>
							<p>
								Discover who you are based on what you listen
								to. Shall we tango or chill out?
							</p>
						</div>
					</div>
				</div>
				<h5>~ Made for Spotify ~</h5>
			</div>
		</div>
	);
};
