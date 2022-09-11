import { Knex } from 'knex'

export class PostServices {
	constructor(private knex: Knex) {}

	async get() {
		const result = await this.knex('posts').select('*')
		return result
	}
}
