import { SagaIterator } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import { fetchLocationsAction, FetchLocationsPayload } from '../search/actions'
import { fetchLocations } from '../api/functions'
import { Location } from '../api/types'
import { FetchForecastPayload } from '../details/actions'

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
}

export default function* (): SagaIterator {
	yield takeEvery(fetchLocationsAction.started, handleFetchLocations)
}
