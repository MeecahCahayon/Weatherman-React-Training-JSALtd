import actionCreatorFactory, { Action } from 'typescript-fsa'
import { Forecast } from '../../api/types'

const actionCreator = actionCreatorFactory('Details')

export type FetchForecastPayload = Action<number>
export const fetchForcastAction = actionCreator.async<number, Forecast[], Error>('FETCH_FORCASTS')
