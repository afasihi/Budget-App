import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseList } from '../../components/ExpensesList'
import expenses from '../fixtures/expenses'

test('should render ExoenseList with expenses', () => {
	const wrapper = shallow(<ExpenseList expenses={expenses} />)
	expect(wrapper).toMatchSnapshot()
})
test('should render ExoenseList with empty message', () => {
	const wrapper = shallow(<ExpenseList expenses={[]} />)
	expect(wrapper).toMatchSnapshot()
})