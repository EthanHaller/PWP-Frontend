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

const fetchMembers = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/members`)
	return response.data
}

const EditMemberModal = ({ open, onOpenChange, member }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: member?.name || "",
		execRole: member?.execRole || "",
		headshot: null,
	})

	useEffect(() => {
		if (member) {
			setFormData({
				name: member?.name || "",
				execRole: member?.execRole || "",
				headshot: null,
			})
		}
	}, [member])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		setFormData((prevData) => ({ ...prevData, headshot: e.target.files[0] }))
	}

	const mutation = useMutation({
		mutationFn: async ({ originalId, memberData }) => {
			const formData = new FormData()
			formData.append("name", memberData.name)
			formData.append("execRole", memberData.execRole)
			if (memberData.headshot) {
				formData.append("headshot", memberData.headshot)
			}

			const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/members/update/${originalId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["members"])
			toast({
				title: "Success",
				description: "Member updated successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to update Member",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		mutation.mutate({ originalId: member.id, memberData: formData })
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Update Member Modal">
				<DialogTitle>Edit Member</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="edit-name" className="block text-card-foreground">
							Name
						</Label>
						<Input id="edit-name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="edit-execRole" className="block text-card-foreground">
							Exec Role (Optional)
						</Label>
						<Input
							id="edit-execRole"
							type="text"
							name="execRole"
							value={formData.execRole}
							onChange={handleInputChange}
							className="w-full"
						/>
					</div>
					<div>
						<Label htmlFor="edit-headshot" className="block text-card-foreground">
							Headshot
						</Label>
						<Input id="edit-headshot" type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
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

const DeleteMemberModal = ({ open, onOpenChange, member }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (memberId) => {
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/members/delete/${memberId}`)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["members"])
			toast({
				title: "Success",
				description: "Member deleted successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to delete Member",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleDelete = (e) => {
		e.preventDefault()
		mutation.mutate(member.id)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Delete Member Modal">
				<DialogTitle>Delete Member</DialogTitle>
				<p>Are you sure you want to delete {member?.name}?</p>
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

const AddMemberModal = ({ open, onOpenChange }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: "",
		execRole: "",
		headshot: null,
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		setFormData((prevData) => ({ ...prevData, headshot: e.target.files[0] }))
	}

	const mutation = useMutation({
		mutationFn: async (data) => {
			const formData = new FormData()
			formData.append("name", data.name)
			formData.append("execRole", data.execRole)
			formData.append("headshot", data.headshot)

			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/members/add`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["members"])
			toast({
				title: "Success",
				description: "Member added successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to add Member",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!formData.name || !formData.headshot) {
			return toast({
				title: "Error",
				description: "Name and Headshot are required",
				variant: "destructive",
				duration: 2000,
			})
		}
		mutation.mutate(formData)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Add Member Modal">
				<DialogTitle>Add Member</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="add-name" className="block text-card-foreground">
							Name
						</Label>
						<Input id="add-name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="add-execRole" className="block text-card-foreground">
							Exec Role (Optional)
						</Label>
						<Input
							id="add-execRole"
							type="text"
							name="execRole"
							value={formData.execRole}
							onChange={handleInputChange}
							className="w-full"
						/>
					</div>
					<div>
						<Label htmlFor="add-headshot" className="block text-card-foreground">
							Headshot
						</Label>
						<Input id="add-headshot" type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Cancel
						</Button>
						<Button disabled={!formData.name || !formData.headshot} type="submit" className="px-4 py-2 rounded">
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const Members = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["members"],
		queryFn: fetchMembers,
	})

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [selectedMember, setSelectedMember] = useState(null)

	const openEditModal = (member) => {
		setSelectedMember(member)
		setIsEditModalOpen(true)
	}

	const openDeleteModal = (member) => {
		setSelectedMember(member)
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
			<h1 className="text-5xl text-primary font-bold mb-16 pt-16 md:pt-8">Members</h1>
			<h2 className="text-3xl mb-4">Total Count: {data?.totalCount}</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{!isLoading &&
					data.exec
						.sort((a, b) => (a.relativeOrder ?? 10) - (b.relativeOrder ?? 10))
						.map((member) => (
							<Card key={member.id} className="bg-white p-4 flex flex-col">
								<CardHeader>
									<img src={member.headshotUrl} alt={member.name} className="h-64 object-contain rounded-lg" />
								</CardHeader>
								<CardTitle className="text-card-foreground px-4 pt-4 border-t border-border/30 pb-2">{member.name}</CardTitle>
								<h4 className="text-sm text-muted-foreground mx-4 pb-4">{member.execRole}</h4>
								<div className="flex-grow"></div>
								<CardFooter className="flex justify-end pt-4 pb-0 px-0 border-t border-border/30">
									<Button variant="ghost" onClick={() => openDeleteModal(member)} className="text-destructive hover:text-destructive">
										Delete <MdDelete className="ml-2" />
									</Button>
									<Button variant="ghost" onClick={() => openEditModal(member)} className="text-primary hover:text-primary">
										Edit <MdEdit className="ml-2" />
									</Button>
								</CardFooter>
							</Card>
						))}
				{!isLoading &&
					data.nonExec
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((member) => (
							<Card key={member.id} className="bg-white p-4 flex flex-col">
								<CardHeader>
									<img src={member.headshotUrl} alt={member.name} className="h-64 object-contain rounded-lg" />
								</CardHeader>
								<CardTitle className="text-card-foreground px-4 pt-4 border-t border-border/30 pb-4">{member.name}</CardTitle>
								<div className="flex-grow"></div>
								<CardFooter className="flex justify-end pt-4 pb-0 px-0 border-t border-border/30">
									<Button variant="ghost" onClick={() => openDeleteModal(member)} className="text-destructive hover:text-destructive">
										Delete <MdDelete className="ml-2" />
									</Button>
									<Button variant="ghost" onClick={() => openEditModal(member)} className="text-primary hover:text-primary">
										Edit <MdEdit className="ml-2" />
									</Button>
								</CardFooter>
							</Card>
						))}
				<Card className="border-dashed border-4 min-h-96">
					<button onClick={() => openAddModal()} className="h-full w-full">
						<CardContent className="flex justify-center content-center p-0">
							<MdAdd className="text-border text-6xl" />
						</CardContent>
					</button>
				</Card>
			</div>
			<EditMemberModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} member={selectedMember} />
			<DeleteMemberModal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} member={selectedMember} />
			<AddMemberModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
			<Toaster />
		</div>
	)
}

export default Members
