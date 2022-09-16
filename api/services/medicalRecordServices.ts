import { Knex } from 'knex'

export class MedicalRecordServices {
	constructor(private knex: Knex) {}

	async getUserMedRecByUserID(uid: number | string) {
		const medRec = await this.knex('dietitian_reports')
			.select(
				'dietitian_reports.id as rid',
				'dietitian_reports.date',
				'dietitian_reports.content',
				'dietitian_reports.height',
				'dietitian_reports.weight',
				'dietitian_reports.blood_pressure as bp',
				'dietitian_reports.blood_glucose as bg',
				'dietitian_reports.follow_up',
				'dietitian_reports.user_id as uid',
				'dietitian_id',
				'users.first_name',
				'users.last_name',
				'users.birthday',
				'users.gender',
				'users.hkid',
				'chronic_condition.disease'
			)
			.where('user_id', uid)
			.andWhere('is_deleted', false)
			.innerJoin('users', 'dietitian_reports.user_id', 'users.id')
			.innerJoin(
				'chronic_condition',
				'users.chronic_condition',
				'chronic_condition.id'
			)
		return medRec
	}
}
