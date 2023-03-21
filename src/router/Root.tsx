import { Outlet } from "react-router-dom"
import Navbar from "../scenes/global/Navbar"
import CartMenu from "../scenes/global/CartMenu"
import Footer from "../scenes/global/Footer"

export interface IRootProps {}

const Root = (props: IRootProps) => {
	return (
		<>
			<Navbar />
			<CartMenu />
			<Outlet />
			<Footer />
		</>
	)
}

export default Root
