import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import {
    Text, Switch, View, Image, StyleSheet,
    Button, Linking, PixelRatio, FlatList, TextInput,
    TouchableOpacity, SafeAreaView, StatusBar, Platform, Dimensions, ActivityIndicator, Alert
} from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import * as actionType from '../../../redux/actions/actionTypes'
import commonApiCall, { commonQueryParam } from '../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import validations from '../../../asset/libraries/validations'

import * as storage from "../../../asset/utils/asyncStore"
import * as constant from "../../../asset/constants/keys"
import * as appImage from "../../../asset/constants/images"
import { isFieldEmpty } from "../../../asset/utility"
import singleton from '../../../singleton/singleton'
import * as localData from "../../../asset/constants/sharedpreference"
import axios from 'axios'
import { UserTokenDTO, LoginDTO } from "../../../model"

import { Cell, Section, TableView, Separator } from 'react-native-tableview-simple'
import * as appColor from '../../../asset/constants/colors'
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon1 from 'react-native-vector-icons/Feather'

import SegmentedControl from "rn-segmented-control"
import RoundButton from '../../../common/component/roundedButton/roundButton'

import {
    fontsize, color, fontfamily,
    width, height, wp, hp, listenOrientationChange
} from '../../../asset/libraries/fontsAndColors'

import { useOrientation } from '../../../asset/utility/useOrientation'

