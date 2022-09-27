import { UserController } from '../../controller/userController'
import { UserServices } from '../../services/userServices'
import { checkPassword } from '../../utilities/hash'
import jwtSimple from 'jwt-simple'
import type { Request, Response } from 'express'
import type { Knex } from 'knex'
import { createResponse, createRequest } from '../helper'

jest.mock('jwt-simple')
jest.mock('../../services/userServices')
jest.mock('../../utilities/hash')

describe('UserController', () => {
	let controller: UserController
	let service: UserServices
	let req: Request
	let res: Response

	beforeEach(() => {
		service = new UserServices({} as Knex)
		service.login = jest.fn(() =>
			Promise.resolve([
				{
					id: 1,
					firstName: 'chan',
					lastName: 'wan',
					username: 'roy',
					password: 'hashedPassword',
					email: 'roy@gmail.com',
					birthday: '2000 / 10 / 10',
					height: '190',
					weight: '70',
					phone: '98765432',
					address: 'Tsuen wan',
					hkid: 'Y654321',
					gender: '1',
					profession: '1',
					chronic_condition: '1',
					education: '1'
				}
			])
		)

		// req = createRequest()
		res = createResponse()
		req = createRequest()
		;(checkPassword as jest.Mock).mockResolvedValue(true)
		controller = new UserController(service)
	})

	it('test login - missing username', async () => {
		req.body.data.user = { username: '', password: '123' }
		await controller.login(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).lastCalledWith({
			success: false,
			message: '帳戶名或密碼沒有提供'
		})
		expect(res.json).toBeCalledTimes(1)
	})

	it('test login - success', async () => {
		const username = 'roy'
		const password = '1234'
		const dummyCode = 'i_am_dummy'

		req.body.data.user = { username, password }
		;(jwtSimple.encode as jest.Mock).mockReturnValue(dummyCode)

		await controller.login(req, res)

		expect(service.login).toBeCalledWith(username)
		expect(checkPassword).toBeCalledWith(password, 'hashedPassword')
		expect(res.json).toHaveBeenCalledWith({
			info: {
				address: 'Tsuen wan',
				birthday: '2000 / 10 / 10',
				chronic_condition: '1',
				education: '1',
				email: 'roy@gmail.com',
				firstName: 'chan',
				gender: '1',
				height: '190',
				hkid: 'Y654321',
				id: 1,
				lastName: 'wan',
				password: 'hashedPassword',
				phone: '98765432',
				profession: '1',
				username: 'roy',
				weight: '70'
			},
			success: true,
			token: dummyCode
		})
	})

	it('get user by their hkid', async () => {
		const hkid = 'Y654321'
		const username = 'roy'

		req.params = { hkid }
		;(service.getUserBYHKID as jest.Mock).mockReturnValue(username)

		await controller.getUserByHKID(req, res)

		expect(service.getUserBYHKID).toBeCalledWith(hkid)
		expect(res.json).toBeCalledWith({ success: true, user: 'roy' })
	})
})
