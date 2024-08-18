import './styles/Details.scss'

import React, { useEffect } from 'react'
import * as RootNavigation from '../../navigation/NavigationManager'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreState } from '../../root'
import { Location } from '../../api/types'

import { fetchForcastAction } from './actions'

import { CurrentWeatherTemperatureSection, ForcastWeatherSection } from './components'
import { Box, Chip, Stack, Typography } from '@mui/material'

const DetailSection = (): JSX.Element | null => {

	const dispatch = useDispatch()

	const location = useSelector<RootStoreState, Location | undefined>(state => state.details.selectedLocation)

	useEffect(() => {
		if (location) {
			dispatch(fetchForcastAction.started(location.id))
		}
	}, [location, dispatch])

	if (!location) {
		RootNavigation.navigateToSearch()
	}

	return (
		<Stack px={2} py={2} gap={5}>
			{location && (
				<>
					<Stack alignItems={'center'} gap={2}>
						<Typography variant='h4'> {location.name}, {location.sys.country} </Typography>	

						<Stack flexDirection={'row'} alignItems={'center'} gap={1}>
							<Box>
								<Chip label={`${location.main.temp}°C`} size='small' sx={{ fontWeight: 'bold', padding: '4px 8px' }} />
							</Box>

							<Typography variant='caption' > {`Feels Like: ${location.main.feels_like}°C`} </Typography>
						</Stack>
					</Stack>

					<CurrentWeatherTemperatureSection currentWeather={location.main} />

					<ForcastWeatherSection />
				</>
			)}
		</Stack>
	)
}

export default DetailSection
