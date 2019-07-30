import React from 'react';
import ExpensesList from './ExpensesList';
import ExpenseListFilters from './ExpenseListFilters'


const DashboardPage = () => (
	<div>
		<ExpenseListFilters />
		<ExpensesList />
	</div>
)

export default DashboardPage;