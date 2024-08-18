import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from './actions'
import { Location } from '../../api/types'

export interface StoreState {
	readonly searchResults: Location[]
	readonly initial: boolean
	readonly loading: boolean
	readonly error?: Error
}

const INITIAL_STATE: StoreState = {
	searchResults: [],
	initial: true,
	loading: false,
}

export const reducer = reducerWithInitialState(INITIAL_STATE)
	.case(actions.fetchLocationsAction.started, (state): StoreState => ({
		...state, loading: true, initial: false, searchResults: [], error: undefined,
	}))
	.case(actions.fetchLocationsAction.failed, (state, payload): StoreState => ({
		...state, loading: false, initial: false, searchResults: [], error: payload.error,
	}))
	.case(actions.fetchLocationsAction.done, (state, payload): StoreState => ({
		...state, loading: false, initial: false, searchResults: payload.result, error: undefined,
	}))
