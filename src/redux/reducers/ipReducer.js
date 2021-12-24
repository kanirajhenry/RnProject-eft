import { Alert } from "react-native"
import { act } from "react-test-renderer"
import * as actionType from "../actions/actionTypes"

const initialState = {

    loading: true,
    data: "",
    error: "",

    // LOGIN
    loginObjData: {}
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
                    return {
                        ...state, loading: false, error: action.payload.error, data: "",
                         loginObjData: action.payload
                    }
            }

        case actionType.apiResponse.API_FAILURE:
            console.log("Failed From Reducer ---->>>>>>>>", action.error)
            return { ...state, loading: false, error: action.error }

        default:
            return state
    }
}
