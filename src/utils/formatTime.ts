// import { format, getTime, formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import { isDate } from 'lodash'

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

function isValidDate(obj: unknown) {
	return isDate(obj) && obj.toString() !== 'Invalid Date'
}

export function fDate(date: InputValue, newFormat?: string): string {
	const fm = newFormat || 'dd MMM yyyy'

	return date && isValidDate(new Date(date)) ? moment(date).format(fm) : ''
}

export function fDateTime(date: InputValue, newFormat?: string): string {
	const fm = newFormat || 'dd MMM yyyy p'

	return date && isValidDate(new Date(date)) ? moment(date).format(fm) : ''
}

export function fTimestamp(date: InputValue): string {
	// Return date in full timestamp (in milliseconds)
	return date && isValidDate(new Date(date)) ? moment(date).valueOf().toString() : ''
}

export function fLocalDateTime(date: InputValue): string | Date {
	return date && isValidDate(new Date(date)) ? new Date(date) : ''
}

export function fToNow(date: InputValue): string {
	return date && isValidDate(new Date(date))
		? moment(date).fromNow()
		: ''
}

export function fDateTimeSuffix(date: Date | string | number): string {
	const fm = 'dd/MM/yyyy HH:mm'

	return date && isValidDate(new Date(date)) ? moment(date).format(fm) : ''
}
