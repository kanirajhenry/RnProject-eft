import AsyncStorage from "@react-native-community/async-storage"
import * as constant from "../../constants/keys"

export let baseUrl = ""
export let orgCode = ""
export let userId = ""
export let emailId = ""
export let password = ""
export let branch = ""
export let cmpCode = ""
export let name = ""
export let roleCode = ""
export let userPrivileges = ""
export let employeeCode = ""
export let tokenId = ""
export let passwordExpDate = ""
export let licensePortalMap = [{ key: String, value: String }]

export const setData = async (key, value) => {
    try {
        const item = JSON.stringify(value)
        const result = await AsyncStorage.setItem(key, item).then(() => {
            getData(key)
        })
        return result
    } catch (e) {
        throw e
    }
}

export const getData = async (key) => {
    try {
        await AsyncStorage.getItem(key).then((storedData) => {
            const data = JSON.parse(storedData)
            switch (key) {
                case constant.keyIsBaseUrl: baseUrl = data; break
                case constant.keyIsOrgCode: orgCode = data; break
                case constant.keyIsUserId: userId = data; break
                case constant.keyIsEmailId: emailId = data; break
                case constant.keyIsPassword: password = data; break
                case constant.keyIsBranch: branch = data; break
                case constant.keyIsCmpCode: cmpCode = data; break
                case constant.keyIsName: name = data; break
                case constant.keyIsRoleCode: roleCode = data; break
                case constant.keyIsUserPrivileges: userPrivileges = data; break
                case constant.keyIsEmployeeCode: employeeCode = data; break
                case constant.keyIsTokenId: tokenId = data; break
                case constant.keyIsPasswordExpDate: passwordExpDate = data; break
                case constant.keyIsLicensePortalMap: licensePortalMap = data; break
                default: break
            }
        })
    } catch (e) {
        throw e
    }
}
