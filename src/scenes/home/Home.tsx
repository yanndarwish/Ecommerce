import Ad from "./Ad"
import Hero from "./Hero"
import Subscribe from "./Subscribe"
import Trending from "./Trending"

const Home = () => {
	return (
		<div>
			<Hero />
			<Trending />
			<Ad position="start" />
			<Ad position="end" />
			<Subscribe />
		</div>
	)
}

export default Home
