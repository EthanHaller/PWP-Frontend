import React, { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "../../components/ui/use-toast"
import { Toaster } from "../../components/ui/toaster"
import { MdEdit, MdDelete, MdAdd } from "react-icons/md"
import Error from "../../components/Error"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../../components/ui/dialog"
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import compressFile from "../../utils/compressFile"

const fetchPartners = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partners`)
	return response.data
}

const EditPartnerModal = ({ open, onOpenChange, partner }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: partner?.name || "",
	})

	useEffect(() => {
		if (partner) {
			setFormData({
				name: partner?.name || "",
			})
		}
	}, [partner])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }))
	}

	const mutation = useMutation({
		mutationFn: async ({ originalId, partnerData }) => {
			const formData = new FormData()
			formData.append("name", partnerData.name)
			formData.append("image", await compressFile(partnerData.image, 1.5 * 1024 * 1024))
			const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/partners/update/${originalId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["partners"])
			toast({
				title: "Success",
				description: "Partner updated successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			let message = "Failed to update Partner"
			if (err.message.startsWith("Cannot compress image")) {
				message = "File size too large"
			}
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		mutation.mutate({ originalId: partner.id, partnerData: formData })
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Update Partner Modal">
				<DialogTitle>Edit Partner</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="edit-name" className="block text-card-foreground">
							Name
						</Label>
						<Input id="edit-name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="edit-image" className="block text-card-foreground">
							Image
						</Label>
						<Input id="edit-image" type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Close
						</Button>
						<Button type="submit" className="px-4 py-2 rounded">
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const DeletePartnerModal = ({ open, onOpenChange, partner }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (partnerId) => {
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/partners/delete/${partnerId}`)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["partners"])
			toast({
				title: "Success",
				description: "Partner deleted successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to delete Partner",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleDelete = (e) => {
		e.preventDefault()
		mutation.mutate(partner.id)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Delete Partner Modal">
				<DialogTitle>Delete Partner</DialogTitle>
				<p>Are you sure you want to delete {partner?.name}?</p>
				<DialogFooter>
					<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
						Cancel
					</Button>
					<Button type="button" variant="destructive" onClick={handleDelete} className="px-4 py-2 rounded">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const AddPartnerModal = ({ open, onOpenChange }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: "",
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }))
	}

	const mutation = useMutation({
		mutationFn: async (data) => {
			const formData = new FormData()
			formData.append("name", data.name)
			formData.append("image", await compressFile(data.image, 1.5 * 1024 * 1024))
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partners/add`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["partners"])
			toast({
				title: "Success",
				description: "Partner added successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			let message = "Failed to add Partner"
			if (err.message.startsWith("Cannot compress image")) {
				message = "File size too large"
			}
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!formData.name || !formData.image) {
			return toast({
				title: "Error",
				description: "Name and Image are required",
				variant: "destructive",
				duration: 2000,
			})
		}
		mutation.mutate(formData)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Add Partner Modal">
				<DialogTitle>Add Partner</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="add-name" className="block text-card-foreground">
							Name
						</Label>
						<Input id="add-name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="add-image" className="block text-card-foreground">
							Image
						</Label>
						<Input id="add-image" type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Cancel
						</Button>
						<Button disabled={!formData.name || !formData.image} type="submit" className="px-4 py-2 rounded">
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const Partners = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["partners"],
		queryFn: fetchPartners,
	})

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [selectedPartner, setSelectedPartner] = useState(null)

	const openEditModal = (partner) => {
		setSelectedPartner(partner)
		setIsEditModalOpen(true)
	}

	const openDeleteModal = (partner) => {
		setSelectedPartner(partner)
		setIsDeleteModalOpen(true)
	}

	const openAddModal = () => {
		setIsAddModalOpen(true)
	}

	if (isError) {
		return <Error />
	}

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-5xl text-primary font-bold mb-16 pt-16 md:pt-8">Partners</h1>
			<h2 className="text-3xl mb-4">Total Count: {data?.totalCount}</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{!isLoading &&
					data.partners.map((partner) => (
						<Card key={partner.id} className="bg-white p-4 flex flex-col">
							<CardHeader>
								<img src={partner.imageUrl} alt={partner.name} className="h-32 object-contain rounded-lg" />
							</CardHeader>
							<CardTitle className="text-card-foreground px-4 pt-4 border-t border-border/30 pb-4">{partner.name}</CardTitle>
							<div className="flex-grow"></div>
							<CardFooter className="flex justify-end pt-4 pb-0 px-0 border-t border-border/30">
								<Button variant="ghost" onClick={() => openDeleteModal(partner)} className="text-destructive hover:text-destructive">
									Delete <MdDelete className="ml-2" />
								</Button>
								<Button variant="ghost" onClick={() => openEditModal(partner)} className="text-primary hover:text-primary">
									Edit <MdEdit className="ml-2" />
								</Button>
							</CardFooter>
						</Card>
					))}
				<Card className="border-dashed border-4 min-h-64">
					<button onClick={() => openAddModal()} className="h-full w-full">
						<CardContent className="flex justify-center content-center p-0">
							<MdAdd className="text-border text-6xl" />
						</CardContent>
					</button>
				</Card>
			</div>
			<EditPartnerModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} partner={selectedPartner} />
			<DeletePartnerModal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} partner={selectedPartner} />
			<AddPartnerModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
			<Toaster />
		</div>
	)
}

export default Partners
