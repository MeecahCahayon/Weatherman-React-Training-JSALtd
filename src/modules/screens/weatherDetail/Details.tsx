import '../styles/Pages.scss'

import React from 'react'

import { Container } from '@mui/material'
import { DetailSection } from '../../sections/weatherDetail'
import { PageMainStyle } from '../styles/Pages'

export default function Details(): JSX.Element {
	return (
		<PageMainStyle>
			<Container maxWidth={false} disableGutters>
				<DetailSection />
			</Container>
		</PageMainStyle>
	)
}
