import { Knex } from 'knex'

export class UserServices {
	constructor(private knex: Knex) { }

	async register(
		firstName: string,
		lastName: string,
		username: string,
		password: string ,
		email: string,
		birthday: Date,
		height: number,
		weight: number,
		phone: string,
		address: string,
		hkid: string,
		gender: number,
		profession: number,
		chronic_condition: number,
		education: number) {

		const result = await this.knex('users').insert({
			username: username,
			first_name: firstName,
			last_name: lastName,
			email: email,
			password:password,
			birthday: birthday,
			height: height,
			weight: weight,
			phone: phone,
			address: address,
			hkid: hkid,
			gender: gender,
			profession: profession,
			chronic_condition: chronic_condition,
			education: education
		}).returning("id")

		return result
	}

	async checkIfExist(username:string, email:string,phone:string,hkid:string) {

		const result = await this.knex('users').select('*')
		.where('username' ,username)
		.orWhere('email' , email)
		.orWhere('phone',phone)
		.orWhere('hkid',hkid)

		return result

	}

	async checkToken(id: number, username: string) {
		const userResult = await this.knex('users')
			.select('*')
			.where('id', id)
			.andWhere('username', username)
			.andWhere('is_deleted', false)

		if (userResult.length === 0) {
			const dietitianResult = await this.knex('dietitian')
				.select('*')
				.where('id', id)
				.andWhere('username', username)
				.andWhere('is_deleted', false)

			return dietitianResult
		}

		return userResult
	}

	async checkUserToken(id: number, username: string) {
		const userResult = await this.knex('users')
			.select('*')
			.where('id', id)
			.andWhere('username', username)
			.andWhere('is_deleted', false)

		return userResult
	}

	async checkDietitianToken(id: number, username: string) {

		const dietitianResult = await this.knex('dietitian')
			.select('*')
			.where('id', id)
			.andWhere('username', username)
			.andWhere('is_deleted', false)

		return dietitianResult

	}

	async login(username: string) {
		const userResult = await this.knex('users')
			.select('*')
			.where('username', username)
			.andWhere('is_deleted', false)

		if (userResult.length === 0) {
			const dietitianResult = await this.knex('dietitian')
				.select('*')
				.where('username', username)
				.andWhere('is_deleted', false)
			return dietitianResult
		}
		return userResult
	}

	async getAllDietitian() {
		const dietitians = await this.knex('dietitian')
			.select('id', 'first_name', 'last_name')
			.where('is_deleted', false)
		return dietitians
	}

	async getUserBYHKID(hkid: string) {
		const user = await this.knex('users')
			.select(
				'id',
				'first_name',
				'last_name',
				'birthday',
				'height',
				'weight',
				'gender',
				'phone',
				'hkid'
			)
			.where('hkid', hkid)
			.andWhere('is_deleted', false)
		return user
	}

	async changeUsername(id: string | number, username: string) {
		const result = await this.knex('users')
			.update('username', username)
			.where('id', id)
			.returning('id')

		return result
	}

	async changePhone(id: string | number, phone: string) {
		const result = await this.knex('users')
			.update('phone', phone)
			.where('id', id)
			.returning('id')

		return result
	}

	async changeAddress(id: string | number, address: string) {
		const result = await this.knex('users')
			.update('address', address)
			.where('id', id)
			.returning('id')

		return result
	}

	async changeEmail(id: string | number, email: string) {
		const result = await this.knex('users')
			.update('email', email)
			.where('id', id)
			.returning('id')

		return result
	}
}
