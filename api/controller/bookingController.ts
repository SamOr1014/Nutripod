import { Request, Response } from 'express'
import { BookingServices } from '../services/bookingServices'

export class BookingController {
    constructor(private bookingService:BookingServices) {}

    get = async (req: Request, res: Response) => {
        this.bookingService.get
    }

}