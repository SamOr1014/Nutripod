import { Knex } from 'knex'

export class MedicalRecordServices {
    constructor(private knex: Knex) {}

    async get() {
        const result = await this.knex('user_blood_glucose').select('*')
        return result

    }

}