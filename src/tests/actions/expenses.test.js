import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	startAddExpense,
	addExpense,
	removeExpense,
	editExpense,
	setExpenses,
	startSetExpenses,
	startRemoveExpense,
	startEditExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase'

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({ id, description, amount, createdAt, note }) => {
		expensesData[id] = { description, amount, createdAt, note }
	})
	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
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
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
		done();
	})
});

test('should add expense with default to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
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
test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState)
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done();
	})
})

test('should remove the expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState)
	const id = expenses[2].id
	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done()
	})
})
test('should edit the expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState)
	const updates = { note: 'update from jest' }
	const id = expenses[2].id
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val().note).toEqual(updates.note);
		done()
	})
})