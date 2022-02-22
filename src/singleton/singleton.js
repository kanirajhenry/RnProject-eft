
import React from "react"
import { tokenId } from "../asset/utils/asyncStore"
import { UserTokenDTO } from "../model"
import { commonGetApiCall, commonQueryParam } from "../redux/actions/actions"
import * as storage from "../asset/utils/asyncStore"
import * as constant from "../asset/constants/keys"
import * as api from "../asset/constants/api"

export default class Singleton extends React.Component {

    static sharedInstance = Singleton.sharedInstance || new Singleton()

    getTokenDTO() {
        return commonQueryParam(api.tokenDTO, "B")
    }
}
