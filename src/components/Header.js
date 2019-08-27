import React from 'react';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth'
import { connect } from 'react-redux'

export const Header = ({startLogout}) => (
	<header>
		<h1>Expensify</h1>
		<NavLink to="/" activeClassName="is-active" exact={true}>Home page</NavLink>
		<NavLink to="/create" activeClassName="is-active" >Create page</NavLink>
		<button onClick={startLogout}>Logout</button>
	</header>
)

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)