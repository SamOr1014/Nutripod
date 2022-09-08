import { Knex } from 'knex'

export class BookingServices {
    constructor(private knex: Knex) {}

    async get() {
        // please change later
        await this.knex('booking').select('*')

    }

}