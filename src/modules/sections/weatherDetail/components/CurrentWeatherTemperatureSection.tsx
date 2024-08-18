import '../styles/Details.scss'

import React from 'react'

import { Weather } from '../../../api/types'

import { CurrentWeatherTemperatureCard } from '.'
import { Stack } from '@mui/material'

type Props = {
	currentWeather: Weather
}

const CurrentWeatherTemperatureSection = ({ currentWeather }: Props): JSX.Element => {

	const { temp_max, temp_min, humidity, pressure } = currentWeather

	const temperatureCards = [
		{ label: 'Temp Min', value: temp_min, valueString: `${temp_min}°C` },
		{ label: 'Temp Max', value: temp_max, valueString: `${temp_max}°C` },
		{ label: 'Humidity', value: humidity, valueString: `${humidity} %` },
		{ label: 'Pressure', value: pressure, valueString: `${pressure} hPa` }
	].filter(({ value }) => value)

	return (
		<Stack flexDirection={'row'} gap={10}>
			{temperatureCards.map(({ label, valueString }) => (
				<CurrentWeatherTemperatureCard key={label} label={label} value={valueString} />
			))}
		</Stack>
	)
}

export default CurrentWeatherTemperatureSection
