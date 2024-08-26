import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Skeleton } from "../components/ui/skeleton"
import Error from "../components/Error"

const fetchPartners = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partners`)
	return response.data
}

const LogoSlider = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["partners"],
		queryFn: fetchPartners,
	})

	const partners = data?.partners || []
	const duplicatedLogos = [...partners, ...partners]

	const duration = duplicatedLogos.length * 4

	return (
		<div className="relative bg-white overflow-hidden mx-auto py-24">
			<div className="scroll flex w-max" style={{ animationDuration: `${duration}s` }}>
				{isLoading
					? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-24 w-24 mx-8" />)
					: duplicatedLogos?.map((logo, index) => <img key={index} src={logo.imageUrl} alt={logo.name} className="h-24 w-auto px-8" />)}
			</div>
		</div>
	)
}

export default LogoSlider
