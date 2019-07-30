import moment from 'moment'
import { setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter } from '../../actions/filters'

test('Should generate set start date action object', () => {
	const action = setStartDate(moment(0));
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(0)
	})
})
test('Should generate set end date action object', () => {
	const action = setEndDate(moment(1000));
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(1000)
	})
})
test('Should generate sort by amount action object', () => {
	const action = sortByAmount();
	expect(action).toEqual({
		type: 'SORT_AMOUNT',
		sortBy: 'amount'
	})
})
test('Should generate sort by date action object', () => {
	const action = sortByDate();
	expect(action).toEqual({
		type: 'SORT_DATE',
		sortBy: 'date'
	})
})
test('Should generate set text filter action object with value', () => {
	const action = setTextFilter('kera');
	expect(action).toEqual({
		type: 'TEXT_FILTER',
		text: 'kera'
	})
})
test('Should generate set text filter action object with default', () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: 'TEXT_FILTER',
		text: ''
	})
})