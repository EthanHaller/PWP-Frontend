import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6"
import { Link } from "react-router-dom"

const fetchRecruitmentInfo = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recruitment`)
	return response.data
}

export default function Component() {
	const { data } = useQuery({
		queryKey: ["recruitmentInfo"],
		queryFn: fetchRecruitmentInfo,
	})

	return (
		<footer className="absolute p-4 w-full">
			<div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
				<div className="flex items-center gap-4">
					<Link to="/" className="mr-6 hidden lg:flex">
						<img src="/pwp.svg" className="h-12" alt="Profit with Purpose" />
						<span className="sr-only">Profit with Purpose</span>
					</Link>
					<p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} - All rights reserved.</p>
				</div>
				<div className="flex items-center gap-4">
					{data?.facebookUrl && (
						<a href={data?.facebookUrl} target="_blank" rel="noopener noreferrer">
							<FaFacebook size={35} className="text-primary" />
						</a>
					)}
					{data?.instagramUrl && (
						<a href={data?.instagramUrl} target="_blank" rel="noopener noreferrer">
							<FaInstagram size={40} className="text-primary" />
						</a>
					)}
					{data?.linkedinUrl && (
						<a href={data?.linkedinUrl} target="_blank" rel="noopener noreferrer">
							<FaLinkedin size={40} className="text-primary" />
						</a>
					)}
				</div>
			</div>
		</footer>
	)
}
