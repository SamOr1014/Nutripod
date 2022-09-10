import { Knex } from 'knex'

export class BookingServices {
    constructor(private knex: Knex) {}

    async get() {
        const result = await this.knex('booking').select('*')
        return result

    }

}