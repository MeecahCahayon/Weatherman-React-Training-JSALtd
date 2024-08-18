import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Location, Forecast } from '../../api/types'
import * as searchActions from '../weatherSearch/actions'
import * as detailsActions from './actions'

export interface StoreState {
	readonly selectedLocation?: Location

	readonly forecasts?: Forecast[]
	readonly loading: boolean
	readonly error?: Error
}

const INITIAL_STATE: StoreState = {
	loading: false,
}

export const reducer = reducerWithInitialState(INITIAL_STATE)
	.case(searchActions.locationSelectedAction, (state, payload): StoreState => ({
		...state, selectedLocation: payload,
	}))

	.case(detailsActions.fetchForcastAction.started, (state): StoreState => ({
		...state, loading: true, forecasts: [], error: undefined,
	}))
	.case(detailsActions.fetchForcastAction.done, (state, payload): StoreState => ({
		...state, loading: false, forecasts: payload.result, error: undefined,
	}))
	.case(detailsActions.fetchForcastAction.failed, (state, payload): StoreState => ({
		...state, loading: false, forecasts: [], error: payload.error,
	}))
