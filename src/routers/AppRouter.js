import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import NotFoundPage from '../components/NotFoundPage';
import HelpPage from '../components/HelpPage';
import AddPage from '../components/AddPage';
import EditPage from '../components/EditPage';
import DashboardPage from '../components/DashboardPage'
import Login from '../components/LoginPage';
import PrivateRoute from './PrivateRoute'

export const history = createBrowserHistory()

const AppRouters = () => (
	<Router history={history}>
		<div>
			<Switch>
				<Route path="/" component={Login} exact={true} />
				<PrivateRoute path="/dashboard" component={DashboardPage} />
				<PrivateRoute path="/create" component={AddPage} />
				<PrivateRoute path="/edit/:id" component={EditPage} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
)

export default AppRouters;