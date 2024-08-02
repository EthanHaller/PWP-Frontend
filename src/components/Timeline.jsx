/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pl5mkXeKDz9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Component() {
	return (
		<div className="flex flex-col items-center w-full min-h-screen bg-background p-8">
			<h1 className="mb-8 text-3xl font-bold text-primary">Responsive Timeline Design</h1>
			<div className="relative w-full max-w-4xl">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-1 h-full bg-muted" />
				</div>
				<div className="relative flex flex-col gap-12">
					<div className="relative flex justify-start md:justify-end">
						<div className="relative w-full sm:w-1/2 p-4 bg-card rounded-lg shadow-lg">
							<div className="absolute top-1/2 right-0 w-6 h-6 -mr-3 transform -translate-y-1/2 bg-card border-2 border-input rounded-full">
								<HomeIcon className="w-full h-full text-primary" />
							</div>
							<h2 className="text-lg font-semibold">Header of Section 1</h2>
							<p className="text-sm text-muted-foreground">1st Feb 2024</p>
							<p className="mt-2 text-card-foreground">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas
								debitis dicta dolore.
							</p>
							<p className="mt-2 text-right text-muted-foreground">- Famous One</p>
							<Button className="mt-4">Read more</Button>
						</div>
					</div>
					<div className="relative flex justify-end md:justify-start">
						<div className="relative w-full sm:w-1/2 p-4 bg-card rounded-lg shadow-lg">
							<div className="absolute top-1/2 left-0 w-6 h-6 -ml-3 transform -translate-y-1/2 bg-card border-2 border-input rounded-full">
								<StarIcon className="w-full h-full text-primary" />
							</div>
							<h2 className="text-lg font-semibold">Header of Section 2</h2>
							<p className="text-sm text-muted-foreground">2nd Feb 2024</p>
							<p className="mt-2 text-card-foreground">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas
								debitis dicta dolore.
							</p>
							<p className="mt-2 text-right text-muted-foreground">- Famous One</p>
							<Button className="mt-4">Read more</Button>
						</div>
					</div>
					<div className="relative flex justify-start md:justify-end">
						<div className="relative w-full sm:w-1/2 p-4 bg-card rounded-lg shadow-lg">
							<div className="absolute top-1/2 right-0 w-6 h-6 -mr-3 transform -translate-y-1/2 bg-card border-2 border-input rounded-full">
								<RocketIcon className="w-full h-full text-primary" />
							</div>
							<h2 className="text-lg font-semibold">Header of Section 3</h2>
							<p className="text-sm text-muted-foreground">3rd Feb 2024</p>
							<p className="mt-2 text-card-foreground">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas
								debitis dicta dolore.
							</p>
							<p className="mt-2 text-right text-muted-foreground">- Famous One</p>
							<Button className="mt-4">Read more</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function HomeIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	)
}

function RocketIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
			<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
			<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
			<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
		</svg>
	)
}

function StarIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	)
}

function XIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	)
}
