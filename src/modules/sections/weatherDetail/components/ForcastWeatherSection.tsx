import '../styles/Details.scss'

import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { RootStoreState } from '../../../root'
import { Forecast, ForecastDisplay, WeatherDescription } from '../../../api/types'

import { ForcastWeatherCard } from '.'
import { Skeleton, Stack, Typography } from '@mui/material'
import { isArray } from 'lodash'

const ForcastWeatherSection = (): JSX.Element => {

	const forecasts = useSelector<RootStoreState, Forecast[] | undefined>(state => state.details.forecasts)
	const isLoading = useSelector<RootStoreState, boolean>(state => state.details.loading)
	const error = useSelector<RootStoreState, Error | undefined>(state => state.details.error)
	
	// Aggregates the forecasts into daily data and computes the average temperature and the most frequent weather
	const visibleForecasts: ForecastDisplay[] = useMemo(() => {
		if (!forecasts || error) return []
	
		const groupForecasts = Object.entries(
			Object.groupBy(forecasts, ({ dt_txt }) => dt_txt.split(' ')[0])
		).map(([date, forecasts]) => ({ date, forecasts }))
	
		const computedForecasts = groupForecasts.map(({ date, forecasts }) => {
			if (!forecasts) return { date }
	
			const { totalTemp, mostFrequentWeather } = forecasts.reduce(
				(acc, { main: { temp }, weather }) => {
					acc.totalTemp += temp
	
					const weatherId = weather[0].id
					acc.weatherCount[weatherId] = (acc.weatherCount[weatherId] || 0) + 1
	
					if (acc.weatherCount[weatherId] > acc.maxCount) {
						acc.maxCount = acc.weatherCount[weatherId]
						acc.mostFrequentWeather = weather[0]
					}
	
					return acc
				},
				{
					totalTemp: 0,
					weatherCount: {} as { [key: string]: number },
					maxCount: 0,
					mostFrequentWeather: {} as WeatherDescription,
				}
			)
	
			return {
				date,
				averageTemperature: totalTemp / forecasts.length,
				weather: mostFrequentWeather,
			}
		})
	
		return computedForecasts
	}, [forecasts, error])

	return (
		<Stack gap={2}>
			<Typography variant='h6'> {'5 Day Forecast'} </Typography>

			{/* Another way of returning components that could be used to show a different states. */}
			{isLoading && (
				<Stack gap={3}>
					{[...Array(5)].map(i => <Skeleton key={i} variant="text" height={40} />)}
				</Stack>
			)}

			{!isLoading &&
				isArray(visibleForecasts) && (
				<Stack  gap={3}>
					{(visibleForecasts.slice(1, 6)).map((forecast, index) => (
						<ForcastWeatherCard key={index} forecast={forecast} />
					))}
				</Stack>
			)}

			{!isLoading && 
				error && (
				<Stack alignItems={'center'}>
					<Typography variant='body1'> Could not load forecast </Typography>
				</Stack>
			)}
		</Stack>
	)
}

export default ForcastWeatherSection
