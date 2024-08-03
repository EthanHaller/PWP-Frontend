import React from "react"
import { FaStar, FaTools, FaGlobeAmericas, FaGraduationCap } from "react-icons/fa"
import { Card, CardHeader, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"

const Recruitment = () => {
	return (
		<>
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Recruitment</h1>
			<div className="w-full h-[80vh] relative">
				<div className="absolute inset-0 bg-background/90 z-10" />
				<div className="parallax h-full" />
				<div className="h-full absolute container mx-auto px-4 md:px-6 inset-0 z-20 flex items-center">
					<h2 className="xl:text-5xl xl:leading-[6rem] lg:text-4xl lg:leading-[5rem] sm:text-2xl sm:leading-[4rem] xs:text-xl leading-[3rem] p-4 pt-16 uppercase">
						How can you <span className="font-bold highlight">invest</span> in the <span className="font-bold highlight">creative capacity</span> of{" "}
						<span className="font-bold highlight">entrepreneurs</span> solving our world's most{" "}
						<span className="font-bold highlight">pressing social issues</span> without sacrificing{" "}
						<span className="italic">market rate returns</span>?
					</h2>
				</div>
			</div>
			<div className="container mx-auto px-4 md:px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="py-6 px-2 bg-primary-foreground shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaStar size={40} className="text-primary" />
							<h3 className="text-xl font-bold">About Us</h3>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								At Profit with Purpose, we build a community of undergraduate students who can understand, identify, and begin careers in impact
								investing and consulting.
							</p>
						</CardContent>
					</Card>

					<Card className="py-6 px-2 bg-primary-foreground shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaTools size={40} className="text-primary" />
							<h3 className="text-xl font-bold">Our Approach</h3>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We do this through our hands-on training curriculum, professional mentors, and pro-bono consulting for domestic and
								international companies that embody ESG standards.
							</p>
						</CardContent>
					</Card>

					<Card className="py-6 px-2 bg-primary-foreground shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaGlobeAmericas size={40} className="text-primary" />
							<h3 className="text-xl font-bold">Our Mission</h3>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We're building an ecosystem where students from any background can learn, up-skill, and access opportunities in impact investing
								and consulting.
							</p>
						</CardContent>
					</Card>

					<Card className="py-6 px-2 bg-primary-foreground shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaGraduationCap size={40} className="text-primary" />
							<h3 className="text-xl font-bold">Who We Recruit</h3>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We recruit students from all years, majors, and backgrounds to facilitate consulting projects and investment strategies from
								unique perspectives.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="flex flex-col items-center mt-8 mb-16">
				<h2 className="font-bold text-4xl mb-8">Interested in joining?</h2>
				<Button>
					<a
						target="_blank"
						className="text-xl px-8"
						href="https://docs.google.com/forms/d/e/1FAIpQLScpZUqi7rGQbq9UFfS1Abc8jkhdpKs0mws9XkzkfRahAD1iYw/viewform?usp=sf_link"
					>
						Fill out our interest form!
					</a>
				</Button>
				<p className="mt-4 text-xs text-muted-foreground">Updated Fall 2024</p>
			</div>
		</>
	)
}

export default Recruitment
