// import * as dataModel from "../../model"
import { getFiscalYearList } from "../../constants/api"
import { UserTokenDTO, DisplayAddressDTO, FiscalYearDTO } from "../../model"
import {  } from "../../model/fiscalYearDTO"
import * as actionType from "../actions/actionTypes"

const singletonInitialState = {
    loading: true,
    data: "",
    error: "",

    userTokenDTO: {},
    displayAddressDTO: {},
    fiscalYearDTO: {}
}

export const singletonReducer = (state = singletonInitialState, action) => {
    switch (action.type) {
        case actionType.apiResponse.API_SUCCESS:

            switch (action.triggeredAction) {
                case actionType.singletonScreen.ON_GET_DISPLAY_ADDRESS:
                    console.log("=-=-=-=-=-=-=-=-==-=@@@@@@@@@@=ON_GET_DISPLAY_ADDRESS", action.payload)
                    return {
                        ...state, loading: false, error: action.payload.error, data: action.payload,
                        userTokenDTO: action.payload,
                    }
                case actionType.singletonScreen.ON_GET_FISCAL_YEAR_LIST:
                    console.log("=-=-=-=-=-=-=-=-==-=@@@@@@@@@@=ON_GET_FISCAL_YEAR_LIST", action.payload)
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

