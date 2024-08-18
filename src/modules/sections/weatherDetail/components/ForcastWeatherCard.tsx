import '../styles/Details.scss'
import React from 'react'

import { ForecastDisplay } from '../../../api/types'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { fDate } from '../../../../utils/formatTime'

interface Props {
	forecast: ForecastDisplay,
}

const ForcastWeatherCard = ({ forecast }: Props): JSX.Element => {

	const { date, averageTemperature, weather } = forecast

	return (
		<Stack className='forcastCards' flexDirection={'row'} gap={3}>
			<Typography variant='body1' sx={{ fontWeight: 'bold', width: '225px' }}> {`${fDate(date, 'dddd, MMMM Do')}`} </Typography>

			{averageTemperature && (
				<Box>
					<Chip label={`${averageTemperature?.toFixed(2)}°C`} size='small' sx={{ fontWeight: 'bold', padding: '4px 8px' }} />
				</Box>
			)}

			{weather && <Typography variant='body1'>{weather.description}</Typography>}
			
		</Stack>
	)
}

export default ForcastWeatherCard
