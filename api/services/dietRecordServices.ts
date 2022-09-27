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

	async postWeight(
		weight: number | string,
		date: string,
		userID: string | number
	) {
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
		bg: number | string,
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

	async getExerciseByID(uid: string | number, date: string) {
		const result = await this.knex('users_exercises')
			.select(
				'users_exercises.id',
				'users_exercises.duration',
				'exercises_types.ex_type',
				'exercises_types.ex_calories'
			)
			.where('user_id', uid)
			.andWhere('date', date)
			.andWhere('is_deleted', false)
			.innerJoin(
				'exercises_types',
				'exercises_types.id',
				'users_exercises.exercise'
			)
		return result
	}

	async getMonthlyExercisesByID(
		uid: string | number,
		startDate: string,
		endDate: string
	) {
		const result = await this.knex('users_exercises')
			.select(
				'users_exercises.id',
				'users_exercises.duration',
				'exercises_types.ex_type',
				'exercises_types.ex_calories'
			)
			.where('user_id', uid)
			.andWhere('date', '>=', startDate)
			.andWhere('date', '<=', endDate)
			.andWhere('is_deleted', false)
			.innerJoin(
				'exercises_types',
				'users_exercises.exercise',
				'exercises_types.id'
			)
		return result
	}

	async getFoodIntakeByID(uid: string | number, date: string) {
		const result = await this.knex('users_diets')
			.select(
				'users_diets.id',
				'users_diets.food_amount',
				'diets_types.d_type',
				'food.food_name',
				'food.food_calories',
				'food.carbohydrates',
				'food.sugars',
				'food.fat',
				'food.protein',
				'food.fiber',
				'food.sodium',
				'food_groups.food_group'
			)
			.where('user_id', uid)
			.andWhere('date', date)
			.innerJoin('food', 'food.id', 'users_diets.food')
			.innerJoin('diets_types', 'diets_types.id', 'users_diets.diet_type')
			.innerJoin('food_groups', 'food_groups.id', 'food.group_id')

		return result
	}

	async getFoodMonthlyIntakeByID(
		uid: string | number,
		startDate: string,
		endDate: string
	) {
		const result = await this.knex('users_diets')
			.select(
				'users_diets.id',
				'users_diets.food_amount',
				'diets_types.d_type',
				'food.food_name',
				'food.food_calories',
				'food.carbohydrates',
				'food.sugars',
				'food.fat',
				'food.protein',
				'food.fiber',
				'food.sodium',
				'food_groups.food_group'
			)
			.where('user_id', uid)
			.andWhere('date', '>=', startDate)
			.andWhere('date', '<=', endDate)
			.innerJoin('food', 'food.id', 'users_diets.food')
			.innerJoin('diets_types', 'diets_types.id', 'users_diets.diet_type')
			.innerJoin('food_groups', 'food_groups.id', 'food.group_id')

		return result
	}

	async addExercise(
		uid: string | number,
		date: string,
		exercise: string,
		duration: number
	) {
		const exerciseID = await this.knex('exercises_types')
			.select('id')
			.where('ex_type', exercise)
			.returning('id')

		const result = await this.knex('users_exercises')

			.insert({
				date: date,
				exercise: exerciseID[0].id,
				duration: duration,
				user_id: uid
			})
			.returning('id')

		return result
	}

	async search(searchFood: string) {
		const result = await this.knex('food')
			.select('food_name')
			.whereLike('food_name', `%${searchFood}%`)

		return result
	}

	async postFood(
		uid: string | number,
		food: string,
		date: string,
		amount: number,
		diet_type: string
	) {
		const dietTypeID = await this.knex('diets_types')
			.select('id')
			.where('d_type', diet_type)
			.returning('id')

		const foodID = await this.knex('food')
			.select('id')
			.where('food_name', food)
			.returning('id')

		const result = await this.knex('users_diets')
			.insert({
				diet_type: dietTypeID[0].id,
				food: foodID[0].id,
				food_amount: amount,
				date: date,
				user_id: uid
			})
			.returning('id')

		return result
	}
}
