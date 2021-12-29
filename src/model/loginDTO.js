
export class LoginDTO {

    cmpCode: string
    orgCode: string
    userId: string
    password: string
    firstName: string
    lastName: string
    emailId: string
    status: string
    isLogin: string
    message: string
    attachments: string
    deviceToken: string
    deviceType: string
    createdTs = Date
    modifiedTs = Date
    createdBy: string
    modifiedBy: string
    isLogout: string
    name: string
    isValid: boolean
    roleCode: string
    branch: string
    departmentName: string
    designation: string
    empAttachment: string
    employeeCode: string
    appCode: string
    userPrivileges: [string]
    tokenId: string
    // licensePortalMap: [string: string]
    passwordExpDate: string
}