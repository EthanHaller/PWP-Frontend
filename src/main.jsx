import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Recruitment from "./pages/Recruitment"
import Members from "./pages/Members"
import Contact from "./pages/Contact"
import Project from "./pages/Project"
import Layout from "./components/Layout"
import NotFound from "./components/NotFound"
import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import "./index.css"

const router = createBrowserRouter([
	{
		element: <Layout />,
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
				path: "/portfolio/:id",
				element: <Project />,
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
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
	{
		path: "/admin",
		children: [
			{
				path: "",
				element: <Login />,
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "dashboard",
						element: <Dashboard />,
					},
				],
			},
		],
	},
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
