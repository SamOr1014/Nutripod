import { Knex } from 'knex'

export class MedicalRecordServices {
    constructor(private knex: Knex) {}

    async get() {
        // please change later
        await this.knex('dietitian_report').select('*')

    }

}