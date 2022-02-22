import AsyncStorage from "@react-native-community/async-storage"
import * as constant from "../constants/keys"
import { getSavedBaseUrl } from "../../redux/actions/actions"

export const setData = async (key, value) => {
    try {
        const item = JSON.stringify(value)
        if (item) {
            const result = await AsyncStorage.setItem(key, item)
            return result
        } else {
            console.log('not set, stringify failed:', key, value)
        }

    } catch (e) {
        console.log("Catched error from setData local storage Error: ", e)
        throw e
    }
}

export const getData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return JSON.parse(data)
    } catch (e) {
        console.log("Catched error from getData local storage Error: ", e)
        throw e
    }

    // AsyncStorage.getItem(key, (err, value) => {
    //     if (err) {
    //         console.log("err*******************************")
    //     } else {
    //          // boolean false
    //         console.log(JSON.parse(value), "+++++++++++++++++++++++++++++")
    //     }
    // })
}


// ================================================

// export const getLicensePortalMap = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsLicensePortalMap)
//     return JSON.parse(data)
// }

// export const getPasswordExpDate = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsPasswordExpDate)
//     return JSON.parse(data)
// }

// export const getTokenId = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsTokenId)
//     return JSON.parse(data)
// }

// export const getEmployeeCode = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsEmployeeCode)
//     return JSON.parse(data)
// }

// export const getUserPrivileges = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsUserPrivileges)
//     return JSON.parse(data)
// }

// export const getRoleCode = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsRoleCode)
//     return JSON.parse(data)
// }

// export const getName = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsName)
//     return JSON.parse(data)
// }

// export const getCmpCode = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsCmpCode)
//     return JSON.parse(data)
// }

// export const getBranch = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsBranch)
//     return JSON.parse(data)
// }

// export const getPassword = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsPassword)
//     return JSON.parse(data)
// }

// export const getEmailId = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsEmailId)
//     return JSON.parse(data)
// }

// export const getUserId = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsUserId)
//     return JSON.parse(data)
// }

// export const getOrgCode = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsOrgCode)
//     return JSON.parse(data)
// }

// export const getBaseUrl = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsBaseUrl)
//     return JSON.parse(data)
// }
// export const getIsLoggedIn = async () => {
//     const data = await AsyncStorage.getItem(constant.keyIsLoggedIn)
//     return JSON.parse(data)
// }




