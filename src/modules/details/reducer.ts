import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Location, FetchForecastResponse } from '../api/types'
import * as searchActions from '../search/actions'

export interface StoreState {
	readonly selectedLocation?: Location

	readonly forecast?: FetchForecastResponse
	readonly loading: boolean
	readonly error?: Error
}

/**
 * The initial store state for this module.
 */
const INITIAL_STATE: StoreState = {
	loading: false,
}

/**
 * Reducer function for this module.
 */
export const reducer = reducerWithInitialState(INITIAL_STATE)
	// set selected location
	.case(searchActions.locationSelectedAction, (state, payload): StoreState => ({
		...state, selectedLocation: payload,
	}))