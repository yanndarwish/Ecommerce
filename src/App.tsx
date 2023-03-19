import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { ColorModeContext, useMode } from "./theme"
import { useEffect } from "react"
import { RouterProvider, useLocation } from "react-router-dom"
import router from "./router/router"

// const ScrollToTop = () => {
// 	const { pathname } = useLocation()

// 	useEffect(() => {
// 		window.scrollTo(0, 0)
// 	}, [pathname])

// 	return null
// }

const App = () => {
	const [theme, colorMode] = useMode()

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<RouterProvider router={router} />
					{/* <ScrollToTop /> */}
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App
