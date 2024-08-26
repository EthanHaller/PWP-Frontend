import React, { useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showResetPassword, setShowResetPassword] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const { toast } = useToast()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate("/admin/home")
		} catch (error) {
			let message = "Error logging in. Please try again."
			if (error?.code === "auth/invalid-credential") message = "Incorrect username or password."
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
				duration: 2000,
			})
		}
	}

	const handlePasswordReset = async (e) => {
		e.preventDefault()
		if (!email) {
			toast({
				title: "Error",
				description: "Please enter your email address.",
				variant: "destructive",
				duration: 2000,
			})
			return
		}
		try {
			await sendPasswordResetEmail(auth, email)
			toast({
				title: "Success",
				description: "Password reset email sent. Please check your inbox.",
				variant: "success",
				duration: 2000,
			})
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error sending an email to reset your password. Please try again.",
				variant: "destructive",
				duration: 2000,
			})
		}
	}

	return (
		<div className="flex">
			<div className="hidden lg:flex w-1/2 min-h-screen flex-col justify-center items-center">
				<img src="/pwp.svg" alt="Logo" className="h-96" />
				<h1 className="text-5xl font-bold text-primary mt-8">Welcome, Admin</h1>
			</div>
			<div className="w-full lg:w-1/2 min-h-screen container flex flex-col justify-center items-center">
				<img src="/pwp.svg" alt="Logo" className="lg:hidden h-48 mb-8" />
				<h1 className="lg:hidden text-xl text-center text-primary">Welcome, Admin</h1>
				{showResetPassword ? (
					<>
						<h2 className="text-center text-3xl font-bold tracking-tight text-primary">Reset your password</h2>
						<form className="mt-8 w-full" onSubmit={handlePasswordReset}>
							<div className="w-2/3 mx-auto">
								<div className="mb-4">
									<Label htmlFor="email" className="sr-only">
										Email
									</Label>
									<Input
										id="email"
										name="email"
										type="text"
										autoComplete="email"
										className="relative block w-full appearance-none rounded-t-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
										placeholder="Email"
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="mb-4 text-right">
									<Button variant="link" type="button" onClick={() => setShowResetPassword(false)} className="text-sm text-primary">
										Back to sign in
									</Button>
								</div>
							</div>
							<div className="w-2/3 mx-auto">
								<Button
									type="submit"
									className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								>
									Send email
								</Button>
							</div>
						</form>
					</>
				) : (
					<>
						<h2 className="text-center text-3xl font-bold tracking-tight text-primary">Sign in to your account</h2>
						<form className="mt-8 w-full" onSubmit={handleSubmit}>
							<div className="w-2/3 mx-auto">
								<div className="mb-4">
									<Label htmlFor="email" className="sr-only">
										Email
									</Label>
									<Input
										id="email"
										name="email"
										type="text"
										autoComplete="email"
										className="relative block w-full appearance-none rounded-t-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
										placeholder="Email"
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="mb-4 relative">
									<Label htmlFor="password" className="sr-only">
										Password
									</Label>
									<Input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-b-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
									/>
									<div
										className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <FaEyeSlash className="text-primary" /> : <FaEye className="text-primary" />}
									</div>
								</div>
								<div className="mb-4 text-right">
									<Button variant="link" type="button" onClick={() => setShowResetPassword(true)} className="text-sm text-primary">
										Forgot your password?
									</Button>
								</div>
							</div>
							<div className="w-2/3 mx-auto">
								<Button
									type="submit"
									className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								>
									Sign in
								</Button>
							</div>
						</form>
					</>
				)}
			</div>
			<Toaster />
		</div>
	)
}

export default Login
