import { Knex } from 'knex'

export class PostServices {
    constructor(private knex: Knex) {}

    async get() {
        // please change later
        await this.knex('posts').select('*')

    }

}