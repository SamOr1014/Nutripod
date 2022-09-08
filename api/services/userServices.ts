import { Knex } from 'knex'

export class UserServices {
    constructor(private knex: Knex) {}

    async login() {
        // please change later
        await this.knex('users').select('*')

    }

}