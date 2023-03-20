import { createTheme } from "@mui/material/styles"
import { PaletteMode, ThemeOptions } from "@mui/material"
import { createContext, useMemo, useState } from "react"

export const shades = (mode: PaletteMode) => ({
	...(mode === "dark"
		? {
				primary: {
					900: "#171717",
					800: "#262626",
					700: "#404040",
					600: "#525252",
					500: "#333333",
					400: "#A3A3A3",
					300: "#D4D4D4",
					200: "#E5E5E5",
					100: "#F5F5F5",
				},
				secondary: {
					50: "#fbf5f5",
					100: "#f7ecec",
					200: "#f0dbdc",
					300: "#e4bdbf",
					400: "#d4989d",
					500: "#bd6b73",
					600: "#a95561",
					700: "#8d4350",
					800: "#773a47",
					900: "#673440",
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
					100: "#171717",
					200: "#262626",
					300: "#404040",
					400: "#525252",
					500: "#333333",
					600: "#A3A3A3",
					700: "#D4D4D4",
					800: "#E5E5E5",
					900: "#F5F5F5",
				},
				secondary: {
					900: "#fbf5f5",
					800: "#f7ecec",
					700: "#f0dbdc",
					600: "#e4bdbf",
					500: "#d4989d",
					400: "#bd6b73",
					300: "#a95561",
					200: "#8d4350",
					100: "#773a47",
					50: "#673440",
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
							default: colors.primary[900],
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