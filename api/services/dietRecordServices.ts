import { Knex } from 'knex'

export class DietRecordServices {
    constructor(private knex: Knex) {}

    async get() {
        const result = await this.knex('users_diets').select('*')
        return result

    }

}