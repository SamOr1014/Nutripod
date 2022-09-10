import { Knex } from 'knex'

export class UserServices {
    constructor(private knex: Knex) {}

    async login() {
        const result = await this.knex('users').select('*')
        return result

    }

}