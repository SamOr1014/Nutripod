import { Knex } from 'knex'
import { UserPlusIndividualBooking } from '../utilities/modal'

export class BookingServices {
	constructor(private knex: Knex) {}

	async checkIfSameDayHasBooking(uid: number, date: string) {
		const result = await this.knex('booking')
			.select('*')
			.where('user_id', uid)
			.andWhere('date', date)
			.andWhere('is_deleted', false)
		return result
	}

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
		const bookingByDate = await this.knex<UserPlusIndividualBooking>(
			'booking'
		)
			.select(
				'booking.id as bid',
				'date',
				'time',
				'is_attended',
				'follow_up',
				'previous_booking_id',
				'user_id',
				'dietitian_id',
				'first_name',
				'last_name',
				'email',
				'birthday',
				'height',
				'weight',
				'gender',
				'phone',
				'hkid',
				'chronic_condition',
				'disease'
			)
			.where('date', date)
			.andWhere('booking.is_deleted', false)
			.andWhere('dietitian_id', dietitianID)
			.innerJoin('users', 'booking.user_id', 'users.id')
			.innerJoin(
				'chronic_condition',
				'users.chronic_condition',
				'chronic_condition.id'
			)
		return bookingByDate
	}

	async getFollowUpBooking(bid: number | string) {
		const followUp = await this.knex('booking')
			.select('*')
			.where('previous_booking_id', bid)
			.andWhere('is_deleted', false)
		return followUp
	}

	async postFollowUpBooking(
		timeid: number | string,
		dateString: string,
		currentBooking: number | string,
		uid: number | string,
		dietitian_id: number | string
	) {
		await this.knex('booking')
			.update({ follow_up: 'true' })
			.where('id', currentBooking)
			.andWhere('is_deleted', false)
		const result = await this.knex('booking')
			.insert([
				{
					date: dateString,
					time: timeid,
					user_id: uid,
					dietitian_id: dietitian_id,
					previous_booking_id: currentBooking
				}
			])
			.returning('id')
		return result
	}

	async attendance(bool: string, bid: string | number) {
		await this.knex('booking')
			.update({ is_attended: bool })
			.where('id', bid)
			.andWhere('is_deleted', false)
	}

	async dismiss(bid: string | number) {
		await this.knex('booking')
			.update({ follow_up: 'false' })
			.where('id', bid)
			.andWhere('is_deleted', false)
	}
}
