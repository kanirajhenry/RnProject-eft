import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Text, View, StyleSheet, Button, Linking } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import * as actionType from '../redux/actions/actionTypes'
import commonApiCall, { commonQueryParam } from '../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as validation from "../asset/libraries/validations"

import * as storage from "../asset/utils/asyncStore"
import * as constant from "../constants/keys"
import { isFieldEmpty } from "../utility/index"

import { UserTokenDTO, LoginDTO } from "../model"

const LoginScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [savedUrl, setSavedUrl] = React.useState("")

    const loginData = useSelector(({ ipReducer }) => ipReducer.loginDTO)
    const forgotData = useSelector(({ ipReducer }) => ipReducer.forgetDTO)

    useLayoutEffect(() => { }, [])

    useEffect(() => {

        let isMounted = true // note mutable flag

        getInitialData()

        if (isFocused) {
            getInitialData()
        }

        return () => { isMounted = false }

    }, [isFocused])

    const getInitialData = async () => {

        storage.getData(constant.keyIsBaseUrl)
            .then((gotUrl) => { setSavedUrl(gotUrl) })

        console.log("savedUrl: from Login screen", savedUrl)
    }

    const handleLogin = () => {

        const loginDto = new LoginDTO()
        loginDto.cmpCode = "RGS".toUpperCase()
        loginDto.userId = "admin".toUpperCase()
        loginDto.orgCode = "naeft".toUpperCase()
        loginDto.password = "Pass@1234"
        loginDto.deviceToken = "ci0MHp4n6yw:APA91bF93ekDVFw1PcM_IlclLIlhGtTNy5XP-UDeX-cbgbG60wxuD1IpVDUDcfw72HGUqdAiSMI3SjDwcARU-DY8In9EEbr8QVdiECjGrxfWG5QmNrgx40pXQgEARs_OqfH5klYjMKeO"

        if (isFieldEmpty(savedUrl) || savedUrl == undefined) return alert("Please configure your Url")

        dispatch(commonApiCall(null, loginDto, actionType.controller.LOGIN, actionType.loginScreen.ON_LOGIN))

        setTimeout(() => {
            afterCompletedApicall()
        }, 100)

    }

    const handleForgetPassword = () => {

        let tokenDTO = new UserTokenDTO()
        tokenDTO.cmpCode = "RGS"
        tokenDTO.orgCode = "???".toUpperCase()
        tokenDTO.userId = "???".toUpperCase()

        const query = commonQueryParam(tokenDTO, "B")

        dispatch(commonApiCall(query, {}, actionType.controller.LOGIN, actionType.loginScreen.ON_FORGET_PASSWORD))

        setTimeout(() => {
            let forgetResult = new LoginDTO()
            forgetResult = forgotData
            console.log("result.deviceToken : ----###############---->>>>>", forgetResult.response)
            alert(JSON.stringify(forgetResult.response))
        }, 1000)
    }

    const afterCompletedApicall = () => {

        console.log(JSON.stringify(loginData))
        console.log(loginData.message)

        let loginResult = new LoginDTO()
        loginResult = loginData

        console.log("result.deviceToken : ----###############---->>>>>", loginResult)
        if (!loginResult.isValid) return alert(loginResult.message);
        
        navigation.goBack();
    }

    const handleOpenUrl = () => {
        const url = "https://www.youtube.com/watch?v=3zpLRYzp9oU"
        if (Linking.canOpenURL(url)) return Linking.openURL(url)
        alert("Sorry could not able to open link...")
    }

    console.log("savedUrl +++++++++++++++++->", savedUrl)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {savedUrl == "" || savedUrl == undefined ? null : <Text style={{ fontSize: 25, marginBottom: 25 }}>Configured IP {savedUrl} </Text>}
            <Text style={{ fontSize: 45 }}> Login Page</Text>
            <Button title="Login" onPress={() => handleLogin()} />
            <Button title="Forget Password ?" onPress={() => handleForgetPassword()} />
            <Button title="Tutorial <#> Ip Configuration" onPress={() => handleOpenUrl()} />
        </View>
    )

}

export default LoginScreen