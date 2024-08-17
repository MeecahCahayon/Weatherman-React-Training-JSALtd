import '../styles/Details.scss'

import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from 'lodash'

import { RootStoreState } from '../../root'
import { Location, Forecast, ForecastDisplay, WeatherDescription } from '../../api/types'

import { fetchForcastAction } from '../actions'

import CurrentWeatherTemperatureSection from './CurrentWeatherTemperatureSection'
import ForcastWeatherCard from './ForcastWeatherCard'
import { fDate } from '../../../utils/formatTime'

const DetailsScreen = (): JSX.Element | null => {

	/**
	 * Dependency Hooks
	 */

	const dispatch = useDispatch()

	/**
	 * Store State
	 */

	const location = useSelector<RootStoreState, Location | undefined>(state => state.details.selectedLocation)
	const forecasts = useSelector<RootStoreState, Forecast[] | undefined>(state => state.details.forecasts)

	const isLoading = useSelector<RootStoreState, boolean>(state => state.details.loading)
	const error = useSelector<RootStoreState, Error | undefined>(state => state.details.error)

	/**
	 * Effects/Subscriptions
	 */

	useEffect(() => {
		if (location) {
			// TODO (DONE) Dispatch action to load forecasts for given location id
			dispatch(fetchForcastAction.started(location.id))
		}
	}, [location, dispatch])

	const visibleForecasts: ForecastDisplay[] = useMemo(() => {
		if (!forecasts || error) return []
	
		const groupForecasts = Object.entries(
			Object.groupBy(forecasts, ({ dt_txt }) => dt_txt.split(' ')[0])
		).map(([date, forecasts]) => ({ date, forecasts }))
	
		const computedForecasts = groupForecasts.map(({ date, forecasts }) => {
			if (!forecasts) return { date }
	
			const { totalTemp, mostFrequentWeather } = forecasts.reduce(
				(acc, { main: { temp }, weather }) => {
					// Summing up temperatures
					acc.totalTemp += temp
	
					// Counting weather occurrences
					const weatherId = weather[0].id
					acc.weatherCount[weatherId] = (acc.weatherCount[weatherId] || 0) + 1
	
					// Updating the most frequent weather
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
				date: fDate(date, 'dddd'),
				averageTemperature: totalTemp / forecasts.length,
				weather: mostFrequentWeather,
			}
		})
	
		return computedForecasts
	}, [forecasts, error])
	

	/**
	 * Local Functions
	 */

	if (!location) {
		return null
	}

	return (
		<div className='details'>
			<h2>Weather Details:</h2>
			<h3>{location.name}, {location.sys.country}</h3>

			{/* TODO (Done) Render current temperatures */}
			{location && location.main && (
				<CurrentWeatherTemperatureSection currentWeather={location.main} />
			)}

			{/* TODO render forecasts - with loading/error state */}
			<h4>Forecast:</h4>

			{isLoading && <p>Loading...</p>}

			{!isLoading &&
				isArray(visibleForecasts) &&
				(visibleForecasts.slice(1, 6)).map((forecast, index) => (
					<ForcastWeatherCard key={index} forecast={forecast} />
				))
			}
		</div>
	)
}

export default DetailsScreen