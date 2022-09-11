import { Request, Response } from 'express'
import { MedicalRecordServices} from "../services/medicalRecordServices"

export class MedicalRecordController {
    constructor(private medicalRecordService:MedicalRecordServices) {}

    get = async (req: Request, res: Response) => {
        const results = await this.medicalRecordService.get()
        if(results.length === 0 ) {
            res.json({success:false,message:"Error in medicalRecord"})
            return
        }
        const result = res.json(results)
        res.send(result)
    }


}