const LoginScreen = ({ navigation, route }) => {

   console.log(useOrientation)

    const [objLogin, setObjLogin] = useState({ title: "LOGIN", buttonTitle: "Login", description: "Already have an account? Let's Login." })
    const [tabIndex, setTabIndex] = useState(0)
    const [loginSwitch, setLoginSwitch] = useState(false)
    const [signUpSwitch, setSignUpSwitch] = useState(false)

    const loginFiedData = [
        { id: 101, title: "User ID" + " *", color: 'red', image: appImage.user, value: "", inputRef: useRef(null) },
        { id: 102, title: "Password *", color: 'red', image: appImage.password, value: "", inputRef: useRef(null) },
        { id: 103, title: "OrgCode *", color: 'red', image: appImage.organization, value: "".toUpperCase(), inputRef: useRef(null) },
    ]

    const signUpFieldData = [
        { id: 101, title: "User ID" + " *", color: 'red', image: appImage.user, value: "", inputRef: useRef(null) },
        { id: 102, title: "Password *", color: 'red', image: appImage.password, value: "", inputRef: useRef(null) },
        { id: 103, title: "OrgCode *", color: 'red', image: appImage.organization, value: "".toUpperCase(), inputRef: useRef(null) },
        { id: 104, title: "Email", color: appColor.oceanGreen, image: appImage.email, value: "", inputRef: useRef(null) },
        { id: 105, title: "Phone Number", color: appColor.oceanGreen, image: appImage.phoneNumber, value: "", inputRef: useRef(null) },
    ]

    const mainData = [{
        sectionId: 1,
        sectionTitle: objLogin.title,
        sectionFooter: objLogin.description,
        sectionData: isLogIn ? loginFiedData : signUpFieldData
    }]

    const [isLogIn, setIsLogin] = useState(true)

    const [isTermsCheckMarkEnabled, setIsTermsCheckMarkEnabled] = useState(false)

    const [data, setData] = useState(mainData)

    let loginPage = false

    const handleTabsChange = (index) => {

        setTabIndex(index)

        switch (index) {
            case 0:
                loginPage = true
                setIsLogin(true)
                setObjLogin({ title: "LOGIN", buttonTitle: "Login", description: "Already have an account? Let's Login." })
                setData(mainData)
                break
            case 1:
                loginPage = false
                setIsLogin(false)
                setObjLogin({ title: "SIGN UP", buttonTitle: "Sign Up", description: "Don't have an account Lets start up with new SignUp" })
                setData(mainData)
                break
        }

        clearFields()
    }

    console.log("***", data)

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [savedUrl, setSavedUrl] = React.useState("")

    const loginData = useSelector(({ ipReducer }) => ipReducer.loginDTO)
    const forgotData = useSelector(({ ipReducer }) => ipReducer.forgetDTO)

    useLayoutEffect(() => {
        setTabIndex(tabIndex)
        switch (tabIndex) {
            case 0: { setLoginSwitch(true); setSignUpSwitch(false) }; break
            case 1: { setLoginSwitch(false); setSignUpSwitch(true) }; break
        }
    }, [])

    useEffect(() => {

        let isMounted = true // note mutable flag

        getInitialData()

        if (isFocused) {
            getInitialData()
        }

        return () => {
            // alert("Called from login useEffect UnMount")
            clearFields()
            setupDefaultSwitch()
            isMounted = false
        }

    }, [isFocused])

    const getInitialData = async () => {
        // (async () => { setSavedUrl(await storage.getData(constant.keyIsBaseUrl)) })()
        (async () => await storage.getData(constant.keyIsBaseUrl)
            .then(localBaseUrl => setSavedUrl(localBaseUrl))
            .catch(error => console.log(error))
        )()
        console.log("savedUrl: from Login screen", savedUrl)
    }

    const setupDefaultSwitch = () => {
        setTabIndex(0)
        setLoginSwitch(true); setSignUpSwitch(false)
    }

    const [isFormSubmit, setIsFormSubmit] = useState(false)

    const handleLogin = () => {

        if (isFieldEmpty(savedUrl) || savedUrl == undefined || savedUrl === null) return alert("Please configure your Url")
        if (!isTermsCheckMarkEnabled) alert("Please accept the Terms and Conditions")

        storage.setData(constant.keyIsBaseUrl, savedUrl)

        loginDto = new LoginDTO()

        let formId = 100
        // let isFormSubmit = false

        let someUserId = ""
        let somePassword = ""
        let someOrgCode = ""

        data.forEach((element, index, array) => {
            const sectionData = element.sectionData

            // sectionData.forEach((item, i, arr) => {
            //     if (item.id == 101 && item.value == '') return alert("Please enter User ID"); setIsFormSubmit(false); return
            //     if (item.id == 102 && item.value == '') return alert("Please enter Password"); setIsFormSubmit(false); return
            //     if (item.id == 103 && item.value == '') return alert("Please enter OrgCode"); setIsFormSubmit(false); retur
            // })

            switch (element.sectionId) {
                case 1:
                    sectionData.forEach((item, i, arr) => {
                        switch (item.id) {
                            case 101:
                                someUserId = item.value.toUpperCase()
                                loginDto.userId = item.value.toUpperCase()
                            case 102:
                                somePassword = item.value.toUpperCase()
                                loginDto.password = item.value
                            case 103:
                                someOrgCode = item.value.toUpperCase()
                                loginDto.orgCode = item.value.toUpperCase()
                            case 104:
                                console.log("")
                            case 105:
                                console.log("")
                            default:
                                loginDto.cmpCode = "RGS"
                                loginDto.deviceToken = "ci0MHp4n6yw:APA91bF93ekDVFw1PcM_IlclLIlhGtTNy5XP-UDeX-cbgbG60wxuD1IpVDUDcfw72HGUqdAiSMI3SjDwcARU-DY8In9EEbr8QVdiECjGrxfWG5QmNrgx40pXQgEARs_OqfH5klYjMKeO"
                        }
                    })
                default: break
            }
        })

        // if (isFieldEmpty(someUserId)) return alert("Please enter User Id")
        // if (isFieldEmpty(somePassword)) return alert("Please enter Password")
        // if (isFieldEmpty(someOrgCode)) return alert("Please enter OrgCode")

        // TODO: Navigate to Dashboard without validation for testing purpose
        storage.setData(constant.keyIsLoggedIn, true)
        navigation.navigate("TabsScreen", { screen: 'HomeStackScreen' })

        // TODO: - Login API Call
        // dispatch(commonApiCall(null, loginDto, actionType.containers.LOGIN, actionType.loginContainer.ON_LOGIN))
        // setTimeout(() => { afterCompletedApicall() }, 1000)

    }

    const afterCompletedApicall = () => {

        console.log("afterCompletedApicall ***", JSON.stringify(loginData))
        console.log(loginData.message)

        let loginResult = new LoginDTO()
        loginResult = loginData

        const deviceId = "ci0MHp4n6yw:APA91bF93ekDVFw1PcM_IlclLIlhGtTNy5XP-UDeX-cbgbG60wxuD1IpVDUDcfw72HGUqdAiSMI3SjDwcARU-DY8In9EEbr8QVdiECjGrxfWG5QmNrgx40pXQgEARs_OqfH5klYjMKeO"

        console.log("result.deviceToken : ----###############---->>>>>", loginResult)

        switch (loginResult.isValid) {
            case true:
                // Have to set local stoage for entire app usage
                storage.setData(constant.keyIsOrgCode, loginResult.orgCode)
                storage.setData(constant.keyIsUserId, loginResult.userId)
                storage.setData(constant.keyIsEmailId, loginResult.emailId)
                storage.setData(constant.keyIsPassword, loginResult.password)
                storage.setData(constant.keyIsBranch, loginResult.branch)
                storage.setData(constant.keyIsCmpCode, loginResult.cmpCode)
                storage.setData(constant.keyIsName, loginResult.name)
                storage.setData(constant.keyIsRoleCode, loginResult.roleCode)
                storage.setData(constant.keyIsUserPrivileges, loginResult.userPrivileges)
                storage.setData(constant.keyIsEmployeeCode, loginResult.employeeCode)
                storage.setData(constant.keyIsTokenId, loginResult.tokenId)
                storage.setData(constant.keyIsPasswordExpDate, loginResult.passwordExpDate)
                storage.setData(constant.keyIsLicensePortalMap, loginResult.licensePortalMap)
                storage.setData(constant.keyIsDeviceId, deviceId)

                storage.setData(constant.keyIsLoggedIn, true)

                validations.snackBar(loginResult.message)
                // navigation.goBack()
                navigation.navigate("TabsScreen", { screen: 'HomeStackScreen' })
                break
            case false:
                validations.snackBar(loginResult.message, "DISMISS")
                break

            default: break
        }
    }

    const clearFields = () => {
        data.forEach((element, index, array) => element.sectionData.forEach((e, i, arr) => { e.value = "" }))
        // data.forEach((element, index, array) => {
        //     element.sectionData.forEach((e, i, arr) => {
        //         e.value = ""
        //     })
        // })
        setData(mainData)
    }

    const handleForgetPassword = () => {

        let tokenDTO = new UserTokenDTO()
        tokenDTO.cmpCode = "RGS"
        tokenDTO.orgCode = "???".toUpperCase()
        tokenDTO.userId = "???".toUpperCase()

        const query = commonQueryParam(tokenDTO, "B")

        dispatch(commonApiCall(query, {}, actionType.containers.LOGIN, actionType.loginContainer.ON_FORGET_PASSWORD))

        setTimeout(() => {
            let forgetResult = new LoginDTO()
            forgetResult = forgotData
            console.log("result.deviceToken : ----###############---->>>>>", forgetResult.response)
            alert(JSON.stringify(forgetResult.response))
        }, 1000)
    }

    const handleOpenUrl = () => {
        const url = "https://www.youtube.com/watch?v=3zpLRYzp9oU"
        if (Linking.canOpenURL(url)) return Linking.openURL(url)
        alert("Sorry could not able to open link...")
    }

    console.log("savedUrl +++++++++++++++++->", savedUrl)

    const myIcon = <Icon name="rocket" size={30} color="#900" />;

    const handleGrear = () => {
        navigation.navigate('IpConfiguration')
    }

    const CustomSectionHeader = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '', marginBottom: hp('2%'), justifyContent: 'flex-start', alignItems: 'center' }}>
                {/* <Text style={{ fontSize: fontsize.large, color: '#484D6D' }}>{objLogin.title}</Text> */}
                <Text style={{ fontSize: fontsize.large, color: '#484D6D' }}>{savedUrl ?? "Please configure url"}</Text>
            </View>
        )
    }

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const [orientation, SetOrientation] = useState(isPortrait() ? 'portrait' : 'landscape')

    return (
        <View style={{ flex: 1, backgroundColor: '' }}>

            <View style={{ flex: 0.3, backgroundColor: appColor.overLay, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: wp('50%'), borderBottomLeftRadius: wp('50%') }}>
                <SegmentedControl
                    tabs={["Login", "Sign Up"]}
                    segmentedControlBackgroundColor={appColor.headerTintColor}
                    activeSegmentBackgroundColor={appColor.overLay}
                    activeTextColor={appColor.white}
                    textColor={appColor.appTextColor}
                    paddingVertical={7}
                    width={wp('28%')}
                    containerStyle={{ marginVertical: 10 }}
                    textStyle={{ fontWeight: "500", fontSize: fontsize.largeSmall }}
                    currentIndex={tabIndex}
                    onChange={handleTabsChange}
                />
                <Image
                    style={{ resizeMode: 'contain', height: hp('7%'), width: hp('15%') }}
                    source={require('../../../asset/images/effiLogoTransparent.png')}
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.roundButton, { right: hp('2%'), top: hp('5%') }]}
                onPress={handleOpenUrl}>
                <Image source={appImage.question} style={styles.roundImage} />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', top: hp('6%'), right: hp('7%') }} onPress={handleOpenUrl} >
                <Text style={{ color: '#ffff', fontSize: fontsize.mediumSmall }}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.roundButton, { left: hp('2%'), top: hp('5%') }]}
                onPress={handleGrear}>
                <Image source={appImage.gear} style={styles.roundImage} />
            </TouchableOpacity>

            <TableView style={{ flex: 0.65, marginTop: 0, backgroundColor: "" }}>
                <FlatList
                    style={{ marginHorizontal: wp('5%'), marginVertical: hp('2%') }}
                    data={data}
                    keyExtractor={(item, index) => item.sectionId}
                    renderItem={({ item, index, separators }) => (
                        <Section
                            headerComponent={<CustomSectionHeader />}
                            hideSurroundingSeparators
                            roundedCorners
                            // sectionTintColor="purple"
                            // sectionPaddingBottom={40}
                            headerTextStyle={{
                                // fontSize: fontsize.large, 
                                // padding: hp('1%'),
                                // paddingLeft: wp('40%'),
                            }}
                            // header={item.sectionTitle}
                            //footer={item.sectionFooter}>
                            footer={objLogin.description}>
                            {item.sectionData.map((rowData, rowIndex) => (
                                <Cell
                                    detail={rowData.title}
                                    // accessory="DisclosureIndicator"
                                    // accessory="DetailDisclosure"
                                    // accessory="Checkmark"
                                    // cellAccessoryView={<Switch />}
                                    contentContainerStyle={{ borderRadius: 20, paddingVertical: 6 }}
                                    cellContentView={
                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                                            <Image source={rowData.image} style={{ height: hp('2.5%'), width: hp('2.5%') }} />
                                            <TextInput
                                                style={{ flex: 1, height: hp('3.5%'), fontSize: fontsize.medium, paddingLeft: wp('2%') }}
                                                selectionColor={appColor.selectionColor}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                keyboardType={(rowData.id == 105) ? 'numeric' : rowData.id == 104 ? 'email-address' : 'default'}
                                                blurOnSubmit={false}
                                                placeholder={rowData.title}
                                                returnKeyType={
                                                    (isLogIn && rowData.id == 103) ? "done" :
                                                        (!isLogIn && rowData.id == 105) ? "done" : "next"
                                                }
                                                onChangeText={(typedText) => rowData.value = typedText}
                                                // onChangeText={(typedText) => item.sectionData[rowIndex].value = typedText}
                                                clearButtonMode='while-editing'
                                                secureTextEntry={rowData.id == 2 || rowData.id == 3 ? true : false}
                                                maxLength={(rowData.id == 105) ? 10 : 1000}
                                                keyboardAppearance='dark'
                                                autoFocus={false}
                                                // onSubmitEditing={() => rowData.gstinRef.current.focus()}
                                                // onSubmitEditing={() => alert("rowData.gstinRef.current.focus()")}
                                                // onSubmitEditing={() => handleCreateParticipant()}
                                                // onSubmitEditing={() => {rowData.inputRef.current.focus()}}
                                                onSubmitEditing={() => rowData.inputRef.current?.focus()}
                                                TextInput />
                                            <Text style={{ color: rowData.color, fontSize: fontsize.medium, fontWeight: "500", justifyContent: 'center', alignItems: 'center' }}>
                                                {rowData.title}
                                            </Text>
                                        </View>
                                    }
                                >
                                </Cell>
                            ))}
                        </Section>
                    )}
                />
            </TableView>
            <TableView>
                <Section footer="All rights reserved.">
                    <Cell
                        //cellStyle={{ height: 40 }}
                        contentContainerStyle={{ backgroundColor: '' }}
                        cellContentView={
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ fontSize: fontsize.mediumSmall, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>I agree the</Text>
                                    <Text style={{ color: isTermsCheckMarkEnabled ? appColor.oceanGreen : 'grey', fontWeight: "500" }}> Terms and Conditions</Text>
                                </Text>
                            </View>
                        }
                        // accessory="DisclosureIndicator"
                        // accessory="DetailDisclosure"
                        accessory={isTermsCheckMarkEnabled ? "Checkmark" : ""}
                        // cellAccessoryView={<Switch />}
                        titleTextColor={isTermsCheckMarkEnabled ? appColor.oceanGreen : appColor.appTextColor}
                        onPress={() => { setIsTermsCheckMarkEnabled(!isTermsCheckMarkEnabled) }}
                    />
                </Section>
            </TableView >

            <View style={{ backgroundColor: '', height: hp('15%'), marginVertical: hp('2%'), justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    disabled={isLogIn ? false : true}
                    color={appColor.oceanGreen}
                    title="Forgot Password ?"
                    onPress={() => alert("Forgot Password called")}
                />
                <RoundButton
                    textColor={isTermsCheckMarkEnabled ? appColor.white : 'grey'}
                    disabled={isTermsCheckMarkEnabled ? false : true}
                    text={objLogin.buttonTitle}
                    onPress={handleLogin}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    stage: {
        // height: 1000,
        flex: 1,
        marginHorizontal: 0,
        marginVertical: 0,
        backgroundColor: '#EFEFF4',
        // backgroundColor: 'yellow',
        paddingTop: 120,
        paddingBottom: -20,
    },
    // RND
    row: {
        flexDirection: 'row',
        // backgroundColor: 'lightgrey',
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: '#d6d7da',
        padding: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    roundButton: {
        position: 'absolute',
        top: hp('2%'),
        backgroundColor: appColor.primaryColor,
        backgroundColor: '#ffff',
        height: hp('3.5%'),
        width: hp('3.5%'),
        borderRadius: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundImage: {
        backgroundColor: 'transparent',
        resizeMode: 'contain',
        height: hp('2.5%'),
        width: hp('2.5%'),
    }

});
export default LoginScreen