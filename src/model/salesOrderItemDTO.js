export class SalesOrderItemDTO {

    cmpCode: string
    orgCode: string
    orderItemId: string
    orderId: string
    lineId: Int
    productId: string
    shortDesc: string
    colorCode: string
    sizeCode: string
    styleCode: string
    quantity: number
    freeQuantity: number
    conversionUomFactor: number
    inventoryConversionFactor: number
    tempFreeQuantity: number
    uom: string
    oldConversionUom: string
    termsAndCondition: string
    productCategory: string
    conversionUom: string
    unitPrice: number
    discountAmount: number
    discountPercentage: number
    exciseDutyTaxId: string
    exciseDutyTaxAmt: number
    subTaxId1: string
    subTaxAmount1: number
    subTaxId2: string
    subTaxAmount2: number
    totalPrice: number
    status: string
    shipNodeId: string
    vendorId: string
    userId: string
    taxId: string
    taxAmt: number
    taxAmount: number
    tempQty: number
    operationFlag: string
    inventoryUom: string
    commodityCode: string
    skuId: string
    taxName: string
    exciseDutyTaxName: string
    taxValue: number
    exciseDutyTaxValue: number
    taxCategory: string
    onHandQty: number
    inventoryType: string
    cgstPercentage: number
    sgstPercentage: number
    igstPercentage: number
    cessPercentage: number
    cgstAmount: number
    sgstAmount: number
    igstAmount: number
    cessAmount: number
    isInvApplicable: boolean
    grossWeight: number
    netWeight: number
    gstTaxType: string
    priceToStockist: number
    expiryDate = Date()
    maxRetailPrice: number
    lotNumber: string
    batchNumber: string
    revisionNumber: string
    retailPrice: number
    lcTotalPrice: number
    lcCgstAmount: number
    lcSgstAmount: number
    lcIgstAmount: number
    lcCessAmount: number
    lcDiscountAmount: number
    productClass: string
    gstRate: number
    alternateQty: number

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

    segTaxPercentage: string
    nodeName: string

    // WO
    productDesc: string
    price: number
    bomId: string
    reqQuantity: number
    orderLineId: string
    model: string
    
}
