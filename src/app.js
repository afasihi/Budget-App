import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouters, { history } from './routers/AppRouter';
import configStore from './stores/configStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth'
import LoadingPage from './components/LoadingPage'
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'

const store = configStore();
const jsx = (
	<Provider store={store}>
		<AppRouters />
	</Provider>
)
let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'))
		hasRendered = true;
	}
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid))
		store.dispatch(startSetExpenses()).then(() => {
			renderApp()
			if (history.location.pathname === '/') {
				history.push('/dashboard')
			}
		});
	} else {
		store.dispatch(logout())
		renderApp()
		history.push('/')
	}
})