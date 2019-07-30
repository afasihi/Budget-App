import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import HelpPage from '../components/HelpPage';
import AddPage from '../components/AddPage';
import EditPage from '../components/EditPage';
import DashboardPage from '../components/DashboardPage'

const AppRouters = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route path="/" component={DashboardPage} exact={true} />
				<Route path="/create" component={AddPage} />
				<Route path="/edit/:id" component={EditPage} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
)

export default AppRouters;