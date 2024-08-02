import React from "react"
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const geoUrl = "/countries.json"

const Map = () => {
	const [tooltipContent, setTooltipContent] = React.useState("")
	const [isHovered, setIsHovered] = React.useState(false)

	const handleMouseEnter = (event, geo) => {
		if (geo.properties.isPreviousClient) {
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
										<Geographies geography={geoUrl}>
											{({ geographies }) =>
												geographies.map((geo) => (
													<Geography
														key={geo.rsmKey}
														geography={geo}
														onMouseEnter={(event) => handleMouseEnter(event, geo)}
														onMouseLeave={handleMouseLeave}
														fill={geo.properties.isPreviousClient ? "#224098" : "#a3b4d8"}
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
										</Geographies>
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
