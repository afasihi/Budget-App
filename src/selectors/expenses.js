import moment from 'moment'

export default (expenses, { sortBy, endDate, startDate, text }) => {
	return expenses.filter((expense) => {
		const createdAtMoment = moment(expense.createdAt)
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
		const testMatch = expense.description.toLowerCase().includes(text.toLowerCase())

		return startDateMatch && endDateMatch && testMatch
	}).sort((a, b) => {
		if (sortBy === 'date')
			return a.createdAt < b.createdAt ? 1 : -1
		else if (sortBy === 'amount')
			return a.amount < b.amount ? 1 : -1
	})
}