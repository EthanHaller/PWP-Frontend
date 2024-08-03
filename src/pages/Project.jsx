import React from "react"
import { FaChevronRight } from "react-icons/fa6"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "../components/ui/button"
import { Skeleton } from "../components/ui/skeleton"
import Error from "../components/Error"

const fetchProjectById = async ({ queryKey }) => {
	const [_, id] = queryKey
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/projects/${id}`)
	return response.data
}

const Project = () => {
	const { id } = useParams()
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["project", id],
		queryFn: fetchProjectById,
	})

	if (isError) {
		return <Error />
	}

	return (
		<>
			<div className="container mx-auto px-4 md:px-6 pt-24 py-12">
				<div className="flex items-center mb-4">
					<Link to="/portfolio">
						<Button variant="link" className="text-lg md:text-xl">
							Portfolio
						</Button>
					</Link>
					<FaChevronRight />
					{isLoading ? <Skeleton /> : <h1 className="text-lg md:text-xl mx-4">{data.title}</h1>}
				</div>
				{isLoading ? <Skeleton className="w-full h-[75vh]"></Skeleton> : <iframe src={data.presentationUrl} className="w-full h-[75vh]" />}
			</div>
		</>
	)
}

export default Project
