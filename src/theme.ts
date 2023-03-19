import { createTheme } from "@mui/material/styles"
import { PaletteMode, ThemeOptions } from "@mui/material"
import { createContext, useMemo, useState } from "react"

export const shades = (mode: PaletteMode) => ({
	...(mode === "dark"
		? {
				primary: {
					100: "#cccccc",
					200: "#999999",
					300: "#666666",
					400: "#333333",
					500: "#000000",
					600: "#000000",
					700: "#000000",
					800: "#000000",
					900: "#000000",
				},
				secondary: {
					100: "#f7ccd2",
					200: "#ef99a4",
					300: "#e66677",
					400: "#de3349",
					500: "#d6001c",
					600: "#ab0016",
					700: "#800011",
					800: "#56000b",
					900: "#2b0006",
				},
				neutral: {
					100: "#f5f5f5",
					200: "#ecebeb",
					300: "#e2e1e1",
					400: "#d9d7d7",
					500: "#cfcdcd",
					600: "#a6a4a4",
					700: "#7c7b7b",
					800: "#535252",
					900: "#292929",
				},
		  }
		: {
				primary: {
					900: "#cccccc",
					800: "#999999",
					700: "#666666",
					600: "#333333",
					500: "#000000",
					400: "#000000",
					300: "#000000",
					200: "#000000",
					100: "#000000",
				},
				secondary: {
					900: "#f7ccd2",
					800: "#ef99a4",
					700: "#e66677",
					600: "#de3349",
					500: "#d6001c",
					400: "#ab0016",
					300: "#800011",
					200: "#56000b",
					100: "#2b0006",
				},
				neutral: {
					900: "#f5f5f5",
					800: "#ecebeb",
					700: "#e2e1e1",
					600: "#d9d7d7",
					500: "#cfcdcd",
					400: "#a6a4a4",
					300: "#7c7b7b",
					200: "#535252",
					100: "#292929",
				},
		  }),
})

export const themeSettings = (mode: PaletteMode): ThemeOptions => {
	const colors = shades(mode)

	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? {
						primary: {
							main: colors.primary[500],
						},
						secondary: {
							main: colors.secondary[500],
						},
						neutral: {
							dark: colors.neutral[700],
							main: colors.neutral[500],
							light: colors.neutral[100],
						},
						background: {
							default: colors.primary[500],
						},
				  }
				: {
						primary: {
							main: colors.primary[100],
						},
						secondary: {
							main: colors.secondary[500],
						},
						neutral: {
							dark: colors.neutral[700],
							main: colors.neutral[500],
							light: colors.neutral[100],
						},
						background: {
							default: "#fcfcfc",
						},
				  }),
		},
		typography: {
			fontFamily: ["Poppins", "sans-serif"].join(","),
			fontSize: 11,
			h1: {
				fontFamily: ["Maven Pro", "sans-serif"].join(","),
				fontSize: 48,
			},
			h2: {
				fontFamily: ["Maven Pro", "sans-serif"].join(","),
				fontSize: 36,
			},
			h3: {
				fontFamily: ["Maven Pro", "sans-serif"].join(","),
				fontSize: 20,
			},
			h4: {
				fontFamily: ["Maven Pro", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	}
}

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
})

export const useMode = () => {
	const [mode, setMode] = useState<PaletteMode>("dark")

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prev) => (prev === "light" ? "dark" : "light"))
			},
		}),
		[]
	)
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

	return [theme, colorMode] as const
}
