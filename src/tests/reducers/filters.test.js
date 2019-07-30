import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should filter default value', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('Should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_AMOUNT' })
	expect(state.sortBy).toBe('amount')
})

test('Should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const action = { type: 'SORT_DATE' }
	const state = filtersReducer(currentState, action)
	expect(state.sortBy).toBe('date')
})

test('Should set start date filter', () => {
	const action = {
		type: 'SET_START_DATE',
		startDate: moment(0).add(2, 'days')
	}
	const state = filtersReducer(undefined, action)
	expect(state.startDate).toEqual(moment(0).add(2, 'days'))
})

test('Should set End date filter', () => {
	const action = {
		type: 'SET_END_DATE',
		endDate: moment(0).add(4, 'days')
	}
	const state = filtersReducer(undefined, action)
	expect(state.endDate).toEqual(moment(0).add(4, 'days'))
})
test('Should set text filter', () => {
	const action = {
		type: 'TEXT_FILTER',
		text: "let"
	}
	const state = filtersReducer(undefined, action)
	expect(state.text).toBe("let")
})