import * as storage from "../asset/utils/asyncStore"
import * as constant from "../constants/keys"
import { UserTokenDTO } from "../model"
import { commonQueryParam } from "../redux/actions/actions"

export let tokenDTO = new UserTokenDTO()
export let isLoggedIn = false

export const getTokenDTO = () => {
    return commonQueryParam(tokenDTO, "B")
}

export const getTokenDTOwithData = () => {
    return commonQueryParam(getTokenDTO(), "C")
}

// This is the way to config the baseUrl otherwise it does no set
// const loadinglocalData = (async () => {
//     try {
//         await storage.getData(constant.keyIsUserId).then(data => { tokenDTO.userId = data })
//         await storage.getData(constant.keyIsOrgCode).then(data => { tokenDTO.orgCode = data })
//         await storage.getData(constant.keyIsCmpCode).then(data => { tokenDTO.cmpCode = data })
//         await storage.getData(constant.keyIsDeviceId).then(data => { tokenDTO.deviceId = data })
//         await storage.getData(constant.keyIsTokenId).then(data => { tokenDTO.tokenId = data })
//         await storage.getData(constant.keyIsTokenId).then(data => { tokenDTO.tokenId = data })
//     } catch (error) {
//         alert("Error occured from sharedPreferces.js")
//     }
// })()

const _a = (async () => { await storage.getData(constant.keyIsUserId).then(data => { tokenDTO.userId = data }) })()

const _b = (async () => { await storage.getData(constant.keyIsOrgCode).then(data => { tokenDTO.orgCode = data }) })()

const _c = (async () => { await storage.getData(constant.keyIsCmpCode).then(data => { tokenDTO.cmpCode = data }) })()

const _d = (async () => { await storage.getData(constant.keyIsDeviceId).then(data => { tokenDTO.deviceId = data }) })()

const _e = (async () => { await storage.getData(constant.keyIsTokenId).then(data => { tokenDTO.tokenId = data }) })()

const _f = (async () => { await storage.getData(constant.keyIsLoggedIn).then(data => { isLoggedIn = data }) })()