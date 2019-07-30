import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy
})
const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy
})

const ResetCount = () => ({
	type: 'RESET',
	count: 0
})

const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'RESET':
			return {
				count: action.count
			}
		default:
			return state;
	}
}
const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
})
store.dispatch(incrementCount({ incrementBy: 3 }))
store.dispatch(ResetCount())
store.dispatch(decrementCount({ decrementBy: 5 }))