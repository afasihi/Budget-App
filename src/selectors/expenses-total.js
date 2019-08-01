export default (expenses) => {
		const total = expenses.map((expense) => expense.amount)
		return total.reduce((a, b) => a + b, 0);
}
