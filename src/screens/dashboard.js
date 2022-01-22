import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import * as storage from "../asset/utils/asyncStore"
import * as constant from '../constants/keys'

import { useSelector, useDispatch } from 'react-redux'
import singleton from '../singleton/singleton'
import { commonGetApiCall, commonQueryParam, getQuerUrl, getSavedBaseUrl } from '../redux/actions/actions'
import * as actionType from "../redux/actions/actionTypes"
import { UserTokenDTO, DisplayAddressDTO, GstinSettingDTO, InventoryDTO } from '../model'
import validations from '../asset/libraries/validations'
import Snackbar from 'react-native-snackbar'
import { useIsFocused } from "@react-navigation/native"
import * as localData from "../constants/sharedpreference"
import { FiscalYearDTO } from "../model/fiscalYearDTO"
import axios from 'axios'

const Dashboard = () => {

    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const userTokenDTO = useSelector(({ singletonReducer }) => singletonReducer.userTokenDTO)
    const fiscalYear = useSelector(({ singletonReducer }) => singletonReducer.fiscalYearDTO)
    const displayAddressDTO = useSelector(({ singletonReducer }) => singletonReducer.displayAddressDTO)
    const gstinSettingDTO = useSelector(({ singletonReducer }) => singletonReducer.gstinSettingDTO)

    const [fiscalYearList, setFiscalYearList] = useState([]) // [{}]
    const [displayAddress, setDisplayAddress] = useState({})

    useEffect(() => {

        if (isFocused) {
            (async () => {
                await storage.getData(constant.keyIsLoggedIn).then(isLoggedIn => {
                    console.log("isLoggedIn >>>>>", isLoggedIn)
                    if (!isLoggedIn) {
                        navigation.navigate("AuthStackScreen", { screen: "Login" })
                        return
                    }

                    validations.snackBar("Successfully came to the Dashboard")
                    callSingletonApiCalls()

                }).catch(error => console.log(error))
            })()
        }
    }, [isFocused])

    const getFiscalYearApiCall = () => {

        const queryUrl = getQuerUrl(localData.getTokenDTO(), null, actionType.singletonScreen.ON_GET_FISCAL_YEAR)

        alert(queryUrl)

        axios.get(queryUrl).then(response => {
            switch (response.status) {
                case 200:
                    let userToken = new UserTokenDTO()
                    userToken = response.data
                    const responseCode = userToken.responseCode
                    switch (responseCode) {
                        case "1":
                            let inventoryDto = new InventoryDTO()
                            inventoryDto.orgCode = localData.tokenDTO.orgCode
                            inventoryDto.cmpCode = localData.tokenDTO.cmpCode
                            alert(JSON.stringify(inventoryDto))
                            break;
                        case "0": alert("status code is ONE : 0"); break;
                        default: break
                    }
                    break
                default: alert("getFiscalYearApiCall () FAILED")
            }
        })

    }

    const getGstinDataListApiCall = () => {

        dispatch(commonGetApiCall(localData.getTokenDTO(), null,
            actionType.controller.SINGLETON, actionType.singletonScreen.ON_GET_GSTIN_DATA_LIST)
        )

        let userTokenDto = new UserTokenDTO()
        userTokenDto = userTokenDTO
        console.log("&&&&&&&&&&&&&&&&&&& getGstinDataList", userTokenDTO)

        switch (userTokenDto.responseCode) {
            case "1":
                validations.snackBar("Success singleton localData call")
                let gstinSettingDto = new GstinSettingDTO()
                console.log("", userTokenDto.response)
                gstinSettingDto = JSON.parse(userTokenDto.response)
                console.log("gstinSettingDto------> ", gstinSettingDto)
                break
            case "0":
                const errorMsg = userTokenDto.errorMessages
                validations.snackBar(errorMsg.length > 0 ? errorMsg[0] : "Api call failed")
            default: break
        }

    }

    const getDisplayAddressApiCall = () => {

        dispatch(commonGetApiCall(localData.getTokenDTO(), null,
            actionType.controller.SINGLETON, actionType.singletonScreen.ON_GET_DISPLAY_ADDRESS)
        )

        let userTokenDto = new UserTokenDTO()
        userTokenDto = userTokenDTO
        console.log("&&&&&&&&&&&&&&&&&&& getDisplayAddressApiCall", userTokenDTO)

        switch (userTokenDto.responseCode) {
            case "1":
                validations.snackBar("Success singleton localData call")
                let displayAddressDto = new DisplayAddressDTO()
                console.log("", userTokenDto.response)
                displayAddressDto = JSON.parse(userTokenDto.response)
                console.log("displayAddressDto------> ", displayAddressDto)
                // alert(displayAddressDto.signupType)
                break
            case "0":
                const errorMsg = userTokenDto.errorMessages
                validations.snackBar(errorMsg.length > 0 ? errorMsg[0] : "Api call failed")
            default: break
        }
    }

    const getFiscalYearListApiCall = () => {

        dispatch(commonGetApiCall(localData.getTokenDTO(), null,
            actionType.controller.SINGLETON, actionType.singletonScreen.ON_GET_FISCAL_YEAR_LIST)
        )

        let userTokenDto = new UserTokenDTO()
        userTokenDto = userTokenDTO

        console.log("&&&&&&&&&&&&&&&&&&& getFiscalYearListApiCall", userTokenDTO)
        console.log("----------------------------------------2", userTokenDTO)
        console.log("----------------------------------------3", fiscalYear)

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

        getFiscalYearApiCall()
        // getGstinDataListApiCall()
        // getDisplayAddressApiCall()
        // getFiscalYearListApiCall()

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