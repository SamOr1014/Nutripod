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
