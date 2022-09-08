import { Request, Response } from 'express'
import { DietRecordServices } from '../services/dietRecordServices'

export class DietRecordController {
    constructor(private dietRecordService: DietRecordServices) { }

    get = async (req: Request, res: Response) => {
        this.dietRecordService.get
    }

}