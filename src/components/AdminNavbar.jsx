import React, { useState } from "react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { IoMenu } from "react-icons/io5"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"

export default function AdminNavbar() {
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	const openSheet = () => setIsSheetOpen(true)
	const closeSheet = () => setIsSheetOpen(false)

	const handleLogout = async () => {
		try {
			await signOut(auth)
		} catch (error) {
			console.error("Error logging out:", error)
		}
	}

	return (
		<header className="absolute md:fixed">
			{/* Mobile Menu */}
			<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden text-primary m-6" onClick={openSheet}>
						<IoMenu size={32} className="text-primary" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<div className="flex items-center mb-8">
						<img src="/pwp.svg" className="h-14" alt="PwP Logo" />
						<span className="sr-only">PwP Admin</span>
						<h1 className="mx-4 text-primary font-bold">PwP Admin</h1>
					</div>
					<nav className="flex flex-col flex-grow space-y-4">
						<NavLink to="/admin/home" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Home
						</NavLink>
						<NavLink to="/admin/partners" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Partners
						</NavLink>
						<NavLink to="/admin/countries" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Countries
						</NavLink>
						<NavLink to="/admin/projects" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Projects
						</NavLink>
						<NavLink to="/admin/members" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Members
						</NavLink>
						<NavLink to="/admin/recruitment" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Recruitment
						</NavLink>
						<NavLink to="/admin/admin-management" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Admin Management
						</NavLink>
					</nav>
					<div className="mt-auto">
						<Button onClick={handleLogout} className="w-full">
							Logout
						</Button>
					</div>
				</SheetContent>
			</Sheet>

			{/* Desktop Menu */}
			<aside className="hidden md:flex flex-col w-64 h-screen p-4 bg-card border-r">
				<div className="flex items-center mb-8">
					<img src="/pwp.svg" className="h-14" alt="PwP Logo" />
					<span className="sr-only">PwP Admin</span>
					<h1 className="mx-4 text-primary font-bold">PwP Admin</h1>
				</div>
				<nav className="flex flex-col flex-1 grow space-y-6">
					<NavLink to="/admin/home" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-primary")}>
						Home
					</NavLink>
					<NavLink to="/admin/partners" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-primary")}>
						Partners
					</NavLink>
					<NavLink to="/admin/countries" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-primary")}>
						Countries
					</NavLink>
					<NavLink to="/admin/projects" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-primary")}>
						Projects
					</NavLink>
					<NavLink to="/admin/members" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-primary")}>
						Members
					</NavLink>
					<NavLink to="/admin/recruitment" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-primary")}>
						Recruitment
					</NavLink>
					<NavLink
						to="/admin/admin-management"
						className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-primary")}
					>
						Admin Management
					</NavLink>
				</nav>
				<Button onClick={handleLogout} className="mt-auto">
					Logout
				</Button>
			</aside>
		</header>
	)
}
