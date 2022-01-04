import React from 'react'
import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import {
    Text, View, Button, TextInput, Platform, StyleSheet, ScrollView, Switch,
    PixelRatio, Dimensions, Keyboard
} from 'react-native'

import CustomTextInput from '../components/customTextInput';

import { useSelector, useDispatch } from 'react-redux'
import * as actionType from '../redux/actions/actionTypes'
import commonApiCall, { commonGetApiCall, commonQueryParam } from '../redux/actions/actions'
import { CommonDataModel, UserTokenDTO } from '../model'
import { color } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useScrollToTop } from '@react-navigation/native';
import SegmentedControl from "rn-segmented-control";

const Participant = ({ navigation }) => {

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

    const userNameRef = useRef(null)
    const gstinRef = useRef(null)
    const placeOfSupplyRef = useRef(null)
    const emailRef = useRef(null)
    const mobileRef = useRef(null)
    const commentRef = useRef(null)
    const countryRef = useRef(null)
    const stateRef = useRef(null)
    const postalCodeRef = useRef(null)
    const cityRef = useRef(null)
    const streetRef = useRef(null)
    const leadStatusRef = useRef(null)
    const leadSourceRef = useRef(null)
    const leadOwnerRef = useRef(null)
    const valueRef = useRef(null)
    const phoneNoRef = useRef(null)
    const contactNameRef = useRef(null)
    const leadDesignationRef = useRef(null)
    const titleRef = useRef(null)
    const tagsRef = useRef(null)
    const industryTypeRef = useRef(null)
    const leadTerritoryRef = useRef(null)
    const leadTypeRef = useRef(null)
    const probabilityRef = useRef(null)

    const dispatch = useDispatch()
    const commonDataModel = useSelector(({ participantReducer }) => participantReducer.commonDataModel)


    const [tabIndex, setTabIndex] = React.useState(1);

    const setupDefaultSwitch = () => {
        setCustSwitch(true)
        setVendSwitch(false)
        setLeadSwitch(false)
    }

    useLayoutEffect(() => {

        setTimeout(() => {
            // userNameRef.current.focus()
        }, 500);

        clearFields()

    }, [])

    useEffect(() => {
        setupDefaultSwitch()
        // fetchPlaceOfSupply()
    }, [])

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
    }


    const handleTabsChange = (index) => {
        setTabIndex(index)
        if (index == 0) { setCustSwitch(true); setVendSwitch(false); setLeadSwitch(false) }
        if (index == 1) { setCustSwitch(false); setVendSwitch(true); setLeadSwitch(false) }
        if (index == 2) { setCustSwitch(false); setVendSwitch(false); setLeadSwitch(true) }
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.row}>
                <SegmentedControl
                    tabs={["CUSTOMER", "VENDOR", "LEAD"]}
                    segmentedControlBackgroundColor="#0a67a0"// "#86c4fD"
                    activeSegmentBackgroundColor="#ff0026" // "#0482f7"
                    activeTextColor="white"
                    textColor="black"
                    paddingVertical={9}
                    width={Dimensions.get("screen").width - 90}
                    containerStyle={{ marginVertical: 20 }}
                    textStyle={{ fontWeight: "300", fontSize: 24 }}
                    currentIndex={tabIndex}
                    onChange={handleTabsChange}
                />
            </View>

            <KeyboardAwareScrollView >


                <View style={styles.tableView}>

                    <Text style={styles.heading}>{vendSwitch ? "VENDOR" : custSwitch ? "CUSTOMER" : "LEAD"}</Text>
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={userName}
                        returnKeyType="next"
                        onChangeText={(name) => setUserName(name)}
                        placeholder={vendSwitch ? "Vendor Name *" : custSwitch ? "Customer Name *" : "Lead Name *"}
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        ref={userNameRef}
                        autoFocus={false}
                        onSubmitEditing={() => gstinRef.current.focus()} />
                    <SeparatorLine />

                    <TextInput
                        style={styles.subHeading}
                        ref={gstinRef}
                        editable={true}
                        value={GSTIN}
                        returnKeyType="next"
                        onChangeText={(gstin) => setGSTIN(gstin)}
                        placeholder="GSTIN"
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        // onSubmitEditing={() => placeOfSupplyRef.current.focus()}
                        onSubmitEditing={() => console.log(userNameRef.current.value)}
                    />
                    <SeparatorLine />


                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={placeOfSupply}
                        returnKeyType="next"
                        onChangeText={(pos) => setPlaceOfSupply(pos)}
                        placeholder="Place of Supply *"
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
                        onChangeText={(mail) => setEmail(mail)}
                        placeholder="Email"
                        keyboardType='email-address'
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        ref={emailRef}
                        onSubmitEditing={() => mobileRef.current.focus()} />
                    <SeparatorLine />

                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={mobile}
                        returnKeyType={!leadSwitch ? "done" : "next"}
                        // onChangeText={(mobileNo) => setMobile(mobileNo)}
                        onChangeText={(mobileNo) => setMobile(mobileNo.replace(/[^\w\s]/gi, ""))}
                        placeholder="Mobile"
                        keyboardType='numeric'
                        blurOnSubmit={false}
                        keyboardAppearance='dark'
                        ref={mobileRef}
                        onSubmitEditing={() => leadSwitch ? probabilityRef.current.focus() : Keyboard.dismiss()} />
                    <SeparatorLine />

                    {/* TODO: LEAD FIELDS */}
                    {leadSwitch && <View>
                        <TextInput
                            style={styles.subHeading}
                            editable={true}
                            value={probability}
                            returnKeyType="next"
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
                            onChangeText={(phoneNo) => setPhoneNo(phoneNo)}
                            placeholder="Phone No"
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
                            onChangeText={(street) => setStreet(street)}
                            placeholder="Street"
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
                            onChangeText={(city) => setCity(city)}
                            placeholder="City"
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
                            onChangeText={(postalCode) => setPostalCode(postalCode)}
                            placeholder="Postal Code"
                            keyboardType='numeric'
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
                            onChangeText={(state) => setState(state)}
                            placeholder="State"
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
                            onChangeText={(country) => setCountry(country)}
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
                            maxLength={5000}
                            value={comment}
                            onChangeText={(comment) => setComment(comment)}
                            placeholder="Comment"
                            blurOnSubmit={false}
                            returnKeyType='done'
                            keyboardAppearance='dark'
                            ref={commentRef}
                            onSubmitEditing={() => Keyboard.dismiss()} />
                    </View>}

                </View>

            </KeyboardAwareScrollView >
        </View>
    )
}

export default Participant

// let style = style = StyleSheet.create({
//     textInput: {},
//     textInputContainer: {}
// })

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
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