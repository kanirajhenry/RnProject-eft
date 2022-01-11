// import * as dataModel from "../../model"
import { UserTokenDTO, DisplayAddressDTO } from "../../model"
import * as actionType from "../actions/actionTypes"

const singletonInitialState = {
    loading: true,
    data: "",
    error: "",
    userTokenDTO: {},
    displayAddressDTO: {}
}

export const singletonReducer = (state = singletonInitialState, action) => {
    switch (action.type) {
        case actionType.apiResponse.API_SUCCESS:

            switch (action.triggeredAction) {
                case actionType.singletonScreen.ON_GET_DISPLAY_ADDRESS:
                    console.log("=-=-=-=-=-=-=-=-==-=@@@@@@@@@@", action.payload)
                    return {
                        ...state, loading: false, error: action.payload.error, data: action.payload,
                        userTokenDTO: action.payload,
                    }
                default:
                    return { data: "Not Success from default singletonReducer" }
            }

        case actionType.apiResponse.API_FAILURE:
            return { data: "API_FAILURE singletonReducer" }
        default:
            return state
    }
}

