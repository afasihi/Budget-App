import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

const AddExpense = (
	{
		description = '',
		note = '',
		amount = 0,
		createdAt = 0
	} = {}
) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
})

const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates
})

const setTextFilter = (text = '') => ({
	type: 'TEXT_FILTER',
	text

})

const sortByAmount = () => ({
	type: 'SORT_AMOUNT',
	sortBy: 'amount'
})
const sortByDate = () => ({
	type: 'SORT_DATE',
	sortBy: 'date'
})
const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
})
const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
})

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			]
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id)
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					}
				} else {
					return expense
				}
			})
		default:
			return state;
	}
}
const filterReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
	switch (action.type) {
		case 'TEXT_FILTER':
			return {
				...state,
				text: action.text
			}
		case 'SORT_AMOUNT':
			return {
				...state,
				sortBy: action.sortBy
			}
		case 'SORT_DATE':
			return {
				...state,
				sortBy: action.sortBy
			}
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			}
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			}
		default:
			return state;
	}
}

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filter: filterReducer
	})
)

const getVisibleExpenses = (expenses, {sortBy, endDate, startDate, text}) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const testMatch = expense.description.toLowerCase().includes(text.toLowerCase())

		return startDateMatch && endDateMatch && testMatch
	}).sort((a, b) =>{
		if (sortBy === 'date')
			return a.createdAt <= b.createStore ? 1 : -1
		else if (sortBy === 'amount')
			return a.amount <= b.amount ? 1 : -1
	})
}

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filter)
	console.log(visibleExpenses)
})

const expenseOne = store.dispatch(AddExpense({
	description: 'Rent',
	amount: 100,
	createdAt: 10000
}))
const expenseTwo = store.dispatch(AddExpense({
	description: 'coffee',
	amount: 100,
	createdAt: -2530
}))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('Rent'));

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(125))
// store.dispatch(setEndDate(1250))




const demoStore = {
	expenses: [{
		id: 'ghdsjhghgdss',
		description: 'January Rent',
		note: 'This was the final payment for that adress',
		amount: 54500, // cent
		createdAt: 0
	}],
	filter: {
		text: 'rent',
		sortBy: 'amount', //date or amount
		startDate: undefined,
		endDate: undefined
	}
}