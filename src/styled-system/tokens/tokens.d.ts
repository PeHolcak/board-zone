/* eslint-disable */
export type Token = `colors.${ColorToken}` | `radii.${RadiusToken}` | `shadows.${ShadowToken}` | `fonts.${FontToken}` | `fontSizes.${FontSizeToken}` | `spacing.${SpacingToken}` | `breakpoints.${BreakpointToken}` | `sizes.${SizeToken}`

export type ColorPalette = "bg" | "surface" | "primary" | "primary_20" | "secondary" | "secondary_70" | "secondary_dark" | "accent" | "text" | "muted" | "borderSubtle" | "dark" | "darkText" | "ghostButton" | "white" | "error" | "inputBorder" | "black"

export type ColorToken = "bg" | "surface" | "primary" | "primary_20" | "secondary" | "secondary_70" | "secondary_dark" | "accent" | "text" | "muted" | "borderSubtle" | "dark" | "darkText" | "ghostButton" | "white" | "error" | "inputBorder" | "black" | "colorPalette"

export type RadiusToken = "sm" | "md" | "lg" | "pill"

export type ShadowToken = "soft"

export type FontToken = "sans"

export type FontSizeToken = "xs" | "sm" | "base" | "lg" | "xl" | "2xl"

export type SpacingToken = "xs" | "sm" | "md" | "lg" | "xl" | "-xs" | "-sm" | "-md" | "-lg" | "-xl"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type Tokens = {
		colors: ColorToken
		radii: RadiusToken
		shadows: ShadowToken
		fonts: FontToken
		fontSizes: FontSizeToken
		spacing: SpacingToken
		breakpoints: BreakpointToken
		sizes: SizeToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"