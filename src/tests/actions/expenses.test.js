import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddExpense, addExpense, removeExpense, editExpense, setExpenses } from '../../actions/expenses'
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({ id, description, amount, createdAt, note }) => {
		expensesData[id] = { description, amount, createdAt, note }
	})
	database.ref('expenses').set(expensesData).then(() => done())
});

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
	const action = addExpense(expenses[1]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[1]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'headphone',
		amount: 500,
		note: "bluetooth headphone",
		createdAt: 23000
	};
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
		done();
	})
});

test('should add expense with default to database and store', (done) => {
	const store = createMockStore({});
	// const expenseData = {
	// 	description: 'headphone',
	// 	amount: 500,
	// 	note: "bluetooth headphone",
	// 	createdAt: 23000
	// };
	store.dispatch(startAddExpense()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				description: '',
				note: '',
				amount: 0,
				createdAt: 0
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual({
			description: '',
			note: '',
			amount: 0,
			createdAt: 0
		})
		done();
	})
});

test('should setup set expenses  action object with data', () => {
	const action = setExpenses(expenses)
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
});