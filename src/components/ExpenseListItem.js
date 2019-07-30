import React from 'react';
import { NavLink } from 'react-router-dom'

const ExpenseListItem = ({ description, amount, createdAt, id}) => (
	<div>
		<NavLink to={`/edit/${id}`}>
			<h3>{description}</h3>
		</NavLink>
		<p> amount is {amount} created at {createdAt}</p>
		
	</div>
)

export default ExpenseListItem