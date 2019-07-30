import React from 'react'
import { shallow } from 'enzyme';
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctely', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
	expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot()
	wrapper.find('form').simulate('submit', {
		preventDefault: () => { }
	})
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot()
})

test('should render description on form change', () => {
	const value = "new description"
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('description')).toBe(value);
});

test('should render note on form change', () => {
	const value = "new note"
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('textarea').simulate('change', {
		target: { value }
	})
	expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
	const value = "23.50"
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
	const value = "23.553"
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('amount')).not.toBe(value);
});

test('should call on Submit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
	wrapper.find('form').simulate('submit', {
		preventDefault: () => { }
	})
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	})
})

test('should set new date on date change', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
	expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set new date on date change', () => {
	const focused = true
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })

	expect(wrapper.state('calendarFocused')).toBe(true)
})