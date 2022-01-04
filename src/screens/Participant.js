import React from 'react'
import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import {
    Text, View, Button, TextInput, Platform, StyleSheet, ScrollView, Switch,
    PixelRatio
} from 'react-native'

import CustomTextInput from '../components/customTextInput';

import { useSelector, useDispatch } from 'react-redux'
import * as actionType from '../redux/actions/actionTypes'
import commonApiCall, { commonGetApiCall, commonQueryParam } from '../redux/actions/actions'
import { CommonDataModel, UserTokenDTO } from '../model'
import { color } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

    const userNameRef = useRef("kaniraj henry")
    const dispatch = useDispatch()
    const commonDataModel = useSelector(({ participantReducer }) => participantReducer.commonDataModel)

    const setupDefaultSwitch = () => {
        setCustSwitch(true)
        setVendSwitch(false)
        setLeadSwitch(false)
    }

    useLayoutEffect(() => {
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

    // TODO: RND CUSTOMER SCREEN
    // return (
    //     <View style={{ flex: 1, backgroundColor: 'yellow' }}>
    //         <CustomTextInput
    //             // textColor='#111111'
    //             textColor='white'
    //             style={style.textInput}
    //             containerStyle={style.textInputContainer}
    //             editable={true}
    //             value={username}
    //             onChangeText={(name) => setusername(name)}
    //             placeHolder="Username"
    //             autoFocus={true} />
    //     </View>
    // )

    // TODO: RND 2
    const SeparatorLine = () => {
        return <View style={{ height: 1, width: 100, marginLeft: 20 }}></View>
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

    const toggleSwitch = () => {
        setCustSwitch(true)
        setVendSwitch(false)
        setLeadSwitch(false)
    }
    const toggleSwitch2 = () => {
        setCustSwitch(false)
        setVendSwitch(true)
        setLeadSwitch(false)
    }
    const toggleSwitch3 = () => {
        setCustSwitch(false)
        setVendSwitch(false)
        setLeadSwitch(true)
    }

    

    return (
        <KeyboardAwareScrollView onScrollToTop={true} style={[styles.container]}>

            <View style={styles.row}>
                <View style={styles.switch}>
                    <Switch onValueChange={toggleSwitch} value={custSwitch} />
                    <Text style={styles.rowLabel}>CUSTOMER</Text>
                </View>
                <View style={styles.switch}>
                    <Switch onValueChange={toggleSwitch2} value={vendSwitch} />
                    <Text style={styles.rowLabel}>VENDOR</Text>
                </View>
                <View style={styles.switch}>
                    <Switch onValueChange={toggleSwitch3} value={leadSwitch} />
                    <Text style={styles.rowLabel}>LEAD</Text>
                </View>
            </View>

            <View style={styles.tableView}>

            {/* <Button title="Hit Me" onPress={() => console.log(userNameRef)}></Button> */}

                <Text style={styles.heading}>{vendSwitch ? "VENDOR" : custSwitch ? "CUSTOMER" : "LEAD"}</Text>
                <TextInput
                    style={styles.subHeading}
                    editable={true}
                    value={userName}
                    ref={userNameRef}
                    keyboardAppearance='dark'
                    returnKeyType="next"
                    onChangeText={(name) => setUserName(name)}
                    placeholder={vendSwitch ? "Vendor Name *" : custSwitch ? "Customer Name *" : "Lead Name *"}
                    autoFocus={true} />
                <SeparatorLine />

                <TextInput
                    style={styles.subHeading}
                    editable={true}
                    value={GSTIN}
                    onChangeText={(gstin) => setGSTIN(gstin)}
                    placeholder="GSTIN"
                    autoFocus={true} />
                <SeparatorLine />


                <TextInput
                    style={styles.subHeading}
                    editable={true}
                    value={placeOfSupply}
                    onChangeText={(pos) => setPlaceOfSupply(pos)}
                    placeholder="Place of Supply *"
                    autoFocus={true} />
                <SeparatorLine />

                <TextInput
                    style={styles.subHeading}
                    editable={true}
                    value={email}
                    onChangeText={(mail) => setEmail(mail)}
                    placeholder="Email"
                    keyboardType='email-address'
                    autoFocus={true} />
                <SeparatorLine />

                <TextInput
                    style={styles.subHeading}
                    editable={true}
                    value={mobile}
                    // onChangeText={(mobileNo) => setMobile(mobileNo)}
                    onChangeText={(mobileNo) => setMobile(mobileNo.replace(/[^\w\s]/gi, ""))}
                    placeholder="Mobile"
                    keyboardType='numeric'
                    autoFocus={true} />
                <SeparatorLine />


                {/* TODO: LEAD FIELDS */}
                {leadSwitch && <View>
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={probability}
                        onChangeText={(probability) => setProbability(probability)}
                        placeholder="Probability"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={leadType}
                        onChangeText={(type) => setLeadType(type)}
                        placeholder="Lead Type"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={leadTerritory}
                        onChangeText={(territory) => setLeadTerritory(territory)}
                        placeholder="Lead Territory"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={industryType}
                        onChangeText={(industryType) => setIndustryType(industryType)}
                        placeholder="Industry Type"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={tags}
                        onChangeText={(tags) => setTags(tags)}
                        placeholder="Tag"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={title}
                        onChangeText={(title) => setTitle(title)}
                        placeholder="Title"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={leadDesignation}
                        onChangeText={(leadDesignation) => setLeadDesignation(leadDesignation)}
                        placeholder="Lead Designation"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={contactName}
                        onChangeText={(contactName) => setContactName(contactName)}
                        placeholder="Contact Name"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={phoneNo}
                        onChangeText={(phoneNo) => setPhoneNo(phoneNo)}
                        placeholder="Phone No"
                        keyboardType='numeric'
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={value}
                        onChangeText={(value) => setValue(value)}
                        placeholder="Value"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={leadOwner}
                        onChangeText={(leadOwner) => setLeadOwner(leadOwner)}
                        placeholder="Lead Owner"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={leadSource}
                        onChangeText={(leadSource) => setLeadSource(leadSource)}
                        placeholder="Lead Source"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={leadStatus}
                        onChangeText={(leadStatus) => setLeadStatus(leadStatus)}
                        placeholder="Lead Status"
                        autoFocus={true} />
                    <SeparatorLine />

                    <Text style={styles.heading}>ADDRESS INFO</Text>
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={street}
                        onChangeText={(street) => setStreet(street)}
                        placeholder="Street"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={city}
                        onChangeText={(city) => setCity(city)}
                        placeholder="City"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={postalCode}
                        onChangeText={(postalCode) => setPostalCode(postalCode)}
                        placeholder="Postal Code"
                        keyboardType='numeric'
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={state}
                        onChangeText={(state) => setState(state)}
                        placeholder="State"
                        autoFocus={true} />
                    <SeparatorLine />
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        value={country}
                        onChangeText={(country) => setCountry(country)}
                        placeholder="Country"
                        autoFocus={true} />
                    <SeparatorLine />
                    <Text style={styles.heading}>COMMENT</Text>
                    <TextInput
                        style={styles.subHeading}
                        editable={true}
                        multiline={true}
                        value={comment}
                        onChangeText={(comment) => setComment(comment)}
                        placeholder="Comment"
                        autoFocus={true} />
                </View>}

            </View>

        </KeyboardAwareScrollView >
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
        backgroundColor: 'lightgrey',
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