import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "../../components/ui/use-toast"
import { Toaster } from "../../components/ui/toaster"
import { MdEdit, MdCheck, MdClose } from "react-icons/md"
import { Button } from "@/components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import Error from "../../components/Error"

const fetchRecruitmentInfo = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recruitment`)
	return response.data
}

const EditableText = ({ labelText, inputId, startingValue }) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(startingValue)

	const mutation = useMutation({
		mutationFn: async (updatedData) => {
			const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/recruitment/update`, updatedData)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["recruitmentInfo"])
			toast({
				title: "Success",
				description: "Recruitment info updated successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to update recruitment info",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	const handleSave = async () => {
		try {
			await mutation.mutateAsync({ [inputId]: value })
			setIsEditing(false)
		} catch (error) {
			console.error("Error saving data:", error)
		}
	}

	return (
		<>
			<Label htmlFor={inputId}>{labelText}</Label>
			<div className="flex gap-2 mt-1 mb-4">
				<Input id={inputId} type="text" placeholder={labelText} value={value} onChange={handleInputChange} disabled={!isEditing} />
				{isEditing ? (
					<>
						<Button variant="outline" onClick={() => setIsEditing(false)} className="border-destructive">
							Cancel <MdClose className="text-destructive text-xl ml-2" />
						</Button>
						<Button variant="outline" onClick={handleSave} className="border-success">
							Save <MdCheck className="text-success text-xl ml-2" />
						</Button>
					</>
				) : (
					<Button variant="outline" onClick={() => setIsEditing(true)}>
						Edit <MdEdit className="text-primary text-xl ml-2" />
					</Button>
				)}
			</div>
		</>
	)
}

const Recruitment = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["recruitmentInfo"],
		queryFn: fetchRecruitmentInfo,
	})

	if (isError) {
		return <Error />
	}

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-5xl text-primary font-bold mb-8 pt-16 md:pt-8">Recruitment</h1>
			<div className="mb-4">
				{!isLoading &&
					Object.entries(data)
						.sort((a, b) => b[0].localeCompare(a[0]))
						.map(([key, value]) => <EditableText key={key} labelText={formatLabelText(key)} inputId={key} startingValue={value} />)}
			</div>
			<Toaster />
		</div>
	)
}

const formatLabelText = (camelCaseText) => {
	return camelCaseText
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/^./, (str) => str.toUpperCase())
		.replace("Url", "URL")
}

export default Recruitment
