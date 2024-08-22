import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import AdminNavbar from "./AdminNavbar"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () => {
	const { currentUser } = useAuth()

	return currentUser ? (
		<div className="flex">
			<AdminNavbar />
			<main className="flex-1 p-6 md:ml-64">
				<Outlet />
			</main>
		</div>
	) : (
		<Navigate to="/admin" />
	)
}

export default ProtectedRoute
