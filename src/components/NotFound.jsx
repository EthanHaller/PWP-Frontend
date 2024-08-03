/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5BdQGr3s0XL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"

export default function Component() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<h1 className="text-8xl font-bold tracking-tight text-foreground sm:text-9xl">404</h1>
				<p className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Page Not Found</p>
				<p className="mt-6 text-base text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
				<div className="mt-10">
					<Link
						to="/"
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						Go to Home
					</Link>
				</div>
			</div>
		</div>
	)
}
