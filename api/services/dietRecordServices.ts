import { Knex } from 'knex'

export class DietRecordServices {
	constructor(private knex: Knex) {}
	//##############Weight BP BG Record Services#############################
	async getWeightByUserID(userID: number | string) {
		const result = await this.knex('users_weight')
			.select('id', 'date', 'weight')
			.where('user_id', userID)
			.andWhere('is_deleted', false)
			.orderBy('date', 'desc')
		return result
	}

	async postWeight(weight: number, date: string, userID: string | number) {
		const result = await this.knex('users_weight')
			.insert({
				weight: weight,
				date: date,
				user_id: userID
			})
			.returning('id')
		return result
	}

	async deleteWeightRecord(rid: number | string) {
		const result = await this.knex('users_weight')
			.update({
				is_deleted: true
			})
			.where('id', rid)
			.returning('id')
		return result
	}

	async getBPByUserID(userID: number | string) {
		const result = await this.knex('users_blood_pressure')
			.select('id', 'date', 'sys_bp', 'dia_bp', 'time')
			.where('user_id', userID)
			.andWhere('is_deleted', false)
			.orderBy('date', 'desc')
		return result
	}

	async postBP(
		sys_bp: number,
		dia_bp: number,
		date: string,
		time: string,
		userID: string | number
	) {
		const result = await this.knex('users_blood_pressure')
			.insert({
				sys_bp: sys_bp,
				dia_bp: dia_bp,
				date: date,
				time: time,
				user_id: userID
			})
			.returning('id')
		return result
	}

	async deleteBPRecord(rid: number | string) {
		const result = await this.knex('users_blood_pressure')
			.update({
				is_deleted: true
			})
			.where('id', rid)
			.returning('id')
		return result
	}

	async getBGByUserID(userID: number | string) {
		const result = await this.knex('users_blood_glucose')
			.select('id', 'date', 'bg_measurement', 'time')
			.where('user_id', userID)
			.andWhere('is_deleted', false)
			.orderBy('date', 'desc')
		return result
	}

	async postBG(
		bg: number,
		date: string,
		time: string,
		userID: string | number
	) {
		const result = await this.knex('users_blood_glucose')
			.insert({
				bg_measurement: bg,
				date: date,
				time: time,
				user_id: userID
			})
			.returning('id')
		return result
	}

	async deleteBGRecord(rid: number | string) {
		const result = await this.knex('users_blood_glucose')
			.update({
				is_deleted: true
			})
			.where('id', rid)
			.returning('id')
		return result
	}

	//##################Exercise Services###############################

	async getExerciseByID(uid: string | number, date: string) {
		const result = await this.knex('users_exercises')
			.select('*')
			.where('user_id', uid)
			.andWhere('date', date)
			.andWhere('is_deleted', false)
			.innerJoin(
				'exercises_types',
				'users_exercises.exercise',
				'exercises_types.id'
			)
		return result
	}
}
