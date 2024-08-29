import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAuth } from "firebase/auth"
import axios from "axios"
import { useToast } from "../../components/ui/use-toast"
import { Toaster } from "../../components/ui/toaster"
import { MdDelete, MdAdd } from "react-icons/md"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table"
import { Label } from "../../components/ui/label"
import Error from "../../components/Error"

const fetchUsers = async () => {
	const auth = getAuth()
	const user = auth.currentUser

	if (!user) {
		throw new Error("User not authenticated")
	}

	const token = await user.getIdToken()

	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/list-users`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

const AddUserModal = ({ open, onOpenChange }) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const [email, setEmail] = useState("")
	const [displayName, setDisplayName] = useState("")

	const addUserMutation = useMutation({
		mutationFn: async (newUser) => {
			const auth = getAuth()
			const user = auth.currentUser
			const token = await user.getIdToken()

			return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/add-user`, newUser, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["users"])
			toast({
				title: "Success",
				description: "User added successfully!",
				variant: "success",
				duration: 2000,
			})
			onOpenChange(false)
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to add user",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleAddUser = () => {
		if (email && displayName) {
			addUserMutation.mutate({ email, displayName })
			setEmail("")
			setDisplayName("")
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogTitle>Add User</DialogTitle>
				<div className="mb-4">
					<Label htmlFor="add-email" className="block text-card-foreground mt-4">
						Email
					</Label>
					<Input id="add-email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
					<Label htmlFor="add-name" className="block text-card-foreground mt-4">
						Name
					</Label>
					<Input id="add-name" type="text" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
				</div>
				<DialogFooter>
					<Button variant="ghost" onClick={onOpenChange}>
						Cancel
					</Button>
					<Button onClick={handleAddUser}>Add</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const DeleteUserModal = ({ open, onOpenChange, userToDelete }) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const deleteUserMutation = useMutation({
		mutationFn: async (userId) => {
			const auth = getAuth()
			const user = auth.currentUser
			const token = await user.getIdToken()

			return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/delete-user/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["users"])
			toast({
				title: "Success",
				description: "User deleted successfully!",
				variant: "success",
				duration: 2000,
			})
			onOpenChange(false)
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to delete user",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const confirmDeleteUser = () => {
		if (userToDelete) {
			deleteUserMutation.mutate(userToDelete)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogTitle>Delete User</DialogTitle>
				<p>Are you sure you want to delete this user?</p>
				<DialogFooter>
					<Button variant="ghost" onClick={onOpenChange}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={() => confirmDeleteUser()}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const AdminManagement = () => {
	const {
		data: users,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	})

	const [addModalOpen, setAddModalOpen] = useState(false)
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [userToDelete, setUserToDelete] = useState(null)

	const handleDeleteUser = (userId) => {
		setUserToDelete(userId)
		setDeleteModalOpen(true)
	}

	if (isError) {
		return <Error />
	}

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-5xl text-primary font-bold mb-8 pt-16 md:pt-8">Admin Management</h1>
			<h2 className="text-3xl mb-8">Admins</h2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>Display Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell className="pl-8">Actions</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!isLoading
						? users?.map(
								(user) =>
									user.email !== "ethanhaller02@gmail.com" && (
										<TableRow key={user.uid}>
											<TableCell>{user.displayName}</TableCell>
											<TableCell>{user.email}</TableCell>
											<TableCell>
												<Button
													variant="ghost"
													onClick={() => handleDeleteUser(user.uid)}
													className="text-destructive hover:text-destructive"
												>
													Delete <MdDelete className="ml-2" />
												</Button>
											</TableCell>
										</TableRow>
									)
						  )
						: [...Array(3)].map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<div className="h-4 bg-gray-200 rounded w-3/4"></div>
									</TableCell>
									<TableCell>
										<div className="h-4 bg-gray-200 rounded w-3/4"></div>
									</TableCell>
									<TableCell>
										<div className="h-4 bg-gray-200 rounded w-1/4"></div>
									</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
			<Button onClick={() => setAddModalOpen(true)} className="mt-4">
				<MdAdd className="mr-2" />
				Add User
			</Button>
			<AddUserModal open={addModalOpen} onOpenChange={() => setAddModalOpen(false)} />
			<DeleteUserModal open={deleteModalOpen} onOpenChange={() => setDeleteModalOpen(false)} userToDelete={userToDelete} />
			<Toaster />
		</div>
	)
}

export default AdminManagement
