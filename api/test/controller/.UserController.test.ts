import { UserController } from '../../controller/userController'
import { UserServices } from '../../services/userServices'
import { checkPassword } from '../../utilities/hash'
import jwtSimple from 'jwt-simple'
import type { Request, Response } from 'express'
import type { Knex } from 'knex'
import { createRequest, createResponse } from '../helper'

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
		service.register = jest.fn(() =>
			Promise.resolve([
				{
					id: 1,
					firstName: 'chan',
					lastName: 'wan',
					username: 'roy',
					password: '1234',
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

		req = createRequest()
		res = createResponse()
		;(checkPassword as jest.Mock).mockResolvedValue(true)
		controller = new UserController(service)
	})

	it('test login - missing username', async () => {
		req.body = { username: 'peter', password: '123' }

		await controller.login(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).lastCalledWith({
			message: 'username or password are missing'
		})
		expect(res.json).toBeCalledTimes(1)
	})

	// it('test login - missing password', async () => {
	// 	req.body.data = { username: 'roy' }

	// 	await controller.login(req, res)

	// 	expect(res.status).lastCalledWith(400)
	// 	expect(res.json).lastCalledWith({
	// 		message: 'username or password are missing'
	// 	})
	// 	expect(res.json).toBeCalledTimes(1)
	// })

	it('test login - success', async () => {
		const username = 'roy'
		const password = '1234'
		const dummyCode = 'i_am_dummy'

		req.body = { username, password }
		;(jwtSimple.encode as jest.Mock).mockReturnValue(dummyCode)

		await controller.login(req, res)

		expect(service.checkUserToken).toBeCalledWith(username)
		expect(checkPassword).toBeCalledWith(password, 'hashedPassword')
		expect(res.json).toBeCalledWith({ token: dummyCode })
	})

	// it("test login - internal server error", () => {});
})
