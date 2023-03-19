import { Outlet } from "react-router-dom"
import Navbar from "../scenes/global/Navbar"

export interface IRootProps {}

const Root = (props: IRootProps) => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}

export default Root
