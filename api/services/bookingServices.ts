import { Knex } from 'knex'

export class BookingServices {
	constructor(private knex: Knex) {}

	async getTimeslot() {
		const timeSlot = await this.knex('timeslot').select('*')
		return timeSlot
	}

	async getAllUserBooking(userID: number | string) {
		const result = await this.knex('booking')
			.select(
				'booking.id',
				'booking.date',
				'timeslot.time',
				'dietitian.first_name',
				'dietitian.last_name'
			)
			.innerJoin('timeslot', 'booking.time', 'timeslot.id')
			.innerJoin('users', 'booking.user_id', 'users.id')
			.innerJoin('dietitian', 'booking.dietitian_id', 'dietitian.id')
			.where('booking.user_id', userID)
			.andWhere('booking.is_deleted', 'false')
			.andWhere('booking.date', '>=', 'NOW()')
			.orderBy('booking.date', 'asc')
		return result
	}
	async postUserBooking(
		userID: number | string,
		dietitianID: number | string,
		date: string,
		timeslotID: number | string
	) {
		const result = await this.knex('booking')
			.insert([
				{
					date: date,
					time: timeslotID,
					user_id: userID,
					dietitian_id: dietitianID
				}
			])
			.returning('id')
		return result
	}

	async deleteUserBooking(
		bookingID: number | string,
		userID: number | string
	) {
		const result = await this.knex('booking')
			.update({ is_deleted: true })
			.where('id', bookingID)
			.andWhere('user_id', userID)
			.returning('*')
		return result
	}

	async getAllBookingByDateAndDietitianID(
		date: string,
		dietitianID: string | number
	) {
		const bookingByDate = await this.knex('booking')
			.select('*')
			.where('date', date)
			.andWhere('is_deleted', false)
			.andWhere('dietitian_id', dietitianID)
		return bookingByDate
	}
}
