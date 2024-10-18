import React from "react"
import { FaGlobeAmericas, FaHandshake, FaUsers } from "react-icons/fa"
import { Card, CardContent } from "./ui/card"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchMembers = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/members`)
	return response.data
}

const fetchPartners = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partners`)
	return response.data
}

const fetchCountries = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/countries`)
	return response.data
}

const About = () => {
	const { data: membersData } = useQuery({
		queryKey: ["members"],
		queryFn: fetchMembers,
	})

	const { data: partnersData } = useQuery({
		queryKey: ["partners"],
		queryFn: fetchPartners,
	})

	const { data: countriesData } = useQuery({
		queryKey: ["countries"],
		queryFn: fetchCountries,
	})

	const stats = [
		{ icon: <FaUsers className="text-primary text-7xl" />, number: membersData?.totalCount ?? 0, label: "Members" },
		{ icon: <FaHandshake className="text-primary text-7xl" />, number: partnersData?.totalCount ?? 0, label: "Companies" },
		{ icon: <FaGlobeAmericas className="text-primary text-7xl" />, number: countriesData?.totalCount ?? 0, label: "Countries" },
	]

	return (
		<section id="about" className="pt-12">
			<div className="container mx-auto px-4 md:px-6 text-center">
				<h2 className="text-5xl text-left font-bold text-primary mt-8 mb-4">About us</h2>
				<Card className="bg-primary-foreground mb-6">
					<CardContent>
						<p className="text-left p-4 mt-4 text-xl">
							Profit with Purpose is a UVA CIO with {stats[0].number} members representing more than ten majors. We provide pro bono consulting services to {stats[1].number} companies
							from {stats[2].number} different countries that align with Environmental, Social, and Governance principles. We are in the process of
							creating an impact investment fund that will continue to support our partners and our growth as a club.{" "}
						</p>
					</CardContent>
				</Card>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{stats.map((stat, index) => (
						<Card key={index} className="pt-8 pb-4 px-2 bg-primary-foreground shadow-md rounded-md">
							<CardContent>
								<div className="flex flex-col items-center">
									{stat.icon}
									<h3 className="text-4xl font-bold mt-4 mb-2">{stat.number}</h3>
								</div>
								<p className="text-xl text-muted-foreground">{stat.label}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default About
