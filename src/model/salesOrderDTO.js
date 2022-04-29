export class SalesOrderDTO {

    orgCode: string
    cmpCode: string
    productId: string
    orderId: string
    docType: string
    salesPersonId: string
    orderStatus: string
    status: string
    category: string
    regId: string
    txnDate = Date()
    busDate = Date()
    custId: string
    customerCode: string
    totalItems: number
    preTaxAmount: number
    taxAmount: number
    roundOff: number
    discountAmount: number
    fyYear: string
    totalAmount: number
    totalLcAmount: number
    subTotal: number
    termsAndCondition: string
    statusId: number
    referenceOrderId: string
    remarks: string
    shipNodeId: string
    paymentMode: string
    deliveryBuildAdr: string
    deliveryStreet1: string
    deliveryStreet2: string
    deliveryCity: string
    deliveryState: string
    deliveryCountry: string
    deliveryZipCode: string
    billBuildAdr: string
    billStreet1: string
    billStreet2: string
    billCity: string
    billState: string
    billCountry: string
    billZipCode: string
    discountPercentage: number
    paymentDueDate = Date()
    paymentType: string
    isDirectPayment: boolean
    deliveryDate = Date()
    dueDate = Date()


    invoiceDate = Date()
    invoiceNum: string
    remark: string
    userId: string
    deliveryThrough: string
    amendmentId: string
    freeQuantity: number
    customerName: string
    customerMailId: string
    customerContactName: string
    refOrderType: string
    enclosures: string
    isStatusChange: boolean
    inventoryNode: string
    inventoryDate = Date()
    isDeleteInventoryLog: boolean
    salesOrderLineList: [SalesOrderItemDTO]
    //private List<OtherChargesDTO> otherChargeList
    costCentre: string
    reasonForReturn: string
    foreignCurrencyRate: number
    isConvertCurrency: boolean
    currency: string
    tinNum: string
    cstNum: string
    territoryId: string
    nodeName: string
    salesPersonName: string
    placeOfSupply: string
    participantType: string
    //GST
    excludeTax: string
    participantGstin: string
    gstin: string
    referenceId: string
    advCgstAmount: number
    advSgstAmount: number
    advIgstAmount: number
    advCessAmount: number
    advAmount: number
    isUnregisteredVendor: string
    //private List<GstSalesAdvanceDTO> advanceDTOs
    isGst: boolean
    isReverseCharge: string
    exportType: string
    shipPortCode: string
    shipBillNo: string
    shipBillDate = Date()
    stateType: string
    etin: string
    partSezType: string
    originalCurrency: string
    //for disc percentage or amount
    discountType: string
    //

    //Quatation
    isCostAnalysisQuote: string
    isNeedInvEntries: boolean
    isNeedAccEntries: boolean
    woStyleId: string
    woOrderId: string
    caImgLocation: string
    caNoOfColor: number
    //Jwellery
    purity: string
    rate: number
    businessType: string
    gstrRefId: string
    partTierCode: string
    //Gstr Upload
    batchId: number

    lcDiscountAmount: number

    isEnableInvAdvAmt: boolean
    //JSON
    jBusDate: string
    jDeliveryDate: string
    jDueDate: string
    //Attachments
    attachmentLocation: string
    lcSubTotal: number
    custMobileNo: string
    customerContact: string

    localCurrency: string
    isEnableTagwise: boolean
    isAllowDupProduct: boolean
    lcRoundOff: number

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


    // WO
    startDate: string
    disableMaterialDemand: boolean

}
