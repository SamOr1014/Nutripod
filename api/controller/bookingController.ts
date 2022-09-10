import { Request, Response } from 'express'
import { BookingServices } from '../services/bookingServices'

export class BookingController {
    constructor(private bookingService:BookingServices) {}

    get = async (req: Request, res: Response) => {
        const results = await this.bookingService.get()
        if(results.length === 0 ) {
            res.json({success:false,message:"Error in booking"})
            return
        }
        const result = res.json(results)
        res.send(result)
    }

 

}