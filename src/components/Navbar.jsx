import React, { useState } from "react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { IoMenu } from "react-icons/io5"

export default function Navbar() {
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	const openSheet = () => setIsSheetOpen(true)
	const closeSheet = () => setIsSheetOpen(false)

	return (
		<header className="absolute flex h-20 w-full shrink-0 items-center px-4 md:px-6 z-50">
			<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden text-primary" onClick={openSheet}>
						<IoMenu size={32} className="text-primary" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<NavLink to="/" onClick={closeSheet}>
						<img src="pwp.svg" className="h-12" />
						<span className="sr-only">Profit with Purpose</span>
					</NavLink>
					<div className="grid gap-2 py-6">
						<NavLink to="/" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Home
						</NavLink>
						<NavLink to="/portfolio" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Portfolio
						</NavLink>
						<NavLink to="/recruitment" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Recruitment
						</NavLink>
						<NavLink to="/members" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Members
						</NavLink>
						<NavLink to="/contact" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Contact
						</NavLink>
					</div>
				</SheetContent>
			</Sheet>
			<NavLink to="/" className={({ isActive }) => `mr-6 hidden md:flex ${isActive ? "md:hidden" : ""}`}>
				<img src="pwp.svg" className="h-14" />
				<span className="sr-only">Profit with Purpose</span>
			</NavLink>
			<NavigationMenu className="hidden w-full md:flex md:justify-end">
				<NavigationMenuList>
					<NavLink
						to="/portfolio"
						className={({ isActive }) => {
							return isActive
								? "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-bold transition-border border-b-2 border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
								: "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-border border-b-2 border-black/20 hover:border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
						}}
					>
						Portfolio
					</NavLink>
					<NavLink
						to="/recruitment"
						className={({ isActive }) => {
							return isActive
								? "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-bold transition-border border-b-2 border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
								: "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-border border-b-2 border-black/20 hover:border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
						}}
					>
						Recruitment
					</NavLink>
					<NavLink
						to="/members"
						className={({ isActive }) => {
							return isActive
								? "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-bold transition-border border-b-2 border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
								: "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-border border-b-2 border-black/20 hover:border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
						}}
					>
						Members
					</NavLink>
					<NavLink
						to="/contact"
						className={({ isActive }) => {
							return isActive
								? "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-bold transition-border border-b-2 border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
								: "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-border border-b-2 border-black/20 hover:border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
						}}
					>
						Contact
					</NavLink>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}
