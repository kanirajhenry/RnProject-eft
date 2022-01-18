import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import * as storage from "../asset/utils/asyncStore"
import * as constant from '../constants/keys'

import { useSelector, useDispatch } from 'react-redux'
import singleton from '../singleton/singleton'
import { commonGetApiCall, getSavedBaseUrl } from '../redux/actions/actions'
import * as actionType from "../redux/actions/actionTypes"
import { UserTokenDTO, DisplayAddressDTO } from '../model'
import validations from '../asset/libraries/validations'
import Snackbar from 'react-native-snackbar'
import { useIsFocused } from "@react-navigation/native"
import * as api from "../constants/api"
import { FiscalYearDTO } from '../model/fiscalYearDTO'

const Dashboard = () => {

    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userTokenDTO = useSelector(({ singletonReducer }) => singletonReducer.userTokenDTO)

    const [fiscalYearList, setFiscalYearList] = useState([]) // [{}]

    // TODO: BASECONTROLLER API CALLS
    const getDisplayAddress = singleton.sharedInstance.getDisplayAddress()
    const getFiscalYearList = singleton.sharedInstance.getFiscalYearList()

    useEffect(() => {

        if (isFocused) {
            (async () => {
                await storage.getData(constant.keyIsLoggedIn).then(isLoggedIn => {

                    if (!isLoggedIn) navigation.navigate("AuthStackScreen", { screen: "Login" }); return;

                    validations.snackBar("Successfully came to the Dashboard")
                    callSingletonApiCalls()

                }).catch(error => console.log(error))
            })()
        }
    }, [isFocused])

    const getDisplayAddressApiCall = () => {

        dispatch(commonGetApiCall(getDisplayAddress.queryItem, getDisplayAddress.data,
            actionType.controller.SINGLETON, actionType.singletonScreen.ON_GET_DISPLAY_ADDRESS)
        )

        let userTokenDto = new UserTokenDTO()
        userTokenDto = userTokenDTO

        switch (userTokenDto.responseCode) {
            case "1":
                validations.snackBar("Success singleton api call")
                let displayAddressDto = new DisplayAddressDTO()
                console.log(userTokenDto.response)
                displayAddressDto = JSON.parse(userTokenDto.response)
                // alert(displayAddressDto.signupType)
                break
            case "0":
                const errorMsg = userTokenDto.errorMessages
                validations.snackBar(errorMsg.length > 0 ? errorMsg[0] : "Api call failed")
            default: break
        }
    }

    const getFiscalYearListApiCall = () => {
        dispatch(commonGetApiCall(getFiscalYearList.queryItem, getFiscalYearList.data,
            actionType.controller.SINGLETON, actionType.singletonScreen.ON_GET_FISCAL_YEAR_LIST
        ))

        let userTokenDto = new UserTokenDTO()
        userTokenDto = userTokenDTO

        switch (userTokenDto.responseCode) {
            case "1":
                let fiscalYearDTO = new FiscalYearDTO()
                fiscalYearDTO = JSON.parse(userTokenDto.response)
                console.log("fiscalYearDTO------> ", fiscalYearDTO[0].toDate)
                setFiscalYearList(fiscalYearDTO)
                // alert(JSON.stringify(fiscalYearList))
                // alert(userTokenDto.response)
                break
            case "0":
                break
            default: break
        }
    }

    function callSingletonApiCalls() {

        // getDisplayAddressApiCall()
        getFiscalYearListApiCall()

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home</Text>
            {/* <Button title="navigation.navigate => Home2" onPress={() => navigation.navigate("Home2")} /> */}

            {/* 
                 FIXME: If we use class component < this.props.navigation.navigate > 
                 otherwise we can use v6 navigation directly in functional compont 
                */}

            {/* TODO: Class Component */}
            <Button title="this.props.navigation.navigate => Home2" onPress={() => this.props.navigation.navigate("Home2")} />
            <Button title="this.props.navigation.navigate => Home3" onPress={() => this.props.navigation.navigate("Home2")} />

            {/* TODO: Functional Component */}
            {/* <Button title="navigation.push => Home2" onPress={() => navigation.push("Home2")} />
                <Button title="navigation.push => Home3" onPress={() => navigation.push("Home3")} /> */}
            {/* <Button title="navigation.navigate => Home3" onPress={() => navigation.navigate("Home3")} /> */}
        </View>
    )
}

export default Dashboard