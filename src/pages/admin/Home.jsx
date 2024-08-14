import React from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../../components/ui/button"

const Dashboard = () => {
	const navigate = useNavigate()
	const { currentUser } = useAuth()

	const handleLogout = async () => {
		try {
			await signOut(auth)
			navigate("/admin")
		} catch (error) {
			console.error("Error logging out:", error)
		}
	}

	return (
		<div className="container flex ">
			<h1>Dashboard</h1>
			{currentUser && <p>Welcome, {currentUser.email}</p>}
			<Button onClick={handleLogout} className="">
				Logout
			</Button>
		</div>
	)
}

export default Dashboard
