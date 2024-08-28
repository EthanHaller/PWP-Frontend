import React, { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"

const Home = () => {
	const [displayName, setDisplayName] = useState("")

	useEffect(() => {
		const auth = getAuth()
		const user = auth.currentUser

		if (user) {
			setDisplayName(user.displayName || "Admin")
		} else {
			setDisplayName("Admin")
		}
	}, [])

	return (
		<div className="container">
			<h1 className="text-5xl text-primary font-bold mb-16 pt-16 md:pt-8">Home</h1>
			<h2 className="text-3xl mb-4">Hey, {displayName}!</h2>
			<p className="text-lg text-muted-foreground">
				This is where you can edit the content that is displayed on the main PwP website. You can add and delete content such as partner logos,
				countries impacted, current members, past projects, and interest forms.
			</p>
			<p className="mt-16 text-muted-foreground">If you run into any unexpected issues with the site, please contact Ethan Haller at ethanhaller02@gmail.com</p>
		</div>
	)
}

export default Home
