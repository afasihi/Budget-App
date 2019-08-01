import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummery } from '../../components/ExpensesSummery'

test('should render ExpensesSummery correctly with 1 expense', () => {
	const wrapper = shallow(<ExpensesSummery expensesCount={1} expensesTotal={235}/>)
	expect(wrapper).toMatchSnapshot()
})
test('should render ExpensesSummery correctly with multiple expenses', () => {
	const wrapper = shallow(<ExpensesSummery expensesCount={54} expensesTotal={232235}/>)
	expect(wrapper).toMatchSnapshot()
})