import React, { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "../../components/ui/use-toast"
import { Toaster } from "../../components/ui/toaster"
import { MdDelete, MdAdd } from "react-icons/md"
import { Button } from "@/components/ui/button"
import MultipleSelector from "../../components/ui/combobox"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"

const fetchCountriesWorkedWith = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/countries`)
	return response.data
}

const DeleteCountryModal = ({ open, onOpenChange, country }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async (countryId) => {
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/countries/delete/${countryId}`)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["countriesWorkedWith"])
			toast({
				title: "Success",
				description: "Country deleted successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to delete country",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleDelete = (e) => {
		e.preventDefault()
		mutation.mutate(country.id)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Delete Country Modal">
				<DialogTitle>Delete Country</DialogTitle>
				<p>Are you sure you want to delete {country?.name}?</p>
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

const Countries = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["countriesWorkedWith"],
		queryFn: fetchCountriesWorkedWith,
	})

	const queryClient = useQueryClient()
	const { toast } = useToast()

	const [allCountries, setAllCountries] = useState([])
	const [selectedCountries, setSelectedCountries] = useState([])
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [countryToDelete, setCountryToDelete] = useState(null)

	useEffect(() => {
		fetch("/countries.json")
			.then((response) => response.json())
			.then((data) => {
				const countryOptions = data.objects.world.geometries
					.map((country) => ({
						value: country.properties.name,
						label: country.properties.name,
					}))
					.sort((a, b) => a.label.localeCompare(b.label))

				setAllCountries(countryOptions)
			})
	}, [])

	const addCountriesMutation = useMutation({
		mutationFn: async (countries) => {
			return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/countries/add`, { countries })
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["countriesWorkedWith"])
			toast({
				title: "Success",
				description: "Countries added successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to add countries",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleAddCountries = () => {
		if (selectedCountries.length > 0) {
			addCountriesMutation.mutate(selectedCountries)
			setSelectedCountries([])
		}
	}

	const handleDeleteCountry = (country) => {
		setCountryToDelete(country)
		setDeleteModalOpen(true)
	}

	const handleSelectCountry = (options) => {
		setSelectedCountries(options.map((option) => option.value))
	}

	if (isError) {
		return <Error />
	}

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-5xl text-primary font-bold mb-8 pt-16 md:pt-8">Countries</h1>
			<h2 className="text-3xl mb-8">Total Count: {data?.totalCount}</h2>

			<div className="mb-4">
				{data?.countries
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((country) => (
						<Badge variant="secondary" key={country.id} className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
							{country.name}
							<Button variant="ghost" onClick={() => handleDeleteCountry(country)} className="ml-2 text-destructive hover:text-destructive px-2 py-0">
								<MdDelete />
							</Button>
						</Badge>
					))}
			</div>
			<MultipleSelector
				options={allCountries}
				value={selectedCountries.map((value) => ({ value, label: value }))}
				onChange={handleSelectCountry}
				placeholder="Select countries to add"
			/>
			<div className="flex justify-end items-center mt-2">
				<Button onClick={handleAddCountries}>
					<MdAdd className="mr-2" />
					Add Selected Countries
				</Button>
			</div>
			<Toaster />
			{countryToDelete && <DeleteCountryModal open={deleteModalOpen} onOpenChange={setDeleteModalOpen} country={countryToDelete} />}
		</div>
	)
}

export default Countries
