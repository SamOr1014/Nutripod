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
		await knex('users').del()
		await knex.raw('truncate users restart identity cascade')

		const gender_id = await knex('gender')
			.insert({ gender_type: 'male' })
			.returning('id')

		const profession_id = await knex('profession_types')
			.insert({ pf_type: 'abc' })
			.returning('id')

		const education_id = await knex('education')
			.insert({ education_level: 'edf' })
			.returning('id')

		await knex('users').insert({
			first_name: 'chan',
			last_name: 'man',
			username: 'roy',
			password: '123',
			email: 'roy@gmail.com',
			birthday: '2000/1/1',
			height: '190',
			weight: '60',
			gender: gender_id[0].id,
			phone: '98765432',
			profession: profession_id[0].id,
			education: education_id[0].id,
			is_deleted: 'false',
			is_user: 'true',
			hkid: 'Y6543210'
		})
	})

	it('get username by username - success', async () => {
		const username = 'roy'

		const user = await service.login(username)

		expect(user).toBeDefined()
		expect(user[0].username).toEqual('roy')
	})

	it('get username by their hkid - success', async () => {
		const hkid = 'Y6543210'

		const user = await service.getUserBYHKID(hkid)
		expect(hkid).toEqual('Y6543210')
		expect(user[0].first_name).toEqual('chan')
		expect(user[0].last_name).toEqual('man')
	})

	afterAll(async () => {
		await knex.destroy()
	})
})
