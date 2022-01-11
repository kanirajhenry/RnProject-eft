import * as dataModel from "../../model"
import { CommonDataModel } from "./../../model"
import * as actionType from "../actions/actionTypes"

const participantInitialState = {
    loading: true,
    data: "",
    error: "",
    // commonDataModel: new CommonDataModel()
    // commonDataModel: new dataModel.CommonDataModel()
    commonDataModel: {}
}

const participantReducer = (state = participantInitialState, action) => {
    switch (action.type) {
        case actionType.apiResponse.API_SUCCESS:
            console.log("<<<<<<<<---->>>>>>>> Called from Participant API_SUCCESS")

            switch (action.triggeredAction) {
                case actionType.participantScreen.ON_CREATE_PARTICIPANT:
                    console.log("<<<<<<<<---->>>>>>>> Called from Participant ON_CREATE_PARTICIPANT")
                    return {
                        ...state, loading: false, error: action.payload.error, data: action.payload,
                        commonDataModel: action.payload, 
                    }
                default:
                    console.log("<<<<<<<<---->>>>>>>> Called from Participant Success default")
                    return { data: "Not Success" }
            }

        case actionType.apiResponse.API_FAILURE:
            console.log("<<<<<<<<---->>>>>>>> Called from Participant API_FAILURE")
            return { data: "Not Success" }
        default:
            console.log("<<<<<<<<---->>>>>>>> Called from Participant default")
            return state
    }
}

// TODO: // Working Perfect

// const participantReducer = (state = participantInitialState, action) => {
//     switch (action.type) {
//         case actionType.apiResponse.API_SUCCESS:
//             console.log("<<<<<<<<---->>>>>>>> Called from Participant API_SUCCESS")
//             switch (action.className) {
//                 case actionType.controller.PARTICIPANT:
//                     switch (action.triggeredAction) {

//                         case actionType.participantScreen.ON_CREATE_PARTICIPANT:
//                             console.log("<<<<<<<<---->>>>>>>> Called from Participant ON_CREATE_PARTICIPANT")
//                             return { data: "Success bro" }
//                         default:
//                             console.log("<<<<<<<<---->>>>>>>> Called from Participant Success default")
//                             return { data: "Not Success bro" }

//                     }
//                 default: return ""
//             }
//         case actionType.apiResponse.API_FAILURE:
//             console.log("<<<<<<<<---->>>>>>>> Called from Participant API_FAILURE")
//             return { data: "Not Success bro" }
//         default:
//             console.log("<<<<<<<<---->>>>>>>> Called from Participant default")
//             return state
//     }
// }

export { participantReducer }