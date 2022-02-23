import React from 'react'
import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import {
    Text, View, Button, TextInput, Platform, StyleSheet, ScrollView, Switch,
    PixelRatio, Dimensions, Keyboard
} from 'react-native'

import CustomTextInput from '../../../common/component/customInputsDemo/customTextInput'
import { useIsFocused } from "@react-navigation/native"

import { useSelector, useDispatch } from 'react-redux'
import * as actionType from '../../../redux/actions/actionTypes'
import commonApiCall, { commonGetApiCall, commonQueryParam } from '../../../redux/actions/actions'
import { CommonDataModel, UserTokenDTO, ParticipantDTO, ParticipantContactModel, CommentDTO } from '../../../model'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useScrollToTop } from '@react-navigation/native'
import SegmentedControl from "rn-segmented-control"
import * as appColor from '../../../asset/constants/colors'
import validations from '../../../asset/libraries/validations'
import * as storage from "../../../asset/utils/asyncStore"
import * as constant from "../../../asset/constants/keys"
import { isFieldEmpty } from '../../../asset/utility'

const Participant = ({ navigation }) => {

    const isFocused = useIsFocused()

    const [custSwitch, setCustSwitch] = useState(false)
    const [vendSwitch, setVendSwitch] = useState(false)
    const [leadSwitch, setLeadSwitch] = useState(false)

    const [userName, setUserName] = useState("")
    const [GSTIN, setGSTIN] = useState("")
    const [placeOfSupply, setPlaceOfSupply] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")

    const [comment, setComment] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [leadStatus, setLeadStatus] = useState("")
    const [leadSource, setLeadSource] = useState("")
    const [leadOwner, setLeadOwner] = useState("")
    const [value, setValue] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [contactName, setContactName] = useState("")
    const [leadDesignation, setLeadDesignation] = useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")
    const [industryType, setIndustryType] = useState("")
    const [leadTerritory, setLeadTerritory] = useState("")
    const [leadType, setLeadType] = useState("")
    const [probability, setProbability] = useState("")

    const [segment1, setSegment1] = useState("")
    const [segment2, setSegment2] = useState("")
    const [segment3, setSegment3] = useState("")
    const [segment4, setSegment4] = useState("")
    const [segment5, setSegment5] = useState("")
    const [segment6, setSegment6] = useState("")
    const [segment7, setSegment7] = useState("")
    const [segment8, setSegment8] = useState("")
    const [segment9, setSegment9] = useState("")
    const [segment10, setSegment10] = useState("")

    const userNameRef = useRef(null), gstinRef = useRef(null), placeOfSupplyRef = useRef(null), emailRef = useRef(null),
        mobileRef = useRef(null), commentRef = useRef(null), countryRef = useRef(null), stateRef = useRef(null),
        postalCodeRef = useRef(null), cityRef = useRef(null), streetRef = useRef(null), leadStatusRef = useRef(null),
        leadSourceRef = useRef(null), leadOwnerRef = useRef(null), valueRef = useRef(null), phoneNoRef = useRef(null),
        contactNameRef = useRef(null), leadDesignationRef = useRef(null), titleRef = useRef(null), tagsRef = useRef(null),
        industryTypeRef = useRef(null), leadTerritoryRef = useRef(null), leadTypeRef = useRef(null), probabilityRef = useRef(null);

    const segment1Ref = useRef(null), segment2Ref = useRef(null), segment3Ref = useRef(null), segment4Ref = useRef(null), segment5Ref = useRef(null), segment6Ref = useRef(null), segment7Ref = useRef(null), segment8Ref = useRef(null), segment9Ref = useRef(null), segment10Ref = useRef(null);

    const dispatch = useDispatch()
    const commonDataModel = useSelector(({ participantReducer }) => participantReducer.commonDataModel)
    const inventList = useSelector(({ singletonReducer }) => singletonReducer.inventoryList)

    const [isSegmentEnabled, setIsSegmentEnabled] = useState(true)
    const [tabIndex, setTabIndex] = useState(0)

    const setupDefaultSwitch = () => {
        setIsSegmentEnabled(true)
        setTabIndex(0)
        setCustSwitch(true); setVendSwitch(false); setLeadSwitch(false)
    }

    useLayoutEffect(() => {

        console.log("Called from useLayoutEffect() 111111")
        setTabIndex(tabIndex)
        switch (tabIndex) {
            case 0: { setCustSwitch(true); setVendSwitch(false); setLeadSwitch(false) }; break
            case 1: { setCustSwitch(false); setVendSwitch(true); setLeadSwitch(false) }; break
            case 2: { setCustSwitch(false); setVendSwitch(false); setLeadSwitch(true) }; break
        }
        navigation.setOptions({
            headerRight: () => <Button title="ADD" color='white' onPress={() => handleCreateParticipant()} />,
        })

    }, [navigation, tabIndex, userName, GSTIN, placeOfSupply,
        email, mobile, comment, country, state, postalCode, city, street, leadStatus, leadSource, leadOwner, value,
        phoneNo, contactName, leadDesignation, title, tags, industryType, leadTerritory, leadType, probability,
        segment1, segment2, segment3, segment4, segment5, segment6, segment7, segment8, segment9, segment10
    ])

    const [cmpCode, setCmpCode] = useState(null)
    const [orgCode, setorgCode] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {

        // (async () => {
        //     setCmpCode(await storage.getData(constant.keyIsCmpCode))
        //     setorgCode(await storage.getData(constant.keyIsOrgCode))
        //     setUserId(await storage.getData(constant.keyIsUserId))
        // })()

        (async () => {
            // setCmpCode(await storage.getData(constant.keyIsCmpCode))
            // setorgCode(await storage.getData(constant.keyIsOrgCode))
            // setUserId(await storage.getData(constant.keyIsUserId))

            await storage.getData(constant.keyIsCmpCode).then(localCmpCode => {
                setCmpCode(localCmpCode)
            }).catch(error => console.log(error))

            await storage.getData(constant.keyIsOrgCode).then(localOrgCode => {
                setCmpCode(localOrgCode)
            }).catch(error => console.log(error))

            await storage.getData(constant.keyIsUserId).then(localUserId => {
                setCmpCode(localUserId)
            }).catch(error => console.log(error))

        })()

        console.log("Called from useEffect()")
        
        // alert(JSON.stringify(inventList)) // For testing purpose...

        // fetchPlaceOfSupply()

        return () => { // Called when didMount && 
            // validations.snackBar("Called from useEffect UnMount")
            clearFields()
            setupDefaultSwitch()
            // setTimeout(() => { userNameRef.current.focus() }, 500)
        }

        if (isFocused) { validations.snackBar("Focus Called For tesing purpose") }

    }, [isFocused])

    const fetchPlaceOfSupply = () => {
        tokenDTO = new UserTokenDTO()
        tokenDTO.cmpCode = "RGS"
        tokenDTO.orgCode = "dmse".toUpperCase()
        tokenDTO.userId = "admin".toUpperCase()
        tokenDTO.deviceId = "fsvLQ7YUt05PqkX9iOiRSD:APA91bH0Wi5RMMU63FOM8bdA_Kuyzszf8fz1Fp0GdFGBtraRYPqer6qvqW9QF_1SoOwzvT8bY5MhKVZu9QQk8MRvdq_BYc5DiFNB65JUFqSvT1fAhF3TviNn2adV-gF5z299TmrBfiNR"
        tokenDTO.tokenId = "1000:3efcdb5493cf44f50c473d5f6da81846374475e8435ab0bd:105d6dc43ec64f169e04d71248500abe6dafceb72ac2ba53"

        const obj = {
            "": commonQueryParam(tokenDTO, "B"),
            "gstin": "32HYZXI134764RF"
        }

        const query = commonQueryParam(obj, "C")

        dispatch(commonGetApiCall(query, null,
            actionType.controller.PARTICIPANT, actionType.participantScreen.ON_CREATE_PARTICIPANT)
        )
    }

    const handleGetPlaceOfSupply = () => {
        let userToken = new UserTokenDTO()
        let common = new CommonDataModel()
        // common = commonDataModel

        console.log(userToken.response)
        // common = JSON.parse(userToken.response)
        // let objResponse = JSON.stringify(userToken.)
        // let objResponse = JSON.parse(userToken.response)
        // alert(objResponse)
        // console.log("objResponse=================", JSON.parse(userToken.response))

        // TODO: // RND
        // var jsonTexto = '{"color":"blanco","km":100000,"esNuevo":false,"rueda":{"marca":"desconocida","estado":"malo"}}'
        // // var coche = JSON.parse(jsonTexto);
        // var coche = JSON.stringify(jsonTexto);
        // console.log("--****************--", JSON.parse(coche));
        // Resultado -> Object { color: "blanco", km: 100000, esNuevo: false, rueda: { marca: "desconocida", estado: "malo" } }



        // let response = common.responseCode
        // console.log("***********************", commonDataModel)
        // let parsedRes = JSON.parse(response)
        // // console.log("commonDataModel", parsedRes.stateMap)
        // // console.log("commonDataModel", parsedRes.sequenceGeneratorDTOs[0])
    }

    const SeparatorLine = () => {
        return <View style={{ height: 1, marginTop: 2 }}></View>
    }

    function clearFields() {
        setUserName("")
        setGSTIN("")
        setPlaceOfSupply("")
        setEmail("")
        setMobile("")

        setComment("")
        setCountry("")
        setState("")
        setPostalCode("")
        setCity("")
        setStreet("")
        setLeadStatus("")
        setLeadSource("")
        setLeadOwner("")
        setValue("")
        setPhoneNo("")
        setContactName("")
        setIndustryType("")
        setLeadTerritory("")
        setLeadType("")
        setProbability("")

        setSegment1("")
        setSegment2("")
        setSegment3("")
        setSegment4("")
        setSegment5("")
        setSegment6("")
        setSegment7("")
        setSegment8("")
        setSegment9("")
        setSegment10("")
    }

    function handleTabsChange(index) {
        setTabIndex(index)
        clearFields()
    }

    let participantDto = new ParticipantDTO()
    let contactModel = new ParticipantContactModel()
    let gstinDataList = new CommonDataModel()

    function createParticipant() {

        Keyboard.dismiss()

        const isCustomer = tabIndex === 0, isVendor = tabIndex === 1, isLead = tabIndex === 2

        participantDto.cmpCode = cmpCode
        participantDto.orgCode = orgCode
        participantDto.participantName = userName

        participantDto.tinNum = GSTIN
        participantDto.emailId = email

        if (!isLead) {
            participantDto.gstin = GSTIN
            participantDto.isSeller = isCustomer ? "N" : "Y"
            participantDto.isBuyer = isCustomer ? "Y" : "N"
        }

        participantDto.contactMobile = mobile
        participantDto.userId = userId

        if (isCustomer || isVendor && !isLead) {
            participantDto.currencyCodes = "INR"
            participantDto.commContacts = new ParticipantContactModel()
            participantDto.commContacts.province = "37" // "placeOfSupply"
        }

        if (isLead) {
            participantDto.contactName = contactName //"participantDto.contactName"
            participantDto.phone = phoneNo //"9886569858"
            participantDto.bankAccHolderName = tags // ""
            participantDto.contactTitle = "Miss" // Show Picker
            participantDto.cstNum = "9865986532"
            participantDto.fax = ""
            participantDto.territory = leadTerritory // ""
            participantDto.tierId = ""
            participantDto.contactDesignation = "Staff" // Show Picker
            participantDto.partType = "Lead"
            participantDto.leadOwner = userId
            participantDto.leadSource = "Partner"
            participantDto.partiContactList = []
            participantDto.isContractor = "Y"

            // if (LeadTabController.status != nil && LeadTabController.status.count > 0) {
            participantDto.leadStatusId = 46 // "Int(LeadTabController.status)"
            participantDto.leadStatus = "NEW"
            // }
        }

        contactModel = new ParticipantContactModel()
        contactModel.addressType = "COMM"
        contactModel.province = "37" // "placeOfSupply"

        if (isLead) {
            contactModel.street1 = street
            contactModel.city = city
            contactModel.country = "" // FIXME: ??? Have to consider again  
            contactModel.zipCode = postalCode // "568954"// 
            contactModel.userId = userId
            contactModel.cmpCode = cmpCode
            contactModel.orgCode = orgCode
        }

        participantDto.participantContactList = [new ParticipantContactModel()]
        participantDto.participantContactList = [contactModel]

        contactModel = new ParticipantContactModel()
        if (isLead) {
            contactModel.street1 = street
            contactModel.city = city
            contactModel.country = "" // FIXME: ??? Have to consider again  
            contactModel.zipCode = postalCode // "568954"
            contactModel.userId = userId
            contactModel.cmpCode = cmpCode
            contactModel.orgCode = orgCode
        }
        contactModel.province = "37" // "placeOfSupply"
        contactModel.addressType = "HEADQ"
        participantDto.participantContactList = [...participantDto.participantContactList, contactModel]

        if (isLead && !isFieldEmpty(comment)) {
            let commentDto = new CommentDTO()
            commentDto.cmpCode = cmpCode
            commentDto.orgCode = orgCode
            commentDto.user = userId
            commentDto.opFlag = "I"
            commentDto.type = "LEAD"
            commentDto.comment = comment
            participantDto.commentList = []
            participantDto.commentList = [commentDto]
        }

        participantDto.segment1 = segment1
        participantDto.segment2 = segment2
        participantDto.segment3 = segment3
        participantDto.segment4 = segment4
        participantDto.segment5 = segment5
        participantDto.segment6 = segment6
        participantDto.segment7 = segment7
        participantDto.segment8 = segment8
        participantDto.segment9 = segment9
        participantDto.segment10 = segment10

        console.log("participantDto->********", JSON.stringify(participantDto))
    }

    function getRefValue() {
        return userNameRef.current._internalFiberInstanceHandleDEV.memoizedProps.value
    }

    console.log("-----*******ReRendered******------")

    const handleCreateParticipant = () => {
        console.log("tabIndex========>", tabIndex)
        switch (tabIndex) {
            case 0: createParticipant(); break
            case 1: createParticipant(); break
            case 2: createParticipant(); break
            default: break
        }
    }

    return (
        <KeyboardAwareScrollView style={[styles.container]}>
            <View style={styles.row}>
                <SegmentedControl
                    tabs={["CUSTOMER", "VENDOR", "LEAD"]}
                    segmentedControlBackgroundColor={appColor.segmentedControlBackgroundColor}
                    activeSegmentBackgroundColor={appColor.activeSegmentBackgroundColor}
                    activeTextColor={appColor.white}
                    textColor={appColor.appTextColor}
                    paddingVertical={9}
                    width={Dimensions.get("screen").width - 90}
                    containerStyle={{ marginVertical: 20 }}
                    textStyle={{ fontWeight: "300", fontSize: 24 }}
                    currentIndex={tabIndex}
                    onChange={handleTabsChange}
                />
            </View>

            <View >
                <View style={styles.tableView}>
                    <Text style={styles.heading}>{vendSwitch ? "VENDOR" : custSwitch ? "CUSTOMER" : "LEAD"}</Text>
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        textContentType='username'
                        returnKeyType="next"
                        selectionColor={appColor.selectionColor}
                        spellCheck={false}
                        clearButtonMode='while-editing'
                        autoCorrect={false}
                        value={userName}
                        onChangeText={(userName) => setUserName(userName)}
                        placeholder={vendSwitch ? "Vendor Name *" : custSwitch ? "Customer Name *" : "Lead Name *"}
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        autoFocus={false}
                        onSubmitEditing={() => gstinRef.current.focus()} />
                    <SeparatorLine />

                    <TextInput
                        style={styles.subHeading}
                        ref={gstinRef}
                        editable={true}
                        value={GSTIN}
                        returnKeyType="next"
                        selectionColor={appColor.selectionColor}
                        spellCheck={false}
                        clearButtonMode='while-editing'
                        autoCorrect={false}
                        onChangeText={(gstin) => setGSTIN(gstin)}
                        placeholder="GSTIN"
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        onSubmitEditing={() => placeOfSupplyRef.current.focus()}
                    />
                    <SeparatorLine />

                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={placeOfSupply}
                        returnKeyType="next"
                        selectionColor={appColor.selectionColor}
                        clearButtonMode='while-editing'
                        onChangeText={(pos) => setPlaceOfSupply(pos)}
                        placeholder="Place of Supply *"
                        spellCheck={false}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        ref={placeOfSupplyRef}
                        onSubmitEditing={() => emailRef.current.focus()} />
                    <SeparatorLine />

                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={email}
                        returnKeyType="next"
                        selectionColor={appColor.selectionColor}
                        spellCheck={false}
                        clearButtonMode='while-editing'
                        onChangeText={(mail) => setEmail(mail)}
                        placeholder="Email"
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCorrect={false}
                        autoCapitalize='none'
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        ref={emailRef}
                        onSubmitEditing={() => mobileRef.current.focus()} />
                    <SeparatorLine />

                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={mobile}
                        returnKeyType={leadSwitch ? "next" : isSegmentEnabled ? "next" : "done"}
                        selectionColor={appColor.selectionColor}
                        spellCheck={false}
                        clearButtonMode='while-editing'
                        autoCorrect={false}
                        // onChangeText={(mobileNo) => setMobile(mobileNo)}
                        onChangeText={(mobileNo) => setMobile(mobileNo.replace(/[^\w\s]/gi, ""))}
                        placeholder="Mobile"
                        maxLength={10}
                        keyboardType='numeric'
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        ref={mobileRef}
                        onSubmitEditing={() => leadSwitch ? probabilityRef.current.focus() : isSegmentEnabled ? segment1Ref.current.focus() : Keyboard.dismiss()} />
                    <SeparatorLine />

                    {/* TODO: LEAD FIELDS */}
                    {leadSwitch && <View>
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={probability}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(probability) => setProbability(probability)}
                            placeholder="Probability"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={probabilityRef}
                            onSubmitEditing={() => leadTypeRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={leadType}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(type) => setLeadType(type)}
                            placeholder="Lead Type"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={leadTypeRef}
                            onSubmitEditing={() => leadTerritoryRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={leadTerritory}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(territory) => setLeadTerritory(territory)}
                            placeholder="Lead Territory"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={leadTerritoryRef}
                            onSubmitEditing={() => industryTypeRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={industryType}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(industryType) => setIndustryType(industryType)}
                            placeholder="Industry Type"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={industryTypeRef}
                            onSubmitEditing={() => tagsRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={tags}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(tags) => setTags(tags)}
                            placeholder="Tag"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={tagsRef}
                            onSubmitEditing={() => titleRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={title}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(title) => setTitle(title)}
                            placeholder="Title"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={titleRef}
                            onSubmitEditing={() => leadDesignationRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={leadDesignation}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(leadDesignation) => setLeadDesignation(leadDesignation)}
                            placeholder="Lead Designation"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={leadDesignationRef}
                            onSubmitEditing={() => contactNameRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={contactName}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(contactName) => setContactName(contactName)}
                            placeholder="Contact Name"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={contactNameRef}
                            onSubmitEditing={() => phoneNoRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={phoneNo}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(phoneNo) => setPhoneNo(phoneNo)}
                            placeholder="Phone No"
                            maxLength={15}
                            keyboardType='numeric'
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={phoneNoRef}
                            onSubmitEditing={() => valueRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={value}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(value) => setValue(value)}
                            placeholder="Value"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={valueRef}
                            onSubmitEditing={() => leadOwnerRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={leadOwner}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            onChangeText={(leadOwner) => setLeadOwner(leadOwner)}
                            placeholder="Lead Owner"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={leadOwnerRef}
                            onSubmitEditing={() => leadSourceRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={leadSource}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(leadSource) => setLeadSource(leadSource)}
                            placeholder="Lead Source"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={leadSourceRef}
                            onSubmitEditing={() => leadStatusRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={leadStatus}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(leadStatus) => setLeadStatus(leadStatus)}
                            placeholder="Lead Status"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={leadStatusRef}
                            onSubmitEditing={() => streetRef.current.focus()} />
                        <SeparatorLine />

                        <Text style={styles.heading}>ADDRESS INFO</Text>
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={street}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(street) => setStreet(street)}
                            placeholder="Street"
                            textContentType="streetAddressLine1"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={streetRef}
                            onSubmitEditing={() => cityRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={city}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(city) => setCity(city)}
                            placeholder="City"
                            textContentType="addressCity"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={cityRef}
                            onSubmitEditing={() => postalCodeRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={postalCode}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(postalCode) => setPostalCode(postalCode)}
                            placeholder="Postal Code"
                            textContentType="postalCode"
                            keyboardType='numeric'
                            maxLength={6}
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={postalCodeRef}
                            onSubmitEditing={() => stateRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={state}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(state) => setState(state)}
                            placeholder="State"
                            textContentType="addressCityAndState"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={stateRef}
                            onSubmitEditing={() => countryRef.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={country}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(country) => setCountry(country)}
                            textContentType='countryName'
                            placeholder="Country"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={countryRef}
                            onSubmitEditing={() => commentRef.current.focus()} />
                        <SeparatorLine />
                        <Text style={styles.heading}>COMMENT</Text>
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            multiline={true}
                            dataDetectorTypes='phoneNumber'
                            maxLength={5000}
                            value={comment}
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            onChangeText={(comment) => setComment(comment)}
                            placeholder="Comment"
                            blurOnSubmit={false}
                            returnKeyType={isSegmentEnabled ? "next" : "done"}
                            keyboardAppearance='dark'
                            ref={commentRef}
                            onSubmitEditing={() => isSegmentEnabled ? segment1Ref.current.focus() : Keyboard.dismiss()} />
                    </View>}

                    {/* TODO: SEGMENTS */}
                    {isSegmentEnabled && <View>
                        <Text style={styles.heading}>SEGMENTS</Text>
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment1}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment1) => setSegment1(segment1)}
                            placeholder="Segment 1"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment1Ref}
                            onSubmitEditing={() => segment2Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment2}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment2) => setSegment2(segment2)}
                            placeholder="Segment 2"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment2Ref}
                            onSubmitEditing={() => segment3Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment3}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment3) => setSegment3(segment3)}
                            placeholder="Segment 3"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment3Ref}
                            onSubmitEditing={() => segment4Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment4}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment4) => setSegment4(segment4)}
                            placeholder="Segment 4"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment4Ref}
                            onSubmitEditing={() => segment5Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment5}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment5) => setSegment5(segment5)}
                            placeholder="Segment 5"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment5Ref}
                            onSubmitEditing={() => segment6Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment6}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment6) => setSegment6(segment6)}
                            placeholder="Segment 6"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment6Ref}
                            onSubmitEditing={() => segment7Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment7}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment7) => setSegment7(segment7)}
                            placeholder="Segment 7"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment7Ref}
                            onSubmitEditing={() => segment8Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment8}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment8) => setSegment8(segment8)}
                            placeholder="Segment 8"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment8Ref}
                            onSubmitEditing={() => segment9Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment9}
                            returnKeyType="next"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment9) => setSegment9(segment9)}
                            placeholder="Segment 9"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment9Ref}
                            onSubmitEditing={() => segment10Ref.current.focus()} />
                        <SeparatorLine />
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={segment10}
                            returnKeyType="done"
                            selectionColor={appColor.selectionColor}
                            spellCheck={false}
                            clearButtonMode='while-editing'
                            autoCorrect={false}
                            onChangeText={(segment10) => setSegment10(segment10)}
                            placeholder="Segment 10"
                            blurOnSubmit={false}
                            keyboardAppearance='dark'
                            ref={segment10Ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                        <SeparatorLine />

                    </View>}
                </View>
            </View >
        </KeyboardAwareScrollView>
    )
}

export default Participant

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 100
    },
    tableView: {
        backgroundColor: '#EFEFF4',
        flexDirection: 'column'
    },
    tableViewSection: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        backgroundColor: '#0c65ab',
        height: 60
    },
    heading: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingBottom: 10,
        fontSize: 17,
        color: '#77777c',
    },
    subHeading: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        fontSize: 18,
        backgroundColor: '#ffffff'
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

    rowLabel: {
        left: 10,
        fontSize: 15,
        // flex: 1,
    },
    rowInput: {
        right: 10,
    },
    switch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

});