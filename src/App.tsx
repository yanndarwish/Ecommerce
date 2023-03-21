import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { ColorModeContext, useMode } from "./theme"
import { RouterProvider } from "react-router-dom"
import router from "./router/router"

const App = () => {
	const [theme, colorMode] = useMode()

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<RouterProvider router={router} />
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App
