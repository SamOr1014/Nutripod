import { Knex } from 'knex'

export class PostServices {
	constructor(private knex: Knex) {}

	async getAllPost() {
		const result = await this.knex('posts')
			.select(
				'posts.id',
				'posts.content',
				'posts.title',
				'posts.date',
				'posts.author_id',
				'dietitian.first_name',
				'dietitian.last_name'
			)
			.where('posts.is_deleted', false)
			.innerJoin('dietitian', 'posts.author_id', 'dietitian.id')
			.orderBy('date', 'desc')
		return result
	}

	async getPostByID(pid: number | string) {
		const result = await this.knex('posts')
			.select(
				'posts.id',
				'posts.content',
				'posts.title',
				'posts.date',
				'dietitian.first_name',
				'dietitian.last_name'
			)
			.where('posts.id', pid)
			.andWhere('posts.is_deleted', false)
			.innerJoin('dietitian', 'posts.author_id', 'dietitian.id')
		return result
	}

	async deletePostByID(pid: number | string) {
		const result = await this.knex('posts')
			.update({ is_deleted: true })
			.where('id', pid)
			.returning('id')
		return result
	}
}
