import '../styles/Pages.scss'

import React from 'react'

import { Container } from '@mui/material'
import { SearchSection } from '../../sections/weatherSearch'
import { PageMainStyle } from '../styles/Pages'

export default function Search(): JSX.Element {
	return (
		<PageMainStyle>
			<Container maxWidth={false} disableGutters>
				<SearchSection />
			</Container>
		</PageMainStyle>
	)
}
