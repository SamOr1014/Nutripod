import { Knex } from 'knex'

export class MedicalRecordServices {
	constructor(private knex: Knex) {}

	async getUserMedRecByUserID(uid: number | string) {
		const medRec = await this.knex('dietitian_reports')
			.select(
				'dietitian_reports.id as rid',
				'dietitian_reports.booking_id',
				'dietitian_reports.content',
				'dietitian_reports.height',
				'dietitian_reports.weight',
				'dietitian_reports.sys_blood_pressure as bp',
				'dietitian_reports.dia_blood_pressure as dbp',
				'dietitian_reports.blood_glucose as bg',
				'dietitian_reports.follow_up_status',
				'dietitian.id as dietitian_id',
				'booking.date',
				'users.first_name',
				'users.last_name',
				'users.birthday',
				'users.gender',
				'users.hkid',
				'chronic_condition.disease'
			)
			.innerJoin('booking', 'dietitian_reports.booking_id', 'booking.id')
			.innerJoin('users', 'booking.user_id', 'users.id')
			.innerJoin('dietitian', 'booking.dietitian_id', 'dietitian.id')
			.innerJoin(
				'chronic_condition',
				'users.chronic_condition',
				'chronic_condition.id'
			)
			.where('booking.user_id', uid)
			.andWhere('booking.is_deleted', false)
			.orderBy('booking.date', 'desc')

		return medRec
	}

	async postUserMedRecRefCurrentBooking(
		bid: number | string,
		content: string,
		height: number,
		weight: number,
		sys_bp: number,
		dia_bp: number,
		bg: number
	) {
		if (
			(
				await this.knex('dietitian_reports')
					.select('*')
					.where('booking_id', bid)
			).length > 0
		) {
			const result = await this.knex('dietitian_reports')
				.update({
					content: content,
					height: height,
					weight: weight,
					sys_blood_pressure: sys_bp,
					dia_blood_pressure: dia_bp,
					blood_glucose: bg
				})
				.where('booking_id', bid)
				.returning('id')
			return result
		} else {
			let fup_check
			const check = await this.knex('booking')
				.select('follow_up')
				.where('id', bid)
				.andWhere('is_deleted', false)
			fup_check =
				check[0].follow_up === null
					? null
					: check[0].follow_up === true
					? 1
					: 2
			const result = await this.knex('dietitian_reports')
				.insert({
					booking_id: bid,
					content: content,
					height: height,
					weight: weight,
					sys_blood_pressure: sys_bp,
					dia_blood_pressure: dia_bp,
					blood_glucose: bg,
					follow_up_status: fup_check
				})
				.returning('id')
			return result
		}
	}
}
