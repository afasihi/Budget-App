export const setTextFilter = (text = '') => ({
	type: 'TEXT_FILTER',
	text
})

export const sortByAmount = () => ({
	type: 'SORT_AMOUNT',
	sortBy: 'amount'
})

export const sortByDate = () => ({
	type: 'SORT_DATE',
	sortBy: 'date'
})

export const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
})

export const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
})