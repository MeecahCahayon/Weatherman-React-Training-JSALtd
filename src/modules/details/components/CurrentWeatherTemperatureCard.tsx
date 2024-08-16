import React from 'react'

interface Props {
	label: string,
	value: string,
}

const CurrentWeatherTemperatureCard = ({ label, value }: Props): JSX.Element => {

	return (
		<div>
			<h4>{label}</h4>
			<p>{value}</p>
		</div>
	)
}

export default CurrentWeatherTemperatureCard
