import express from 'express'
import { dietRecordController } from '../server'

export const dietRecordRoutes = express.Router()

dietRecordRoutes.get('/weight/:uid', dietRecordController.getWeightByUserID)
dietRecordRoutes.get('/bp/:uid', dietRecordController.getBPByUserID)
dietRecordRoutes.get('/bg/:uid', dietRecordController.getBGByUserID)

dietRecordRoutes.post('/weight', dietRecordController.postWeight)
dietRecordRoutes.post('/bp', dietRecordController.postBP)
dietRecordRoutes.post('/bg', dietRecordController.postBGlu)

dietRecordRoutes.delete('/weight/:rid', dietRecordController.deleteWeightRecord)
dietRecordRoutes.delete('/bp/:rid', dietRecordController.deleteBPRecord)
dietRecordRoutes.delete('/bg/:rid', dietRecordController.deleteBGRecord)
