import { Knex } from 'knex'

export class UserServices {
    constructor(private knex: Knex) { }

    async login(username: string, password: string) {
        const result = await this.knex('users').select("users.id","users.username").where("username", username).andWhere("password", password)
        return result

    }

}