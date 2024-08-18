import { SagaIterator } from 'redux-saga'
import { takeEvery } from 'redux-saga/effects'

import * as actions from './actions'
import * as RootNavigation from '../../navigation/NavigationManager'

function handleLocationSelected() {
	RootNavigation.navigateToDetails()
}

export default function* (): SagaIterator {
	yield takeEvery(actions.locationSelectedAction, handleLocationSelected)
}
