import { Outlet } from "react-router-dom"
import Navbar from "../scenes/global/Navbar"
import CartMenu from "../scenes/global/CartMenu"

export interface IRootProps {}

const Root = (props: IRootProps) => {
	return (
		<>
			<Navbar />
			<CartMenu />
			<Outlet />
		</>
	)
}

export default Root
