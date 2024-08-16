import '../styles/Details.scss'

import React from 'react'

import { Weather } from '../../api/types'

import CurrentWeatherTemperatureCard from './CurrentWeatherTemperatureCard'

type Props = {
	currentWeather: Weather
}

const CurrentWeatherTemperatureSection = ({ currentWeather }: Props): JSX.Element => {

	const { temp, temp_max, temp_min, humidity, pressure } = currentWeather

	const temperatureCards = [
		{ label: 'Temp Min', value: temp_min, valueString: `${temp_min}°C` },
		{ label: 'Temp Max', value: temp_max, valueString: `${temp_max}°C` },
		{ label: 'Humidity', value: humidity, valueString: `${humidity} %` },
		{ label: 'Pressure', value: pressure, valueString: `${pressure} hPa` }
	].filter(({ value }) => value)

	return (
		<>
			{temp && <h3>{temp}°C</h3>}

			<div className='currentWeatherTemperatureCards'>
				{temperatureCards.map(({ label, valueString }) => (
					<CurrentWeatherTemperatureCard key={label} label={label} value={valueString} />
				))}
			</div>
		</>
	)
}

export default CurrentWeatherTemperatureSection
