import * as actionType from "./actionTypes"
import * as api from "../../asset/constants/api"
import * as alerts from "../../asset/constants/alerts"
import * as utility from "../../asset/utility"
import * as commonApi from "./commonApi"
import { Alert } from "react-native"

import * as constant from '../../asset/constants/keys'
import * as storage from "../../asset/utils/asyncStore"
import { UserTokenDTO } from "../../model"
import singleton from "../../singleton/singleton"
import validations from "../../asset/libraries/validations"
import * as localData from "../../asset/constants/sharedpreference"

export const changeInternetState = isConnected => {
  alert("0000000")
  return dispatch => {
    returnToDispatch(dispatch, INTERNET_STATE_CHANGED, isConnected);
  }
}

export const setAccessToken = accessToken => {
  alert("1111111")
  return dispatch => {
    returnToDispatch(dispatch, SET_ACCESS_TOKEN, accessToken)
  }
}

export const loginPage = token => {
  alert("22222222")
  return dispatch => {
    returnToDispatch(dispatch, type, className, token)
  }
}

export const createQueryString = (data) => {
  return Object.keys(data).map(key => {
    let val = data[key]
    if (val !== null && typeof val === 'object') val = createQueryString(val)
    // return `${key}=${encodeURI(`${val}`.replace(/\s/g, ' '))}`
    return `${key}=${encodeURI(`${val}`.replace("%25", ''))}`
  }).join('&')
}

export const createQueryStringLikeName = (data) => {
  return Object.keys(data).map(key => {
    let val = data[key]
    if (val !== null && typeof val === 'object') val = createQueryString(val)
    // return `${key}=${encodeURI(`${val}`.replace(/\s/g, ' '))}`
    return `${key}=${encodeURI(`${val}`.replace("%25", ''))}`
    // return `${key}=${encodeURI(`${val}`.replace("&1", '&'))}`
  }).join('&')
}

export const commonQueryParam = (obj, queryObjType) => {
  switch (queryObjType) {
    case "A": // No TokenDTO
      return getQueryParamTypeA(obj).slice(0, getQueryParamTypeA(obj).length - 1)
    case "B": // TokenDTO only
      return getQueryParam(obj)
    case "C": // TokenDTO + Values
      return createQueryString(obj).replace(/%25/g, '%').slice(1)
    case "D": // TokenDTO + Values like getStatusConfiguration() api queryParams list of name
      return createQueryStringLikeName(obj).replace(/%25/g, '%').slice(2)
    default:
      return ""
  }
}

const getQueryParamTypeA = (obj) => {
  return Object.keys(obj).reduce((prev, key, i) => (`${prev}${i !== 0 ? '' : ''}${key}=${obj[key]}&`), '?')
}

export const getQueryParam = (obj) => {
  return Object.keys(obj).reduce((prev, key, i) =>
    (`${prev}${i !== 0 ? '%22,%22' : 'tokenDTO=%7B%22'}${key}%22:%22${obj[key]}${i == Object.keys(obj).length - 1 ? '%22%7D' : ''}`), '?')
}

// const getQueryParam = (url, obj) => {
//   return url + "?" + Object.keys(obj).reduce((prev, key, i) => (`${prev}${i !== 0 ? '&' : ''}${key}=${obj[key]}`), '');
// }

const getPathUrl = triggeredAction => {

  switch (triggeredAction) {

    case actionType.ipScreen.IP_CONFIG: return api.checkConfig

    case actionType.loginScreen.ON_LOGIN: return api.validateUser

    case actionType.loginScreen.ON_FORGET_PASSWORD: return api.forgetPassword

    case actionType.loginScreen.ON_REGISTER: return api.registerGST

    case actionType.loginScreen.ON_SIGN_UP: return api.userSignUp

    case actionType.participantScreen.ON_CREATE_PARTICIPANT: return api.gstinData

    case actionType.singletonScreen.ON_GET_DISPLAY_ADDRESS: return api.getOrgAddress

    case actionType.singletonScreen.ON_GET_FISCAL_YEAR_LIST: return api.getFiscalYearList

    case actionType.singletonScreen.ON_GET_GSTIN_DATA_LIST: return api.gstinList

    case actionType.singletonScreen.ON_GET_FISCAL_YEAR: return api.getFiscalYear

    case actionType.singletonScreen.ON_GET_INVENTORY_LIST: return api.inventoryOnHandQty

    default: return ""
  }
}

