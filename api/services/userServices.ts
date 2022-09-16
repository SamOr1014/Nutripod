import { Knex } from 'knex'

export class UserServices {
	constructor(private knex: Knex) { }

	async checkToken(id: number, username: string) {

		const userResult = await this.knex('users')
			.select("*").where("id", id).andWhere('username', username).andWhere("is_deleted", false)

		if (userResult.length === 0) {
			const dietitianResult = await this.knex('dietitian')
			.select('*').where("id", id).andWhere('username', username).andWhere("is_deleted", false)

			return dietitianResult
		}

		return userResult
	}

	async login(username: string) {
		const userResult = await this.knex('users')
			.select('*').where('username', username).andWhere("is_deleted", false)

		if (userResult.length === 0) {
			const dietitianResult = await this.knex('dietitian')
				.select('*').where('username', username).andWhere("is_deleted", false)
			return dietitianResult
		}
		return userResult
	}

	async getAllDietitian() {
		const dietitians = await this.knex('dietitian')
			.select('id', 'first_name', 'last_name')
			.where('is_deleted', false)
		return dietitians
	}

	async getUserBYHKID(hkid: string) {
		const user = await this.knex('users')
			.select(
				'id',
				'first_name',
				'last_name',
				'birthday',
				'height',
				'weight',
				'gender',
				'phone',
				'hkid'
			)
			.where('hkid', hkid)
			.andWhere('is_deleted', false)
		return user
	}
}
