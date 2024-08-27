import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Recruitment from "./pages/Recruitment"
import Members from "./pages/Members"
import Contact from "./pages/Contact"
import Layout from "./components/Layout"
import NotFound from "./components/NotFound"
import Login from "./pages/admin/Login"
import AdminHome from "./pages/admin/AdminHome"
import Partners from "./pages/admin/Partners"
import Countries from "./pages/admin/Countries"
import Projects from "./pages/admin/Projects"
import AdminMembers from "./pages/admin/Members"
import AdminRecruitment from "./pages/admin/Recruitment"
import AdminManagement from "./pages/admin/AdminManagement"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import "./index.css"
import Error from "./components/Error"

const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/portfolio",
				element: <Portfolio />,
			},
			{
				path: "/recruitment",
				element: <Recruitment />,
			},
			{
				path: "/members",
				element: <Members />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
		],
	},
	{
		path: "/admin",
		errorElement: <Error />,
		children: [
			{
				path: "",
				element: <Login />,
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "home",
						element: <AdminHome />,
					},
					{
						path: "partners",
						element: <Partners />,
					},
					{
						path: "countries",
						element: <Countries />,
					},
					{
						path: "projects",
						element: <Projects />,
					},
					{
						path: "members",
						element: <AdminMembers />,
					},
					{
						path: "recruitment",
						element: <AdminRecruitment />,
					},
					{
						path: "admin-management",
						element: <AdminManagement />,
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</QueryClientProvider>
)
