import React, { memo } from 'react'
import { Box, BoxProps } from '@mui/material'

interface Props extends BoxProps {
  customColor?: string;
}

function SearchIcon({ customColor, ...other }: Props) {
	return (
		<Box {...other}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 32 32"
				fill="none"
			>
				<path
					d="M1 14.511C1 24.8965 12.25 31.3872 21.25 26.1947C25.427 23.7847 28 19.3309 28 14.511C28 4.12572 16.75 -2.36505 7.75004 2.82754C3.57302 5.23754 1 9.69129 1 14.511Z"
					stroke={customColor || '#3C517C'}
					strokeWidth="1.8"
				/>
				<path d="M24.0461 24.0508L31.0001 31" stroke={customColor || '#817fa0'} strokeWidth="1.8" />
			</svg>
		</Box>
	)
}

export default memo(SearchIcon)
