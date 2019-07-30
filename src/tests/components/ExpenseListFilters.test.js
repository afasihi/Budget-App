import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { DateRangePicker } from 'react-dates'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'

let setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn(),
		sortByDate = jest.fn(),
		sortByAmount = jest.fn(),
		setStartDate = jest.fn(),
		setEndDate = jest.fn()
	wrapper = shallow(
		<ExpenseListFilters
			setEndDate={setEndDate}
			setStartDate={setStartDate}
			setTextFilter={setTextFilter}
			sortByAmount={sortByAmount}
			sortByDate={sortByDate}
			filters={filters}
		/>)
})

test('should render ExpenseListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with alt data correctly', () => {
	wrapper.setProps({
		filters: altFilters
	})
	expect(wrapper).toMatchSnapshot()
})

test('Should handle text change', () => {
	const value = 'rent'
	wrapper.find('input').simulate('change', {
		target: { value }
	})
	expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('Should handle date change', () => {
	const startDate = moment(0)
	const endDate = moment(0).add(8, 'year')
	wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate })
	expect(setStartDate).toHaveBeenLastCalledWith(startDate)
	expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('Should sort by date', () => {
	const value = 'date'
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByDate).toHaveBeenCalled()
})

test('Should sort by amount', () => {
	const value = 'amount'
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date focus changes', () => {
	const calendarFocused = 'endDate'
	wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})