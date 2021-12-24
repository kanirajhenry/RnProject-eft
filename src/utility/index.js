import { Platform, Alert } from "react-native"
import { Dimensions } from "react-native"
import * as titles from "../constants/title"

export const getDeviceWidth = () => {
  return Math.round(Dimensions.get("window").width)
}
export const getDeviceHeight = () => {
  return Math.round(Dimensions.get("window").height)
}

export const getPageLimit = () => {
  return 10
}

export const isFieldEmpty = text => {
  return text == "" ? true : false
}

export const isValidUrl = (userInput) => {
  var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res == null) ? false : true
}

export const getUrl = ($url) => {
  var url = $url.split('//')
  if (url[0] === "http:" || url[0] === "https:") {
    var protocol = url[0] + "//"
    var host = url[1].split('/')[0]
    url = protocol + host
    var path = $url.split(url)[1]
    var erpPath = path.split("?")[0]
    return {
      protocol: protocol,
      host: host,
      path: path,
      erpPath: erpPath
    }
  } else {
    return {
      protocol: undefined,
      host: undefined,
    }
  }
}

export const isValidEmail = email => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (reg.test(email) === true) {
    return true
  }
  return false
}

export const isValidPhoneNumber = phoneNo => {
  return phoneNo.length < 8 ? false : true
}

export const isValidComparedPassword = (password, confirmPassword) => {
  return password == confirmPassword ? true : false
}

export const getOS = () => {
  return Platform.OS === "ios" ? "ios" : "android"
}

export const showAlert = message => {
  Alert.alert(
    titles.APP_NAME,
    message,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  )
}

export const showAlertWithCallBack = (msg, onOkClick) => {
  Alert.alert(
    "",
    msg,
    [
      {
        text: "OK",
        onPress: () => {
          console.log(" CLICK CALLED ")
          onOkClick()
        }
      }
    ],
    {
      cancelable: false
    }
  )
}
