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

const jsx = (
	<Provider store={store}>
		<AppRouters />
	</Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));