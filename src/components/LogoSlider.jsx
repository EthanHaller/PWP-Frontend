import React from "react"

const logos = [
	"images/ethiopian_delights.png",
	"images/junk_labz.jpg",
	"images/kava.png",
	"images/muyu_milq.jpg",
	"images/nature_buff.jpg",
	"images/sfs.png",
	"images/tofali_zetu.png",
	"images/toloma.jpg",
	"images/twende.png",
	"images/we_planet.png",
	"images/yellow_red.png",
]

const duplicatedLogos = [...logos, ...logos]

const LogoSlider = () => {
	return (
		<div className="bg-white relative overflow-hidden mx-auto py-24">
			<div className="scroll flex w-max">
				{duplicatedLogos.map((logo, index) => (
					<img key={index} src={logo} alt={`Logo ${index}`} className="h-24 w-auto px-8" />
				))}
			</div>
		</div>
	)
}

export default LogoSlider
