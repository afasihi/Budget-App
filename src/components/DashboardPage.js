import React from 'react';
import ExpensesList from './ExpensesList';
import ExpenseListFilters from './ExpenseListFilters'
import ExpensesSummery from './ExpensesSummery'

const DashboardPage = () => (
	<div>
		<ExpensesSummery />
		<ExpenseListFilters />
		<ExpensesList />
	</div>
)

export default DashboardPage;