export interface UserPlusIndividualBooking {
	id: number
	date: string
	time: number
	is_attended: boolean | null
	follow_up: boolean | null
	previous_booking_id: number | null
	user_id: number
	dietitian_id: number
	first_name: string
	last_name: string
	email: string
	birthday: string
	height: number
	weight: number
	gender: number
	phone: string
	hkid: string
	chronic_condition: number
	disease: string
}
