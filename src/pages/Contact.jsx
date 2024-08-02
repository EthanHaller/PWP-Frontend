import React, { useState } from "react"
import ContactForm from "../components/ContactForm"
import axios from "axios"
import { useToast } from "../components/ui/use-toast"
import { Toaster } from "../components/ui/toaster"

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

		if (Object.keys(errors).length !== 0) return
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/contact/send`, formValues)
			.then((res) => {
				toast({
					title: "Success",
					description: "Email sent successfully!",
					variant: "success",
					duration: 2000,
				})
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					variant: "destructive",
					duration: Infinity,
				})
			})
	}

	return (
		<>
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Contact</h1>
			<div className="flex pt-32 mb-8">
				<ContactForm onSubmit={handleSubmit} errors={formErrors} values={formValues} onChange={handleChange} />
			</div>
			<Toaster />
		</>
	)
}

export default Contact
