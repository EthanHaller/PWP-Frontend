import React from "react"
import MemberCard from "../components/MemberCard"
import { SkeletonCard } from "../components/SkeletonCard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Error from "../components/Error"

const fetchMembers = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/members`)
	return response.data
}

const Members = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["members"],
		queryFn: fetchMembers,
	})

	if (isError) {
		return <Error />
	}

	return (
		<>
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Members</h1>
			<div className="container mx-auto p-4 mb-8">
				<h1 className="text-5xl font-bold mt-32 mb-8 text-primary">Members.</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto align-items-start justify-items-center">
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
						: data.exec
								.sort((a, b) => (a.relativeOrder ?? 10) - (b.relativeOrder ?? 10))
								.map((member) => (
									<MemberCard
										key={member.id}
										headshotUrl={member.headshotUrl}
										name={member.name}
										execRole={member.execRole}
										about={member.about}
									/>
								))}
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
						: data.nonExec
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((member) => <MemberCard key={member.id} headshotUrl={member.headshotUrl} name={member.name} about={member.about} />)}
				</div>
			</div>
		</>
	)
}

export default Members
