import { WorkOrderItemListDTO } from "."

export class WorkOrderDTO {

    nodeId: string
    customerCode: string
    gstin: string
    startDateStr: string
    referenceOrderId: string

    description: string

    cmpCode: string
    orgCode: string
    orderId: string
    styleId: string
    isRatioEnable: string
    productId: string
    shipmentDate = Date()
    deliveryMode: string
    paymentTerms: string
    currency: string
    refOrderType: string
    termsAndCondition: string
    userId: string
    status: string
    // private Calendar timeStamp; ???
    supervisor: string
    attachmentLocation: string
    imageLocation: string
    costCentre: string
    quoteReferenceID: string
    isQuoteApproved: string
    //  startDate = Date()
    startDate: string
    workType: string
    budgetId: string
    budgetIdExt: string
    totalOrderQty: number
    noOfSize: number
    noOfColor: number
    commonConsumptionQty: number
    quoteRefRemarks: string
    orderIdPrefix: string
    actualShipmentDate = Date()
    //Gst
    disableMaterialDemand: boolean
    //Gst

    segment1: string
    segment2: string
    segment3: string
    segment4: string
    segment5: string
    segment6: string
    segment7: string
    segment8: string
    segment9: string
    segment10: string
    segment11: string
    segment12: string
    segment13: string
    segment14: string
    segment15: string
    segment16: string
    segment17: string
    segment18: string
    segment19: string
    segment20: string

    projectDesc: string
    docType: string

    externalUrl: string

    workOrderItemList: [WorkOrderItemListDTO]

    // For Demo Purpose have to delete ??? check it out ???
    //     salesOrderLineList : [SalesOrderItemDTO]?;
    //     workOrderItemList: [SalesOrderItemDTO]?

}

