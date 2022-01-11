import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import * as storage from "../asset/utils/asyncStore"
import { getToken } from "../asset/utils/asyncStore"
import { keyIsBaseUrl, keyIsLoggedIn, keyIsOrgCode } from '../constants/keys'

import { useSelector, useDispatch } from 'react-redux'
import Controller from '../singleton/singleton'
import { commonGetApiCall, getSavedBaseUrl } from '../redux/actions/actions'
import * as actionType from "../redux/actions/actionTypes"
import { UserTokenDTO, DisplayAddressDTO } from '../model'
import { Validations } from '../asset/libraries/validations'
import Snackbar from 'react-native-snackbar'
import { useIsFocused } from "@react-navigation/native"
import * as api from "../constants/api"


const HomeScreen1 = () => {

    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userTokenDTO = useSelector(({ singletonReducer }) => singletonReducer.userTokenDTO)

    // TODO: BASECONTROLLER API CALLS
    const getDisplayAddress = Controller.sharedInstance.getDisplayAddress()

    function getDisplayAddressApiCall() {
        dispatch(commonGetApiCall(getDisplayAddress.queryItem, getDisplayAddress.data, actionType.controller.SINGLETON, actionType.singletonScreen.ON_GET_DISPLAY_ADDRESS))

        let userTokenDto = new UserTokenDTO()
        userTokenDto = userTokenDTO

        // if (userTokenDto.responseCode === "1") {
        //     console.warn("Success baseController api call")
        //     let displayAddressDto = new DisplayAddressDTO()
        //     console.warn(userTokenDto.response)
        //     displayAddressDto = JSON.parse(userTokenDto.response)
        //     console.warn("------>>>><<<<<<<", displayAddressDTO)
        // } else if (userTokenDto.responseCode === "0") {
        //     const errorMsg = userTokenDto.errorMessages
        //     Validations.snackBar(errorMsg.length > 0 ? errorMsg[0] : "Api call failed")
        // }
    }

    useEffect(() => {

        if (isFocused) {
            (async () => {
                const isLoggedIn = await storage.getData(keyIsLoggedIn)
                if (!isLoggedIn) { navigation.navigate("AuthStackScreen", { screen: "Login" }); return }
                Validations.snackBar("Successfully came to the Dashboard")
            })()
        }
    }, [isFocused])

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

export default HomeScreen1