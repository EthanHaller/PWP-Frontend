/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ShfCbqXSBOh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"
import { MdOutlineErrorOutline } from "react-icons/md"

export default function Error() {
	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<MdOutlineErrorOutline className="mx-auto text-4xl text-primary" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, something went wrong!</h1>
				<p className="mt-4 text-muted-foreground">
					Sorry, but an unexpected error has occurred. Please try again later or contact us if the issue persists.
				</p>
				<div className="mt-6">
					<Link
						to="/"
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						Go Home
					</Link>
				</div>
			</div>
		</div>
	)
}