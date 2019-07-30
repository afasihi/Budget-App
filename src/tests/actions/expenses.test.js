import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('Should setup remove expense action object', () => {
	const action = removeExpense({ id: '123456' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123456'
	})
})
test('Should setup edit expense action object', () => {
	const action = editExpense('123456', { note: 'new' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123456',
		updates: {
			note: "new"
		}
	})
})
test('Should setup add expense action object', () => {
	const expenseData = {
		description: 'Rent',
		amount: 500,
		createdAt: 1100,
		note: 'this is nlat month rent'
	}
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	})
})
test('Should setup add expense action object', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			description: '',
			note: '',
			amount: 0,
			createdAt: 0,
			id: expect.any(String)
		}
	})
})

