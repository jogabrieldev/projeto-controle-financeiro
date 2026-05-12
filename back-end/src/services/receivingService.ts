
import {ReceivingModels} from "../infra/receivingModels"
import {receiving} from "../types/receivingType"
const conn = new ReceivingModels()
export class ReceivingService {
    
    public validateInsertReceiving(data:receiving){
       conn.insertReceiving(data)
    }
}