export const getQuerUrl = (query, dataObj, triggeredAction) => {

  const joinedQuery = (query === null || query === undefined) ? "" : query
  const queryUrl = api.baseUrl + getPathUrl(triggeredAction) + joinedQuery

  if (api.baseUrl == "") return alert("BASE URL IS empty")
  if (api.baseUrl == undefined) return alert("BASE URL IS undefined")

  return queryUrl
}


const genericApiCallSuccess = (response, triggeredAction, dispatch, className) => {

  console.log(JSON.stringify(response))

  let payload = {}
  payload = response.data

  let userTokenDTO = new UserTokenDTO()
  userTokenDTO = payload

  FIXME: // 1. If you want add some data into the obj
  TODO: // payload.accessToken = "someAccessToken" 
  console.log("Api call success", JSON.stringify(payload))
  // alert(JSON.stringify(userTokenDTO.tokenId))

  if (triggeredAction == actionType.singletonScreen.ON_GET_INVENTORY_LIST) {
    // alert(JSON.stringify(userTokenDTO.response))
  }

  switch (triggeredAction) {

    case actionType.loginScreen.ON_LOGIN:
      returnToDispatch(dispatch, actionType.apiResponse.API_SUCCESS, payload, className, triggeredAction)
      break

    default:
      switch (userTokenDTO.responseCode) {
        case "1":
          // alert("response code is 1 from genericApiCallSuccess()")
          if (userTokenDTO.response != null && userTokenDTO.response.length > 0) {
            returnToDispatch(dispatch, actionType.apiResponse.API_SUCCESS, payload, className, triggeredAction)
          }
          break
        case "0":
          // alert("response code is 0 genericApiCallSuccess()")
          validations.snackBar("userTokenDTO.responseCode Is Zero: action Is", triggeredAction, userTokenDTO.responseCode)
          if (userTokenDTO.errorMessages.length > 0) alert(JSON.stringify(userTokenDTO.errorMessages))
          break

        default: break
      }
  }
}

const commonGetApiCall = (query, dataObj, className, triggeredAction) => {

  return dispatch => {

    const queryUrl = getQuerUrl(query, dataObj, triggeredAction)
    const data = (dataObj === null) ? {} : dataObj
    console.log(
      "Effitrac token DTO : ----->", data,
      "Effitrac main get url : =================", queryUrl,
      "Effitrac triggered action ", triggeredAction
    )

    commonApi
      .getDataApi(queryUrl, {})
      .then(response => genericApiCallSuccess(response, triggeredAction, dispatch, className))
      .catch(error => {
        console.log("GET API FAILED ACTION IS: ", triggeredAction, error)
        alert(error)
        returnToDispatch(dispatch, actionType.apiResponse.API_FAILURE, error, className, triggeredAction)
        handleError(error, dispatch)
      })
  }
}

const commonApiCall = (query, dataObj, className, triggeredAction) => {

  const queryUrl = getQuerUrl(query, dataObj, triggeredAction)
  const headers = { "Content-Type": "application/json", "Access-Token": "" }
  const data = (dataObj === null) ? {} : dataObj
  console.log(
    "Effitrac token DTO : ----->", data,
    "Effitrac main post url : =================", queryUrl,
    "Effitrac triggered action ", triggeredAction
  )

  return dispatch => {
    commonApi
      .postDataApi(queryUrl, "", data, headers)
      .then(response => genericApiCallSuccess(response, triggeredAction, dispatch, className))
      .catch(error => {
        console.warn("POST API FAILED ACTION IS: ", triggeredAction, error)
        alert(error)
        returnToDispatch(dispatch, actionType.apiResponse.API_FAILURE, error, className, triggeredAction)
        handleError(error, dispatch)
      })
  }
}

resetAsyncData = dispatch => {
  // reset async data and navigate to login screen
}

handleError = (error, dispatch) => {
  setTimeout(() => {
    if (error.response) {
      if (error.response.status === 401) {
        Alert.alert("", alerts.UNAUTHENTIC_USER, [{ text: "OK", onPress: () => resetAsyncData(dispatch) }])
      }
    } else if (error.message) {
      utility.showAlert(error.message)
    } else {
      utility.showAlert(JSON.stringify(error))
    }
  }, 500)
}

returnToDispatch = (dispatch, type, payload, className, triggeredAction) => {
  dispatch({
    type: type,
    payload: payload,
    className: className,
    triggeredAction, triggeredAction
  })
}

returnToScreenNavigation = (dispatch, type, className) => {
  dispatch({
    type: type,
    className: className
  })
}

export { commonApiCall as default, commonGetApiCall }