import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('Should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual([])
})

test('Should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should not remove expense if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses)
})

test('Should add an expense', () => {
	const action = {
		type: 'ADD_EXPENSE',
		expense : {
			id: '4',
			description: 'Laptop',
			note: '',
			amount: 65200,
			createdAt: 326548,
		}
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses,action.expense])
})
test('Should edit an expense', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[2].id,
		updates: {
			description: "Master card"
		}
	}
	const state = expensesReducer(expenses, action);
	expect(state[2].description).toBe(action.updates.description)
})
test('Should not edit expense if expense not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			description: "Master card"
		}
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses)
})

test('should set expenses ', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[1]]
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[1]])
})