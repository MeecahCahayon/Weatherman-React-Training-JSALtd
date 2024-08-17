import '../styles/Details.scss'
import React from 'react'

import { ForecastDisplay } from '../../api/types'

interface Props {
	forecast: ForecastDisplay,
}

const ForcastWeatherCard = ({ forecast }: Props): JSX.Element => {

	const { date, averageTemperature, weather } = forecast

	return (
		<div className='forcastCards'>
			<p>{date}</p>
			{averageTemperature && <p>{`${averageTemperature?.toFixed(2)}°C`}</p>}
			{weather && <p>{weather.description}</p>}
		</div>
	)
}

export default ForcastWeatherCard
