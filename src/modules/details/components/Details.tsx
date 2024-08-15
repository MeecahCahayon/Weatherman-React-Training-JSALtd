import '../styles/Details.scss'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreState } from '../../root'
import { Location } from '../../api/types'

const DetailsScreen = (): JSX.Element | null => {

	/**
	 * Dependency Hooks
	 */

	const dispatch = useDispatch()

	/**
	 * Store State
	 */

	const location = useSelector<RootStoreState, Location | undefined>(state => state.details.selectedLocation)

	/**
	 * Effects/Subscriptions
	 */

	useEffect(() => {
		if (location) {
			// TODO dispatch action to load forecasts for given location id
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