import { Skeleton } from '@mui/material'
import React from 'react'
import { PageMainStyle } from '../../screens/styles/Pages'

const Loader = (): JSX.Element => (
	<PageMainStyle>
		<Skeleton variant="rectangular" width="100%" height="100%" />
	</PageMainStyle>
)

export default Loader