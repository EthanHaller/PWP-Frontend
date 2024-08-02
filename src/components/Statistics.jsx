import React from "react"
import { FaGlobeAmericas, FaHandshake, FaUsers } from "react-icons/fa"
import { Card, CardHeader, CardContent } from "../components/ui/card"

const Statistics = () => {
	const stats = [
		{ icon: <FaUsers className="text-primary text-7xl" />, number: 42, label: "Members" },
		{ icon: <FaGlobeAmericas className="text-primary text-7xl" />, number: 5, label: "Countries" },
		{ icon: <FaHandshake className="text-primary text-7xl" />, number: 11, label: "Partners" },
	]

	return (
		<section className="py-12">
			<div className="container mx-auto px-4 md:px-6 text-center">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{stats.map((stat, index) => (
						<Card key={index} className="pt-8 pb-4 px-2 bg-white shadow-md rounded-md">
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

export default Statistics
