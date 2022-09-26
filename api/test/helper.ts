import type { Request, Response } from 'express'

export function createRequest(): Request {
	return {
		params: {},
		query: {},
		body: {},
		user: {}
	} as Request
}

export function createResponse(): Response {
	const mockResp = {
		status: jest.fn(() => mockResp),
		json: jest.fn()
	} as any as Response

	return mockResp
}
