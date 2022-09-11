import { Request, Response } from 'express'
import { DietRecordServices } from '../services/dietRecordServices'

export class DietRecordController {
    constructor(private dietRecordService: DietRecordServices) { }

    get = async (req: Request, res: Response) => {
        const results = await this.dietRecordService.get()
        if(results.length === 0 ) {
            res.json({success:false,message:"Error in diet"})
            return
        }
        const result = res.json(results)
        res.send(result)

    }


}