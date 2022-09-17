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

export function formatLastDate(dateString: string) {
	const date = new Date(dateString)
	date.setDate(date.getDate() - 1)
	const formattedDate =
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
	let startYear = date.getFullYear()
	let endYear = date.getFullYear()


	if (parseInt(mm2) > 12) {
		endYear += 1
		mm2 = "01"
	}

	let start = startYear + '-' + mm + '-' + '01'
	let end = endYear + '-' + mm2 + '-' + '01'
	return { start, end }
}

export function formatToLastMonthStartAndEnd(date: Date) {
	let mm = String(date.getMonth() ).padStart(2, '0') 
	let mm2 = String(date.getMonth() + 1).padStart(2, '0') 
	let startYear = date.getFullYear()
	let endYear = date.getFullYear()

	if (parseInt(mm) < 1) {
		startYear-= 1
		mm = "12"
	}

	let start = startYear + '-' + mm + '-' + '01'
	let end = endYear + '-' + mm2 + '-' + '01'
	return { start, end }
}

export function daysInMonth (date:Date) {
	return new Date(date).getDate()
}
