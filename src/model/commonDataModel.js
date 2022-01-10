
import { SequenceGeneratorDTO } from "."

export class CommonDataModel {
    cmpCode: string
    orgCode: string
    gstin: string
    userId: string
    nodeMap: [{ key: string, value: string }]
    stateMap: [{ key: string, value: string }]
    paymentTermMap: [{ key: string, value: string }]
    paymentModeMap: [{ key: string, value: string }]
    salesPersonMap: [{ key: string, value: string }]
    orderCategoryMap: [{ key: string, value: string }]
    sequenceGeneratorDTOs: [SequenceGeneratorDTO]
}

























