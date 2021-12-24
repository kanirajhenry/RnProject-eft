
import * as actionType from "./actionTypes";
import * as api from "../../constants/api";
import * as alerts from "../../constants/alerts";
import * as utility from "../../utility";
import { Alert } from "react-native";
import * as commonApi from "./commonApi";

import * as constant from '../../constants/keys'
import * as storage from "../../Asset/Utils/AsyncStore"

export const changeInternetState = isConnected => {
  console.log("0000000")
  return dispatch => {
    returnToDispatch(dispatch, INTERNET_STATE_CHANGED, isConnected);
  }
}

export const setAccessToken = accessToken => {
  console.log("1111111")
  return dispatch => {
    returnToDispatch(dispatch, SET_ACCESS_TOKEN, accessToken)
  }
}

export const loginPage = token => {
  console.log("22222222")
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
    case "B": // TokenDTO only
      return getQueryParam(obj)
    case "A": // No tokenDTO
      return getQueryParamTypeA(obj).slice(0, getQueryParamTypeA(obj).length - 1)
    case "C": // TokenDTO + Values
      return createQueryString(obj).replace(/%25/g, '%').slice(1)
    default:
      ""
  }
}
// export const commonQueryParam = (obj, queryObjType) => {
//   switch (queryObjType) {
//     case B:
//       return Object.keys(obj).reduce((prev, key, i) =>
//         (`${prev}${i !== 0 ? '%22,%22' : 'tokenDTO=%7B%22'}${key}%22:%22${obj[key]}${i == 4 ? '%22%7D' : ''}`), '?')
//     case A:
//       return getQueryParamTypeA(obj).slice(0, getQueryParamTypeA(obj).length - 1)
//     default:
//       ""
//   }
// }

const getQueryParamTypeA = (obj) => {
  return Object.keys(obj).reduce((prev, key, i) => (`${prev}${i !== 0 ? '' : ''}${key}=${obj[key]}&`), '?')
}

export const getQueryParam = (obj) => {
  return Object.keys(obj).reduce((prev, key, i) =>
    (`${prev}${i !== 0 ? '%22,%22' : 'tokenDTO=%7B%22'}${key}%22:%22${obj[key]}${i == 4 ? '%22%7D' : ''}`), '?')
}

// const getQueryParam = (url, obj) => {
//   return url + "?" + Object.keys(obj).reduce((prev, key, i) => (`${prev}${i !== 0 ? '&' : ''}${key}=${obj[key]}`), '');
// }

const getPathUrl = triggeredAction => {

  switch (triggeredAction) {

    case actionType.ipScreen.IP_CONFIG:
      return api.checkConfig

    case actionType.loginScreen.ON_LOGIN:
      return api.validateUser

    case actionType.loginScreen.ON_REGISTER:
      return api.registerGST

    case actionType.loginScreen.ON_SIGN_UP:
      return api.userSignUp

    default:
      return ""
  }
}

export const getSavedBaseUrl = () => {
  storage.getData(constant.keyIsBaseUrl)
    .then((gotUrl) => { api.baseUrl = gotUrl })
    .then(() => { return api.baseUrl })
}

const commonApiCall = (query, data, className, triggeredAction) => {

  return dispatch => {

    const gotUrl = storage.getData(constant.keyIsBaseUrl)
    setTimeout(() => { api.baseUrl = gotUrl._W }, 500)

    const joinedQuery = query === null ? "" : query
    const queryUrl = api.baseUrl + getPathUrl(triggeredAction) + joinedQuery

    console.log("queryUrl::: ", queryUrl)

    if (api.baseUrl == "") return alert("Base Url is Empty")
    if (api.baseUrl == undefined) return alert("Base Url is undefined")

    var headers = { "Content-Type": "application/json", "Access-Token": "" }

    commonApi
      .postDataApi(queryUrl, "", data, headers)
      .then(response => {

        let payload = {}
        payload = response.data
        // payload.accessToken = "someAccessToken"
        console.log("Api call success", JSON.stringify(payload))

        returnToDispatch(dispatch, actionType.apiResponse.API_SUCCESS, payload, className)
        // returnToScreenNavigation(dispatch, actionType.API_SUCCESS, className);
      })
      .catch(error => {
        alert(error)
        returnToDispatch(dispatch, actionType.apiResponse.API_FAILURE, error, className)
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
        Alert.alert("", alerts.UNAUTHENTIC_USER,
          [{ text: "OK", onPress: () => resetAsyncData(dispatch) }]
        )
      }
    } else if (error.message) {
      utility.showAlert(error.message)
    } else {
      utility.showAlert(JSON.stringify(error))
    }
  }, 500)
}

returnToDispatch = (dispatch, type, payload, className) => {
  dispatch({
    type: type,
    payload: payload,
    className: className
  })
}

returnToScreenNavigation = (dispatch, type, className) => {
  dispatch({
    type: type,
    className: className
  })
}


export default commonApiCall