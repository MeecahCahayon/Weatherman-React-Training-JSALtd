import React from 'react'
import { useDispatch } from 'react-redux'

import { locationSelectedAction } from '../actions'
import { Location as LocationType } from '../../../api/types'
import { Box, Card, Chip, Stack, Typography } from '@mui/material'

interface Props {
	location: LocationType
}

const LocationCard = ({ location }: Props): JSX.Element => {

	const {
		name,
		sys: {
			country
		},
		main: {
			temp,
			feels_like
		}
	} = location

	const dispatch = useDispatch()

	const _onItemClicked = () => {
		dispatch(locationSelectedAction(location))
	}

	// Used MUI custom styling and SCSS to show different ways that could be used to implement styling. 
	return (
		<Card
			sx={{ 
				borderRadius: 3,
				boxShadow: '0 0 3px #667865',

				'&:hover': {
					cursor: 'pointer',
					backgroundColor: '#f5f5f5'
				}
			}}
			onClick={_onItemClicked}
		>
			<Stack className='locationCard' gap={2}>
				<Typography variant='body1' style={{ fontWeight: 'bold' }}> {`${name}, ${country}`} </Typography>	

				<Stack flexDirection={'row'} alignItems={'center'} gap={1}>
					<Box>
						<Chip label={`${temp}°C`} size='small' sx={{ fontWeight: 'bold', padding: '4px 8px' }} />
					</Box>

					<Typography variant='caption' style={{ fontWeight: 'bold' }}> {`Feels Like: ${feels_like}°C`} </Typography>	
				</Stack>

			</Stack>
		</Card>
	)
}

export default LocationCard
