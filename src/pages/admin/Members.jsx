import React, { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "../../components/ui/use-toast"
import { Toaster } from "../../components/ui/toaster"
import { MdEdit, MdDelete, MdAdd, MdDragIndicator } from "react-icons/md"
import Error from "../../components/Error"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../../components/ui/dialog"
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import compressFile from "../../utils/compressFile"

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
				formData.append("headshot", await compressFile(memberData.headshot, 1 * 1024 * 1024))
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
			let message = "Failed to update Member"
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
						<Input id="edit-execRole" type="text" name="execRole" value={formData.execRole} onChange={handleInputChange} className="w-full" />
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
			formData.append("headshot", await compressFile(data.headshot, 1.5 * 1024 * 1024))

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
			let message = "Failed to add Member"
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
						<Input id="add-execRole" type="text" name="execRole" value={formData.execRole} onChange={handleInputChange} className="w-full" />
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
	const queryClient = useQueryClient()
	const [execRoles, setExecRoles] = useState([])
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [selectedMember, setSelectedMember] = useState(null)
	const { toast } = useToast()

	useEffect(() => {
		if (data?.exec) {
			const roleOrderMap = {}
			data.exec.forEach((member) => {
				const role = member.execRole
				const order = member.relativeOrder
				if (roleOrderMap[role] === undefined || order < roleOrderMap[role]) {
					roleOrderMap[role] = order
				}
			})

			const sortedRoles = [...new Set(data.exec.map((member) => member.execRole))].sort((a, b) => roleOrderMap[a] - roleOrderMap[b])
			setExecRoles(sortedRoles)
		}
	}, [data])
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

	const handleRoleDragEnd = (result) => {
		if (!result.destination) return

		const reorderedRoles = Array.from(execRoles)
		const [movedRole] = reorderedRoles.splice(result.source.index, 1)
		reorderedRoles.splice(result.destination.index, 0, movedRole)

		setExecRoles(reorderedRoles)
		updateRoleOrderMutation.mutate(reorderedRoles)
	}

	const updateRoleOrderMutation = useMutation({
		mutationFn: async (newRoleOrder) => {
			await axios.put(`${import.meta.env.VITE_BACKEND_URL}/members/updateRoleOrder`, { roles: newRoleOrder })
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["members"])
			toast({
				title: "Success",
				description: "Role order updated successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to update role order",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	if (isError) {
		return <Error />
	}

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-5xl text-primary font-bold mb-8 pt-16 md:pt-8">Members</h1>
			<h2 className="text-3xl mb-8">Total Count: {data?.totalCount}</h2>

			<h3 className="text-2xl mb-2">Executive Roles</h3>
			<p className="text-muted-foreground text-xs mb-4">Drag to reoder</p>
			<DragDropContext onDragEnd={handleRoleDragEnd}>
				<Droppable droppableId="execRoles">
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef} className="list-none p-0 m-0">
							{execRoles.map((role, index) => (
								<Draggable key={role} draggableId={role} index={index}>
									{(provided) => (
										<li
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="flex justify-between items-center bg-primary-foreground p-4 mb-2 rounded shadow"
										>
											{index + 1}
											{":\t"}
											{role}
											<MdDragIndicator />
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>

			<h3 className="text-2xl mt-8 mb-4">Members</h3>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{data?.exec
					.sort((a, b) => {
						const orderComparison = (a.relativeOrder ?? 10) - (b.relativeOrder ?? 10)
						if (orderComparison !== 0) return orderComparison

						const lastNameA = a.name.split(" ").pop().toLowerCase()
						const lastNameB = b.name.split(" ").pop().toLowerCase()
						const lastNameComparison = lastNameA.localeCompare(lastNameB)
						if (lastNameComparison !== 0) return lastNameComparison

						const firstNameA = a.name.split(" ")[0].toLowerCase()
						const firstNameB = b.name.split(" ")[0].toLowerCase()
						return firstNameA.localeCompare(firstNameB)
					})
					.map((member) => (
						<Card key={member.id} className="bg-primary-foreground p-4 flex flex-col">
							<CardHeader>
								<img src={member.headshotUrl} alt={member.name} className="h-64 w-64 mx-auto object-cover rounded-lg aspect-square" />
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
				{data?.nonExec
					.sort((a, b) => {
						const lastNameA = a.name.split(" ").pop().toLowerCase()
						const lastNameB = b.name.split(" ").pop().toLowerCase()
						const lastNameComparison = lastNameA.localeCompare(lastNameB)
						if (lastNameComparison !== 0) return lastNameComparison

						const firstNameA = a.name.split(" ")[0].toLowerCase()
						const firstNameB = b.name.split(" ")[0].toLowerCase()
						return firstNameA.localeCompare(firstNameB)
					})
					.map((member) => (
						<Card key={member.id} className="bg-primary-foreground p-4 flex flex-col">
							<CardHeader>
								<img src={member.headshotUrl} alt={member.name} className="h-64 w-64 mx-auto object-cover rounded-lg aspect-square" />
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
