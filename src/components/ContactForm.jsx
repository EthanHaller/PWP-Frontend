import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactForm({ onSubmit, errors, values, onChange }) {
	return (
		<Card className="w-full max-w-md">
			<CardContent className="mt-8">
				<form className="grid gap-4" onSubmit={onSubmit}>
					<div className="grid gap-2">
						<Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
							Name*
						</Label>
						<Input
							id="name"
							name="name"
							placeholder="Enter your name"
							value={values.name}
							onChange={onChange}
							className={errors.name ? "border-red-500" : ""}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
							Email*
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="Enter your email"
							value={values.email}
							onChange={onChange}
							className={errors.email ? "border-red-500" : ""}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="subject" className={errors.subject ? "text-red-500" : ""}>
							Subject*
						</Label>
						<Input
							id="subject"
							name="subject"
							placeholder="Enter the subject"
							value={values.subject}
							onChange={onChange}
							className={errors.subject ? "border-red-500" : ""}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="message" className={errors.message ? "text-red-500" : ""}>
							Message*
						</Label>
						<Textarea
							id="message"
							name="message"
							placeholder="Enter your message"
							className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
							value={values.message}
							onChange={onChange}
						/>
					</div>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
