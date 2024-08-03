import React, { useState } from "react"
import ContactForm from "../components/ContactForm"
import emailjs from "@emailjs/browser"
import { useToast } from "../components/ui/use-toast"
import { Toaster } from "../components/ui/toaster"

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

const Contact = () => {
	const { toast } = useToast()
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	})
	const [formErrors, setFormErrors] = useState({})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]: value,
		})
	}

	const validate = () => {
		let errors = {}
		if (!formValues.name) errors.name = "Name is required"
		if (!formValues.email) errors.email = "Email is required"
		if (!formValues.subject) errors.subject = "Subject is required"
		if (!formValues.message) errors.message = "Message is required"
		return errors
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const errors = validate()
		setFormErrors(errors)

		if (Object.keys(errors).length !== 0) {
			toast({
				title: "Error",
				description: "All fields are required.",
				variant: "destructive",
				duration: Infinity,
			})
			return
		}

		emailjs
			.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formValues)
			.then((response) => {
				toast({
					title: "Success",
					description: "Email sent successfully!",
					variant: "success",
					duration: 2000,
				})
				setFormValues({
					name: "",
					email: "",
					subject: "",
					message: "",
				})
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: "Failed to send email. Please try again.",
					variant: "destructive",
					duration: Infinity,
				})
				console.error("EmailJS Error:", error)
			})
	}

	return (
		<>
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Contact</h1>
			<div className="pt-24">
				<div className="flex justify-center items-start py-8 gap-16 bg-primary">
					<div>
						<h1 className="text-5xl font-bold text-background mt-8">Get in touch.</h1>
						<p className="text-muted my-4 pl-1">Fill out the form to send us an email.</p>
					</div>
					<ContactForm onSubmit={handleSubmit} errors={formErrors} values={formValues} onChange={handleChange} />
				</div>
			</div>
			<Toaster />
		</>
	)
}

export default Contact
