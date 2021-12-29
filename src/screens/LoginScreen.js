import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import * as actionType from '../redux/actions/actionTypes'
import commonApiCall from '../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'

import * as storage from "../Asset/Utils/AsyncStore"
import * as constant from "../constants/keys"
import { isFieldEmpty } from "./../utility/index"

// import { UserDTO } from '../model/userDTO'
// import { Friends } from '../model/userDTO'
// import { TokenDTO } from '../model/tokenDTO'
// import { LoginDetails } from '../model/loginDetails'

import {
    UserDTO,
    Friends,
    TokenDTO,
    LoginDetails
} from "../model"

const LoginScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [savedUrl, setSavedUrl] = React.useState("")

    const loginData = useSelector(({ ipReducer }) => ipReducer.loginObjData)

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

        const user = new UserDTO()
        const friend = new Friends()

        friend.name = "kani"
        friend.place = "Covai"

        const friendsList = [
            new Friends("f1", "place1"),
            new Friends("f2", "place2"),
            new Friends("f3", "place3"),
            new Friends("f4", "place4"),
        ]

        const newFriendsList = [...friendsList, friend]

        user.email = "kanirajhenry13@gmail.com"
        user.mobile = "989889898989"
        user.friends = newFriendsList

        // console.log(
        // "getCallingMethods: ", user.getTitle(),
        // "MODEL ", user
        // )

        const loginModel = new LoginDetails()
        loginModel.cmpCode = "RGS".toUpperCase()
        loginModel.userId = "admin".toUpperCase()
        loginModel.orgCode = "naeft".toUpperCase()
        loginModel.password = "Pass1234"
        loginModel.deviceToken = "ci0MHp4n6yw:APA91bF93ekDVFw1PcM_IlclLIlhGtTNy5XP-UDeX-cbgbG60wxuD1IpVDUDcfw72HGUqdAiSMI3SjDwcARU-DY8In9EEbr8QVdiECjGrxfWG5QmNrgx40pXQgEARs_OqfH5klYjMKeO"

        if (isFieldEmpty(savedUrl) || savedUrl == undefined) return alert("Please configure your Url")

        dispatch(commonApiCall(null, loginModel, actionType.controller.LOGIN, actionType.loginScreen.ON_LOGIN))

        setTimeout(() => {
            afterCompletedApicall()
        }, 100)

    }

    const afterCompletedApicall = () => {

        // console.log(JSON.stringify(loginData))
        // console.log(loginData.message)

        let result = new LoginDetails()
        result = loginData
        // console.log("result.deviceToken : ###############", result)

        if (result.isValid) return alert("Login Success Dood...")
        // navigation.goBack()
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