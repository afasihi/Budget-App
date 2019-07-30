import moment from 'moment'

const filters = {
	text: '',
	sortBy: 'date',
	starDate: undefined,
	endDate: undefined,
}

const altFilters = {
	text: 'bill',
	sortBy: 'amount',
	starDate: moment(0),
	endDate: moment(0).add(3, 'years')
}

export { filters, altFilters }