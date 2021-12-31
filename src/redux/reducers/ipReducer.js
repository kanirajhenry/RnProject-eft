import { LoginDTO, UserTokenDTO } from "../../model"
import * as actionType from "../actions/actionTypes"

const ipInitialState = {
    loading: true,
    data: "",
    error: "",
    loginDTO: new LoginDTO(),
    forgetDTO: new LoginDTO(),
}

const ipReducer = (state = ipInitialState, action) => {

    switch (action.type) {
        case actionType.apiResponse.API_SUCCESS:
            console.log("<<<<<<<<---->>>>>>>> Called from Ip Reducer API_SUCCESS")
            switch (action.className) {
                case actionType.controller.IP:
                    console.log("<<<<<<<<---->>>>>>>> Called from Ip Reducer controller.IP")
                    return {
                        ...state, loading: false, error: action.payload.error, data: action.payload,
                    }

                case actionType.controller.LOGIN:
                    console.log("<<<<<<<<---->>>>>>>> Called from Ip Reducer controller.LOGIN")
                    switch (action.triggeredAction) {
                        case actionType.loginScreen.ON_LOGIN:
                            console.log("<<<<<<<<---->>>>>>>> Called from Ip Reducer <- triggeredAction -> loginScreen.ON_LOGIN")
                            return { ...state, loading: false, error: action.payload.error, data: "", loginDTO: action.payload }

                        case actionType.loginScreen.ON_FORGET_PASSWORD:
                            console.log("<<<<<<<<---->>>>>>>> Called from Ip Reducer <- triggeredAction -> loginScreen.ON_FORGET_PASSWORD")
                            return { ...state, loading: false, error: action.payload.error, data: "", forgetDTO: action.payload }
                        default:
                            return state
                    }
            }

        case actionType.apiResponse.API_FAILURE:
            console.log("<<<<<<<<---->>>>>>>> Called from Ip Reducer API_FAILURE", action.error)
            return { ...state, loading: false, error: action.error }

        default:
            console.log("<<<<<<<<---->>>>>>>> Called from Ip Reducer Default")
            return state
    }
}

export { ipReducer }
