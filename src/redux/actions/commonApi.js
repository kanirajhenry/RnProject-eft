import { parse } from "@babel/core";
import axios from "axios";

export const getDataApi = (url, accessToken) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Access-Token"] = accessToken;
    axios
      .get(url)
      .then(response => {
        console.log("******************* 1")
        if (response !== null) {
          console.log("******************* 2")

          // var str = "{'a':1}";
          // str = str.replace(/'/g, '"')
          // obj = JSON.parse(str);
          // console.log(obj);

          let data = response.data
          let stringJSON = JSON.stringify(data)
          let parsedJson = JSON.parse(stringJSON)
          // alert(JSON.stringify(stringJSON))
          // alert(JSON.stringify(parsedJson))
          // alert(JSON.stringify(data))
          // console.log("===", data)

          TODO: // ***** START // Removed \ BackSlace in from data obj
          // let str = data.response.replace(/'/g, '')
          // obj = JSON.parse(str);
          // data.response = obj
          // console.log("===", data)
          // alert(JSON.stringify(data))
          // ******* END

          // data.response = str
          // alert(JSON.stringify(str))

          // console.log("******************* 3 ----> Data is", parsedJson)

          if (response.status === 200 && data !== null && Object.keys(data).length !== 0) {
            // console.log("******************* 333333333333 ----> Data is", data)
            resolve(response)


            if (data.status_code === 200) {
              console.log("******************* 4")
              resolve(response)
            }

          }
        } else {
          console.log("******************* 5")
          reject(response)
        }
      })
      .catch(error => {
        console.log("******************* 6")
        reject(error)
      })
  })
}

export const postDataApi = (url, AuthToken, body, headers) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, body, { headers: headers })
      .then(response => {
        if (response.status == 200) {
          resolve(response);
          // console.error("66", response.data.BankList)
        }

        if (response !== null) {
          let data = response.data;
          if (data !== null && Object.keys(data).length !== 0) {
            if (data.status_code === 200) {
              resolve(response);
            }
          }
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      })
  })
}

export const putDataApi = (url, AuthToken, body, headers) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, body, { headers: headers })
      .then(response => {
        if (response !== null) {
          let data = response.data;
          if (data !== null && Object.keys(data).length !== 0) {
            if (data.status_code === 200) {
              resolve(response);
            }
          }
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      })
  })
}
