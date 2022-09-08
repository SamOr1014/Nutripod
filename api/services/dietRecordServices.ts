import { Knex } from 'knex'

export class DietRecordServices {
    constructor(private knex: Knex) {}

    async get() {
        // please change later
        await this.knex('users_diet').select('*')

    }

}