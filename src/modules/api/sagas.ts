import { SagaIterator } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import { fetchLocationsAction, FetchLocationsPayload } from '../search/actions'
import { fetchLocations, fetchForecast } from '../api/functions'
import { Forecast, Location } from '../api/types'
import { fetchForcastAction, FetchForecastPayload } from '../details/actions'

function* handleFetchLocations(action: FetchLocationsPayload): SagaIterator {
	const query: string = action.payload
	try {
		const result: Location[] | undefined = yield call(fetchLocations, query)
		if (result) {
			yield put(fetchLocationsAction.done({ params: action.payload, result }))
		}
	} catch (error) {
		yield put(fetchLocationsAction.failed({ params: action.payload, error: error as Error }))
	}
}

function* handleFetchForecast(action: FetchForecastPayload): SagaIterator {
	// TODO implement saga to fetch forecast
	const query: number = action.payload
	try {
		const result: Forecast[] | undefined = yield call(fetchForecast, query)
		if (result) {
			yield put(fetchForcastAction.done({ params: action.payload, result }))
		}
	} catch (error) {
		yield put(fetchForcastAction.failed({ params: action.payload, error: error as Error }))
	}
}

export default function* (): SagaIterator {
	yield takeEvery(fetchLocationsAction.started, handleFetchLocations)
	yield takeEvery(fetchForcastAction.started, handleFetchForecast)
}
