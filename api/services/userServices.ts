import { Knex } from 'knex'

export class UserServices {
	constructor(private knex: Knex) {}

    async login(username: string) {
        const userResult = await this.knex('users')
            .select("*")
            .where("username", username)
            
        if (userResult.length === 0) {
            const dietitianResult = await this.knex('dietitian')
                .select("*")
                .where("username", username)
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
}
