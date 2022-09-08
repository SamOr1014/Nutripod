import { Request, Response } from 'express'
import { MedicalRecordServices} from "../services/medicalRecordServices"

export class MedicalRecordController {
    constructor(private medicalRecordService:MedicalRecordServices) {}

    get = async (req: Request, res: Response) => {
        this.medicalRecordService.get
    }

}