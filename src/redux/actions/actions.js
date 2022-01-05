
import * as actionType from "./actionTypes";
import * as api from "../../constants/api";
import * as alerts from "../../constants/alerts";
import * as utility from "../../utility";
import { Alert } from "react-native";
import * as commonApi from "./commonApi";

import * as constant from '../../constants/keys'
import * as storage from "../../asset/utils/asyncStore"

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

export const commonQueryParam = (obj, queryObjType) => {
  switch (queryObjType) {
    case "A": // No TokenDTO 
      return getQueryParamTypeA(obj).slice(0, getQueryParamTypeA(obj).length - 1)
    case "B": // TokenDTO only
      return getQueryParam(obj)
    case "C": // TokenDTO + Values
      return createQueryString(obj).replace(/%25/g, '%').slice(1)
    default: return ""
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

    default: return ""
  }
}

export const getSavedBaseUrl = () => {
  storage.getData(constant.keyIsBaseUrl)
    .then((gotUrl) => { api.baseUrl = gotUrl })
    .then(() => { return api.baseUrl })
}

const commonGetApiCall = (query, dataObj, className, triggeredAction) => {
  return dispatch => {

    const gotUrl = storage.getData(constant.keyIsBaseUrl)
    setTimeout(() => { api.baseUrl = gotUrl._W }, 500)

    const data = dataObj === null ? {} : dataObj
    const joinedQuery = query === null ? "" : query
    const queryUrl = api.baseUrl + getPathUrl(triggeredAction) + joinedQuery

    console.log("queryUrl::: >>>>", queryUrl)

    if (api.baseUrl == "") return alert("Get Api Base Url is Empty")
    if (api.baseUrl == undefined) return alert("Get Api Base Url is undefined")

    var headers = { "Content-Type": "application/json", "Access-Token": "" }

    console.log("TOKEN DTO: ----->", data)

    commonApi
      .getDataApi(queryUrl, "")
      .then(response => {

        let payload = {}
        payload = response.data

        FIXME: // 1. If you want add some data into the obj
        TODO: // payload.accessToken = "someAccessToken" 
        console.log("GET Api call success", JSON.stringify(payload))

        returnToDispatch(dispatch, actionType.apiResponse.API_SUCCESS, payload, className, triggeredAction)
        // returnToScreenNavigation(dispatch, actionType.API_SUCCESS, className);
      })
      .catch(error => {
        console.log("GET Api call Failed", error)
        alert(error)
        returnToDispatch(dispatch, actionType.apiResponse.API_FAILURE, error, className, triggeredAction)
        handleError(error, dispatch)
      })

  }
}

const commonApiCall = (query, dataObj, className, triggeredAction) => {
  return dispatch => {

    const gotUrl = storage.getData(constant.keyIsBaseUrl)
    setTimeout(() => { api.baseUrl = gotUrl._W }, 500)

    const data = dataObj === null ? {} : dataObj
    const joinedQuery = query === null ? "" : query
    const queryUrl = api.baseUrl + getPathUrl(triggeredAction) + joinedQuery

    console.log("queryUrl::: >>>>", queryUrl)

    if (api.baseUrl == "") return alert("Base Url is Empty")
    if (api.baseUrl == undefined) return alert("Base Url is undefined")

    var headers = { "Content-Type": "application/json", "Access-Token": "" }

    console.log("TOKEN DTO: ----->", data)

    commonApi
      .postDataApi(queryUrl, "", data, headers)
      .then(response => {

        let payload = {}
        payload = response.data

        FIXME: // 1. If you want add some data into the obj
        TODO: // payload.accessToken = "someAccessToken" 
        console.log("Api call success", JSON.stringify(payload))

        returnToDispatch(dispatch, actionType.apiResponse.API_SUCCESS, payload, className, triggeredAction)
        // returnToScreenNavigation(dispatch, actionType.API_SUCCESS, className);
      })
      .catch(error => {
        console.log("Api call Failed", error)
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