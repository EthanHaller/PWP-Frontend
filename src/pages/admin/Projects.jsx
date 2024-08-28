import React, { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "../../components/ui/use-toast"
import { Toaster } from "../../components/ui/toaster"
import { MdEdit, MdDelete, MdAdd } from "react-icons/md"
import { FaExternalLinkAlt } from "react-icons/fa"
import Error from "../../components/Error"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../../components/ui/dialog"
import { Card, CardFooter, CardTitle, CardContent, CardHeader } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import compressFile from "../../utils/compressFile"

const fetchProjects = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/projects`)
	return response.data
}

const EditProjectModal = ({ open, onOpenChange, project }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		title: project?.title || "",
		image: null,
		presentation: null,
		date: project?.date || "",
	})

	useEffect(() => {
		if (project) {
			setFormData({
				title: project?.title || "",
				image: null,
				presentation: null,
				date: project?.date || "",
			})
		}
	}, [project])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		const { name, files } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: files[0],
		}))
	}

	const mutation = useMutation({
		mutationFn: async ({ originalId, projectData }) => {
			const formData = new FormData()
			formData.append("title", projectData.title)
			if (projectData.image) {
				formData.append("coverImage", await compressFile(projectData.image, 1.5 * 1024 * 1024))
			}
			if (projectData.presentation) {
				formData.append("presentation", projectData.presentation)
			}
			formData.append("date", projectData.date)

			const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/projects/update/${originalId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["projects"])
			toast({
				title: "Success",
				description: "Project updated successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			let message = "Failed to update Project"
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
		mutation.mutate({ originalId: project.id, projectData: formData })
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Update Project Modal">
				<DialogTitle>Edit Project</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="edit-title" className="block text-card-foreground">
							Title
						</Label>
						<Input id="edit-title" type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="edit-image" className="block text-card-foreground">
							Cover Image
						</Label>
						<Input id="edit-image" type="file" name="image" accept="image/jpeg,image/png" onChange={handleFileChange} />
					</div>
					<div>
						<Label htmlFor="edit-presentation" className="block text-card-foreground">
							Presentation PDF
						</Label>
						<Input id="edit-presentation" type="file" name="presentation" accept="application/pdf" onChange={handleFileChange} />
					</div>
					<div>
						<Label htmlFor="edit-date" className="block text-card-foreground">
							Date
						</Label>
						<Input id="edit-date" type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full" />
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

const DeleteProjectModal = ({ open, onOpenChange, project }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (projectId) => {
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/projects/delete/${projectId}`)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["projects"])
			toast({
				title: "Success",
				description: "Project deleted successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to delete Project",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleDelete = (e) => {
		e.preventDefault()
		mutation.mutate(project.id)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Delete Project Modal">
				<DialogTitle>Delete Project</DialogTitle>
				<p>Are you sure you want to delete {project?.title}?</p>
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

const AddProjectModal = ({ open, onOpenChange }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		title: "",
		coverImage: null,
		presentation: null,
		date: "",
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		const { name, files } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: files[0],
		}))
	}

	const mutation = useMutation({
		mutationFn: async (data) => {
			const formData = new FormData()
			formData.append("title", data.title)
			formData.append("coverImage", await compressFile(data.coverImage, 1.5 * 1024 * 1024))
			formData.append("presentation", data.presentation)
			formData.append("date", data.date)

			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/projects/add`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["projects"])
			toast({
				title: "Success",
				description: "Project added successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			let message = "Failed to add Project"
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
		if (!formData.title || !formData.coverImage || !formData.presentation || !formData.date) {
			return toast({
				title: "Error",
				description: "All fields are required",
				variant: "destructive",
				duration: 2000,
			})
		}
		mutation.mutate(formData)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Add Project Modal">
				<DialogTitle>Add Project</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="add-title" className="block text-card-foreground">
							Title
						</Label>
						<Input id="add-title" type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="add-coverImage" className="block text-card-foreground">
							Cover Image
						</Label>
						<Input id="add-coverImage" type="file" name="coverImage" accept="image/jpeg,image/png" onChange={handleFileChange} />
					</div>
					<div>
						<Label htmlFor="add-presentation" className="block text-card-foreground">
							Presentation PDF
						</Label>
						<Input id="add-presentation" type="file" name="presentation" accept="application/pdf" onChange={handleFileChange} />
					</div>
					<div>
						<Label htmlFor="add-date" className="block text-card-foreground">
							Date
						</Label>
						<Input id="add-date" type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full" />
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Cancel
						</Button>
						<Button
							disabled={!formData.title || !formData.coverImage || !formData.presentation || !formData.date}
							type="submit"
							className="px-4 py-2 rounded"
						>
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const Projects = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	})

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [selectedProject, setSelectedProject] = useState(null)

	const openEditModal = (project) => {
		setSelectedProject(project)
		setIsEditModalOpen(true)
	}

	const openDeleteModal = (project) => {
		setSelectedProject(project)
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
			<h1 className="text-5xl text-primary font-bold mb-16 pt-16 md:pt-8">Projects</h1>
			<h2 className="text-3xl mb-4">Total Count: {data?.totalCount}</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{!isLoading &&
					data.projects
						.sort((a, b) => a.date.seconds - b.date.seconds)
						.map((project) => (
							<Card key={project.id} className="bg-primary-foreground p-4 flex flex-col">
								<CardHeader className="p-2">
									<img src={project.coverImageUrl} alt={project.title} className="h-48 object-contain rounded-lg" />
								</CardHeader>
								<CardTitle className="text-card-foreground px-4 pt-4 border-t border-border/30 pb-4">{project.title}</CardTitle>
								<div className="flex-grow"></div>
								<CardFooter className="flex justify-end pt-4 pb-0 px-0 border-t border-border/30">
									<a href={project.presentationUrl} target="_blank">
										<Button variant="link">
											View <FaExternalLinkAlt className="ml-2" />
										</Button>
									</a>
									<div className="flex-1"></div>
									<Button variant="ghost" onClick={() => openDeleteModal(project)} className="text-destructive hover:text-destructive">
										Delete <MdDelete className="ml-2" />
									</Button>
									<Button variant="ghost" onClick={() => openEditModal(project)} className="text-primary hover:text-primary">
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
			<EditProjectModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} project={selectedProject} />
			<DeleteProjectModal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} project={selectedProject} />
			<AddProjectModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
			<Toaster />
		</div>
	)
}

export default Projects
