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

// export const getData = async (key) => {
//     try {
//         const result = await AsyncStorage.getItem(key)
//         return JSON.parse(result)
//     } catch (e) {
//         throw e
//     }
// }


// TODO: CORRECT 
export const getData = async (key) => {
    try {
        await AsyncStorage.getItem(key).then((value) => { myName = value })
        // return JSON.parse(result)
    } catch (e) {
        throw e
    }
}

// TODO: CORRECT 
// export const setData = async (key, value) => {
//     try {
//         const item = JSON.stringify(value)
//         const result = await AsyncStorage.setItem(key, item)

//         return result
//     } catch (e) {
//         throw e
//     }
// }

// TODO: RND 
export const setData = async (key, value) => {
    try {
        // console.log("1234567890---- 1")
        const item = JSON.stringify(value)
        // console.log("1234567890---- 2")
        const result = await AsyncStorage.setItem(key, item).then(() => {
            // console.log("1234567890---- 3")
            getCommonLocalData(key)
            // console.log("1234567890---- 5")
        })
        return result
    } catch (e) {
        throw e
    }
}

// export const getToken = async () => {
//     try {
//         await AsyncStorage.getItem(constant.keyIsTokenId).then((data) => { tokenId = data })
//     } catch (e) { throw e }
// }

// export const getCmpCode = async () => {
//     try {
//         await AsyncStorage.getItem(constant.keyIsCmpCode).then((data) => { cmpCode = data })
//     } catch (e) { throw e }
// }

export const getCommonLocalData = async (key) => {
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
                default: break
            }
        })
    } catch (e) {
        throw e
    }
}

// export const getDataSomeData = async (key) => {
//     async = (dispatch) => {
//         const result = AsyncStorage.getItem(constant.keyIsBaseUrl)
//         return JSON.parse(result)
//     }
// }

// export const getLocalData = async (key) => {
//     console.log("starting .... >>>1")
//     let data = await AsyncStorage.getData(constant.keyIsBaseUrl)
//     // console.log("starting .... 2    ")
//     // setTimeout(() => { alert(gotUrl._W) }, 500)
//     // console.log("starting .... 3")
// }

// // export const getData = async (key) => {
// //     console.log("starting .... 1")
// //     try {
// //         console.log("starting .... 2")
// //         setTimeout(() => {
// //             AsyncStorage.getItem(key)
// //                 .then((localData) => {
// //                     console.log("starting .... 3")
// //                     return JSON.parse(localData)
// //                     console.log("starting .... 4")
// //                 })
// //         }, 500);
// //         console.log("starting .... 6")
// //     } catch (e) {
// //         throw e
// //     }
// // }




// export const setPassword = async (Value) => {
//     await AsyncStorage.setItem(constant.keyIsPassword, Value);
// }

// export const getPassword = async () => {
//     // const gotPassword = await AsyncStorage.getItem(constant.keyIsPassword)
//     //     .then((pass) => ({
//     //         alert(pass)
//     //     }))
// }


