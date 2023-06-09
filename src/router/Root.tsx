import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../scenes/global/Navbar"
import CartMenu from "../scenes/global/CartMenu"
import Footer from "../scenes/global/Footer"
import { useEffect } from "react"
import Sidebar from "../scenes/global/Sidebar"

export interface IRootProps {}

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

const Root = (props: IRootProps) => {
	return (
		<>
			<Navbar />
			<CartMenu />
			<Sidebar />
			<Outlet />
			<Footer />
			<ScrollToTop />
		</>
	)
}

export default Root
