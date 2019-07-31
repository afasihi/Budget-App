import React from 'react';
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral'

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
	<div>
		<NavLink to={`/edit/${id}`}>
			<h3>{description}</h3>
		</NavLink>
		<p>
			{numeral(amount / 100).format('$0,0.00')} 
			- 
			{moment(createdAt).format('MMMM Do, YYYY')}</p>

	</div>
)

export default ExpenseListItem