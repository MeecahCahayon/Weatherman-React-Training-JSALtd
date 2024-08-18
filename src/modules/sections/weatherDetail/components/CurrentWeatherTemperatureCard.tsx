import { Card, Stack, Typography } from '@mui/material'
import React from 'react'

interface Props {
	label: string,
	value: string,
}

const CurrentWeatherTemperatureCard = ({ label, value }: Props): JSX.Element => {

	return (
		<Card
			sx={{
				width: '100%',

				padding: 2,
				
				borderRadius: 5,
				border: '1px solid #667865',
				boxShadow: '0 0 10px #667865',
			}}
		>
			<Stack flexDirection={'row'} gap={1} justifyContent={'center'}>
				<Typography variant='caption' style={{ fontWeight: 'bold' }}> {label} </Typography>	
				<Typography variant='caption'> {value} </Typography>	
			</Stack>
		</Card>
	)
}

export default CurrentWeatherTemperatureCard
