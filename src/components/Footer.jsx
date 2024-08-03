/**
 * v0 by Vercel.
 * @see https://v0.dev/t/weOthTmIZPF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { FaInstagram } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa6"

import { Link } from "react-router-dom"

export default function Component() {
	return (
		<footer className="absolute p-4 w-full">
			<div className=" flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
				<div className="flex items-center gap-4">
					<Link to="/" className="mr-6 hidden lg:flex">
						<img src="pwp.svg" className="h-12" />
						<span className="sr-only">Profit with Purpose</span>
					</Link>
					<p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} - All right reserved.</p>
				</div>
				<div className="flex items-center gap-4">
					<a href="https://www.facebook.com/pwpatuva/" target="_blank">
						<FaFacebook size={35} className="text-primary" />
					</a>
					<a href="https://www.instagram.com/pwpatuva/" target="_blank">
						<FaInstagram size={40} className="text-primary" />
					</a>
					<a href="https://www.linkedin.com/company/profit-with-purpose-at-uva/" target="_blank">
						<FaLinkedin size={40} className="text-primary" />
					</a>
				</div>
			</div>
		</footer>
	)
}
