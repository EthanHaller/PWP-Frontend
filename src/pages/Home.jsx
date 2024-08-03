import React from "react"
import Hero from "../components/Hero"
import About from "../components/About"
import LogoSlider from "../components/LogoSlider"
import Map from "../components/Map"

const Home = () => {
	return (
		<>
			<Hero />
			<LogoSlider />
			<About />
			<Map />
		</>
	)
}

export default Home
