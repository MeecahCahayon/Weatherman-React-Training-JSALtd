import '../styles/Details.scss'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreState } from '../../root'
import { Location, Forecast } from '../../api/types'

import { fetchForcastAction } from '../actions'

const DetailsScreen = (): JSX.Element | null => {

	/**
	 * Dependency Hooks
	 */

	const dispatch = useDispatch()

	/**
	 * Store State
	 */

	const location = useSelector<RootStoreState, Location | undefined>(state => state.details.selectedLocation)
	const loading = useSelector<RootStoreState, boolean>(state => state.details.loading)
	const error = useSelector<RootStoreState, Error | undefined>(state => state.details.error)
	const results = useSelector<RootStoreState, Forecast[] | undefined>(state => state.details.forecasts)

	/**
	 * Effects/Subscriptions
	 */

	useEffect(() => {
		if (location) {
			// TODO (DONE) Dispatch action to load forecasts for given location id
			dispatch(fetchForcastAction.started(location.id))
		}
	}, [location, dispatch])

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

			{/* TODO render current temperatures */}

			{/* TODO render forecasts - with loading/error state */}
		</div>
	)
}

export default DetailsScreen