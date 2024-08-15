import React from "react"
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const geoUrl = "/countries.json"

const fetchCountries = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/countries`)
	return response.data
}

const Map = () => {
	const [tooltipContent, setTooltipContent] = React.useState("")
	const [isHovered, setIsHovered] = React.useState(false)

	const { data } = useQuery({
		queryKey: ["countries"],
		queryFn: fetchCountries,
	})
	const countries = data?.countries?.map(country => country.name)

	const handleMouseEnter = (event, geo) => {
		if (countries.includes(geo.properties.name)) {
			const { name } = geo.properties
			setTooltipContent(name)
			setIsHovered(true)
		}
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		setTooltipContent("")
	}

	return (
		<>
			<div className="container">
				<div className="max-w-screen-lg mx-auto relative">
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<div onMouseLeave={handleMouseLeave} className="relative">
								<ComposableMap
									projectionConfig={{
										rotate: [-10, 0, 0],
										scale: 147,
									}}
								>
									<Sphere stroke="#d1d5db" strokeWidth={0.5} />
									<Graticule stroke="#d1d5db" strokeWidth={0.5} />
									<TooltipTrigger asChild>
										{countries && <Geographies geography={geoUrl}>
											{({ geographies }) =>
												geographies.map((geo) => (
													<Geography
														key={geo.rsmKey}
														geography={geo}
														onMouseEnter={(event) => handleMouseEnter(event, geo)}
														onMouseLeave={handleMouseLeave}
														fill={countries.includes(geo.properties.name) ? "#224098" : "#a3b4d8"}
														stroke=""
														strokeWidth={0.5}
														style={{
															default: {
																outline: "none",
															},
															hover: {
																outline: "none",
															},
															pressed: {
																outline: "none",
															},
														}}
													/>
												))
											}
										</Geographies>}
									</TooltipTrigger>
								</ComposableMap>
							</div>
							{isHovered && (
								<TooltipContent>
									<p>{tooltipContent}</p>
								</TooltipContent>
							)}
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</>
	)
}

export default Map
