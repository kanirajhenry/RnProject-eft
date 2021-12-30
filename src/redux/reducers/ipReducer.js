import { Alert } from "react-native"
import { act } from "react-test-renderer"
import { LoginDTO, UserTokenDTO } from "../../model"
import * as actionType from "../actions/actionTypes"

const initialState = {

    loading: true,
    data: "",
    error: "",

    loginDTO: new LoginDTO(),
    forgetDTO: new LoginDTO(),

}

export default function ipReducer(state = initialState, action) {

    switch (action.type) {

        case actionType.apiResponse.API_SUCCESS:

            switch (action.className) {

                case actionType.controller.IP:
                    return {
                        ...state, loading: false, error: action.payload.error, data: action.payload,
                    }

                case actionType.controller.LOGIN:

                    switch (action.triggeredAction) {
                        case actionType.loginScreen.ON_LOGIN:
                            alert("login action called")
                            return {
                                ...state, loading: false, error: action.payload.error, data: "",
                                loginDTO: action.payload,
                            }

                        case actionType.loginScreen.ON_FORGET_PASSWORD:
                            alert("Forget action called")
                            return {
                                ...state, loading: false, error: action.payload.error, data: "",
                                forgetDTO: action.payload,
                            }

                        default:
                            return state
                    }

                // =========================================


                // case actionType.controller.LOGIN: case actionType.loginScreen.ON_FORGET_PASSWORD:
                //     alert("Forget tapped ******----->")
                //     return {
                //         ...state, loading: false, error: action.payload.error, data: "",
                //         loginDTO: action.payload,
                //     }

                // case actionType.controller.LOGIN: case actionType.loginScreen.ON_LOGIN:
                //     alert("Login Tapped #########----->")
                //     return {
                //         ...state, loading: false, error: action.payload.error, data: "",
                //         loginDTO: action.payload,
                //     }

                //     default: alert("Hell Boy")

            }

        case actionType.apiResponse.API_FAILURE:
            console.log("Failed From Reducer ---->>>>>>>>", action.error)
            return { ...state, loading: false, error: action.error }

        default:
            return state
    }
}
