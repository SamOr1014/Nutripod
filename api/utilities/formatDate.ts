export function formatDate(dateString: string) {
	let date = new Date(dateString)
	let formattedDate =
		date.getFullYear().toString() +
		'-' +
		(date.getMonth() + 1).toString() +
		'-' +
		date.getDate().toString()
	return formattedDate
}

export function formatToMonthStartAndEnd(date: Date) {
	let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
	let mm2 = String(date.getMonth() + 2).padStart(2, '0') //January is 0!
	let yyyy = date.getFullYear()

	let start = yyyy + '-' + mm + '-' + '01'
	let end = yyyy + '-' + mm2 + '-' + '01'
	return { start, end }
}
