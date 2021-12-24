import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import * as actionType from '../redux/actions/actionTypes'
import commonApiCall from '../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'

import * as storage from "../Asset/Utils/AsyncStore"
import * as constant from "../constants/keys"
import { isFieldEmpty } from "./../utility/index"

const LoginScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [savedUrl, setSavedUrl] = React.useState("")

    const loginData = useSelector(({ ipReducer }) => ipReducer.loginObjData)

    useEffect(() => {

        if (isFocused) {
            getInitialData()
        }

    }, [isFocused])

    const getInitialData = async () => {

        storage.getData(constant.keyIsBaseUrl)
            .then((gotUrl) => { setSavedUrl(gotUrl) })

        console.log("savedUrl: from Login screen", savedUrl)
    }

    const handleLogin = () => {

        if (isFieldEmpty(savedUrl) || savedUrl == undefined) return alert("Please configure your Url")

        const tokenDTO = {
            "cmpCode": "RGS",
            "userId": "ADMIN",
            "orgCode": "NAEFT",
            "password": "Pass1234",
            "deviceToken": "ci0MHp4n6yw:APA91bF93ekDVFw1PcM_IlclLIlhGtTNy5XP-UDeX-cbgbG60wxuD1IpVDUDcfw72HGUqdAiSMI3SjDwcARU-DY8In9EEbr8QVdiECjGrxfWG5QmNrgx40pXQgEARs_OqfH5klYjMKeO"
        }

        dispatch(commonApiCall(null, tokenDTO, actionType.controller.LOGIN, actionType.loginScreen.ON_LOGIN))

        setTimeout(() => {
            afterCompletedApicall()
        }, 500)

    }

    const afterCompletedApicall = () => {

        console.log(JSON.stringify(loginData))
        console.log(loginData.message)
        navigation.goBack()
    }

    console.log("savedUrl +++++++++++++++++->", savedUrl)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {savedUrl == "" || savedUrl == undefined ? null : <Text style={{ fontSize: 25, marginBottom: 25 }}>Configured IP {savedUrl} </Text>}
            <Text style={{ fontSize: 45 }}> Login Page</Text>
            <Button title="Login" onPress={() => handleLogin()}></Button>
        </View>
    )
}

export default LoginScreen