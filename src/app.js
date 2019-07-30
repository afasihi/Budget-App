import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouters from './routers/AppRouter';
import configStore from './stores/configStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses'
// import 'react-dates/initialize'
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css'

const store = configStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 4500, createdAt: 2000 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 5000, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 1500, createdAt: 3000 }));


const state = store.getState()
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
// console.log(visibleExpenses);

const jsx = (
	<Provider store={store}>
		<AppRouters />
	</Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));