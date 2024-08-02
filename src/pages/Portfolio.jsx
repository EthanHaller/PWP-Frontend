import React from "react"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

const fetchProjects = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/projects`)
	return response.data
}

const Portfolio = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	})

	if (isError) {
		return <div>Error: {error.message}</div>
	}

	return (
		<>
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Portfolio</h1>
			<div className="container mx-auto p-4 mb-8">
				<h1 className="text-3xl lg:text-5xl font-bold mt-32 mb-8">Check out our Projects</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
					{isLoading
						? Array.from({ length: 6 }).map((_, index) => (
								<Card key={index} className="relative overflow-hidden group rounded-none border-none shadow-none">
									<Skeleton className="w-full h-auto aspect-video" />
									<div className="flex justify-between items-center mt-2 mb-8 lg:hidden">
										<Skeleton width={150} height={20} />
										<Skeleton width={100} height={40} />
									</div>
								</Card>
						  ))
						: data.projects
								.sort((a, b) => b.date.seconds - a.date.seconds)
								.map((project) => (
									<Card key={project.id} className="relative overflow-hidden group rounded-none border-none shadow-none">
										<img src={project.coverImageUrl} alt={project.title} className="w-full h-auto object-cover aspect-video" />
										<div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center transform lg:-translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-in-out hidden lg:flex">
											<h3 className="text-2xl mb-4 font-bold">{project.title}</h3>
											<Link to={`/portfolio/${project.id}`}>
												<Button className="bg-primary text-lg px-6 py-3">View More</Button>
											</Link>
										</div>
										<div className="flex justify-between items-center mt-2 mb-8 lg:hidden">
											<h3 className="text-xl font-bold">{project.title}</h3>
											<Link to={`/portfolio/${project.id}`}>
												<Button className="bg-primary text-md px-3 py-3">View More</Button>
											</Link>
										</div>
									</Card>
								))}
				</div>
			</div>
		</>
	)
}

export default Portfolio
