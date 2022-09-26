import { UserServices } from '../../services/userServices'
import Knex from 'knex'
import type { Knex as KnexType } from 'knex'
import knexConfig from '../../knexfile'

describe('UserService', () => {
	let service: UserServices
	let knex: KnexType

	beforeAll(() => {
		knex = Knex(knexConfig['test'])
	})

	beforeEach(async () => {
		service = new UserServices(knex)
		// await knex('users').del()
		await knex.raw(
			'truncate gender, profession_types, education restart identity cascade'
		)

		await knex('users').insert({
			first_name: 'chan',
			last_name: 'man',
			username: 'roy',
			password: '123',
			email: 'roy@gmail.com',
			birthday: '2000/1/1',
			height: '190',
			weight: '60',
			gender: '1',
			phone: '98765432',
			profession: '1',
			education: '1',
			is_deleted: 'false',
			is_user: 'true',
			hkid: 'Y6543210'
		})
	})

	it('get username by username - success', async () => {
		const username = 'roy'
		const user_id = 1
		const user = await service.checkUserToken(user_id, username)

		expect(user).toBeDefined()
		// expect(user.!username).toEqual("roy");
	})

	it('get username by username - fail to find the user', async () => {
		const username = 'peter'
		const user_id = 1
		const user = await service.checkUserToken(user_id, username)

		expect(user).not.toBeDefined()
	})

	afterAll(async () => {
		await knex.destroy()
	})
})
