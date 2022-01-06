import { ParticipantContactModel } from "./participantContactModel"

export class ParticipantDTO {
    orgCode: string
    cmpCode: string
    participantId: string
    participantName: string
    webAddress: string
    contactTitle: string
    contactName: string
    contactMobile: string
    fax: string
    contactDesignation: string
    officeNo: string
    emailId: string
    phone: string
    participantContactList: [ParticipantContactModel]
    bankAccNum: string
    bankAccHolderName: string
    chequeLeafName: string
    bankAccIfscCode: string
    bankBranch: string
    paymentOption: string
    bankName: string
    glNum: string
    tinNum: string
    cstNum: string
    territory: string
    userId: string
    isSeller: string
    isBuyer: string
    isContractor: string
    tierId: string
    isNodeCreate: boolean
    isPartCurAccCreate: boolean
    //For Transfer
    country: string
    isDoorToDoor: string
    isDepositIntoAcc: string
    isCashOverCounter: string
    currencyCodes: string
    currency: string
    termsAndCondition: string
    //GST
    sezUnit: string
    gstin: string
    partType: string
    isGST: boolean
    isDuplicateName: boolean

    customerName: string
    store: string
    placeOfSupply: string
    bankAccountName: string
    commContacts: ParticipantContactModel

    leadStatusId: string
    leadStatus: string

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
}
