import actionCreatorFactory, { Action } from 'typescript-fsa'
import { Forecast } from '../api/types'

const actionCreator = actionCreatorFactory('Details')

// location id is the payload
export type FetchForecastPayload = Action<number>
// TODO  (DONE) Create action to fetch forecast for a location id
export const fetchForcastAction = actionCreator.async<number, Forecast[], Error>('FETCH_FORCASTS')