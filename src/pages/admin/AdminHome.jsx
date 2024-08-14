import React from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../../components/ui/button"

const Home = () => {
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
		<div className="container">
			<h1 className="text-5xl text-primary font-bold mb-16">Home</h1>
			<h2 className="text-3xl mb-4">Hey, Admin!</h2>
			<p className="text-lg text-muted-foreground">
				This is where you can edit the content that is displayed on the main PwP website. You can add and delete content such as partner logos,
				countries impacted, current members, past projects, and interest forms.
			</p>
		</div>
	)
}

export default Home
