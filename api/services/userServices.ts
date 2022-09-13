import { Knex } from 'knex'

export class UserServices {
	constructor(private knex: Knex) {}

	async login(username: string, password: string) {
		const result = await this.knex('users')
			.select('users.id', 'users.username')
			.where('username', username)
			.andWhere('password', password)
		return result
	}

	async getAllDietitian() {
		const dietitians = await this.knex('dietitian')
			.select('id', 'first_name', 'last_name')
			.where('is_deleted', false)
		return dietitians
	}
}
