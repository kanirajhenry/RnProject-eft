import { ParticipantContactModel } from "./participantContactModel"
import { CommentDTO } from "."

export class ParticipantDTO {
    //For Transfer
    //GST
    isGST: boolean
    customerName: string
    store: string
    placeOfSupply: string
    bankAccountName: string
    commContacts: ParticipantContactModel
    leadStatusId: string
   
    participantId: string
    cmpCode: string
    orgCode: string
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
    partiContactList: [PartiContactDTO]
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
    country: string
    isDoorToDoor: string
    isDepositIntoAcc: string
    isCashOverCounter: string
    currencyCodes: string
    currency: string
    termsAndCondition: string
    sezUnit: string
    gstin: string
    isGST: sool
    isDuplicateName: boolean
    partType: string
    //var headQuoState: String?
    leadOwner: string
    leadSource: string
    leadStatus: string
    leadStatusId: number
    commentList: [CommentDTO]
    oldStatusId: number
    attachmentLocation: string

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
