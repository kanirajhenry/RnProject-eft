import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'

import * as actionType from '../redux/actions/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native-paper'
import commonApiCall, { commonQueryParam } from '../redux/actions/actions'
import { configuredUrl } from '../constants/api'

import { getUrl, isValidUrl } from '../utility'
import * as util from "../utility"

import * as alerts from "../constants/alerts"
import * as constant from '../constants/keys'
import * as storage from "../asset/utils/asyncStore"
import axios from 'axios'
import { Validations } from '../asset/libraries/validations'

const IpConfiguration = ({ navigation }) => {

    const [selectedValue, setSelectedValue] = React.useState("")
    const [text, onChangeText] = React.useState("")
    const [accepted, setAccepted] = React.useState("")

    const pickerRef = React.useRef()
    const urlInputRef = React.useRef()

    const dispatch = useDispatch()
    
    const [savedUrl, setSavedUrl] = React.useState("")

    useEffect(() => {

        const gotUrl = storage.getData(constant.keyIsBaseUrl)
        setTimeout(() => { setSavedUrl(gotUrl._W) }, 100)

        console.log("savedUrl: from IP config screen", savedUrl, "text is ::: > ", text)

    }, [])

    // FIXME: Both open() close() methods I think it works only for android.
    // FIXME: Dont know how to close and open picker for IOS.

    const open = () => {
        pickerRef.current.focus()
    }

    const close = () => {
        pickerRef.current.blur()
    }

    const handleIpChange = (itemValue, itemIndex) => {
        setSelectedValue(itemValue)
        onChangeText("")
        setSavedUrl("")
    }

    const handleIpConfig = () => {

        let $url = ""

        if (selectedValue != "") {
            $url = selectedValue
        } else if (selectedValue == "" && text != "") {
            $url = text
        } else if (selectedValue == "" && text == "" && savedUrl != "" && savedUrl != undefined) {
            $url = savedUrl
        }

        console.log("Selected picker value  : >>>>", selectedValue)
        console.log("Entered text value     : >>>>", text)
        console.log("Saved Url value        : >>>>", savedUrl)

        if (util.isFieldEmpty($url)) return alert(alerts.emptyUrl)
        if (!isValidUrl($url)) return alert(alerts.urlErr)

        const url = getUrl($url)
        const undefinedProtoHost = (url.protocol === undefined && url.host === undefined)

        if (isValidUrl($url) && undefinedProtoHost) return alert(alerts.protocolErr)
        if (undefinedProtoHost) return alert(alerts.urlErr)
        if (url.protocol === "http://") return alert(alerts.protocolErr)
        if ((url === undefined) || (url.protocol != "https://") || (url.host === "")) return alert(alerts.urlErr)

        storage.setData(constant.keyIsBaseUrl, configuredUrl($url))

        const queryParam = { "cmpCode": "RGS" }
        const query = commonQueryParam(queryParam, "A")

        const baseURL = configuredUrl($url)
        let mainURL = baseURL + "/erp/rest/login/checkConfig" + query

        axios.post(mainURL, {})
            .then(response => {
                if (response.data == "ACCEPTED") {
                    Validations.snackBar("IP Configuration Success")
                    navigation.goBack()
                } else {
                    Validations.snackBar("IP Configuration Failed")
                }
            })
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "#34d8eb" }}>

                {
                    selectedValue === ""
                        ?
                        <View style={{ alignContent: 'space-around' }}>
                            <TextInput
                                style={styles.input}
                                ref={urlInputRef}
                                onChangeText={text => onChangeText(text)}
                                value={savedUrl == "" ? text : savedUrl}
                                placeholder="Enter valid url"
                                keyboardType='url'
                                blurOnSubmit={true}
                                clearButtonMode='while-editing'
                                autoCapitalize='none'
                                autoComplete='off'
                                textContentType='URL'
                                blurOnSubmit={true}
                            />
                        </View>
                        :
                        <Text style={{ fontSize: 25 }}>{selectedValue}</Text>
                }
            </View>

            <Button style={{ marginBottom: 150 }} title="Config IP" onPress={() => { handleIpConfig() }} />

            {/* <Text>  Url Success: {data} </Text> */}

            <View style={{ flex: 8.5, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 8 }}>

                <Picker
                    enabled={true}
                    mode='dialog'
                    style={{ fontSize: 12 }}
                    ref={pickerRef}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => { handleIpChange(itemValue, itemIndex) }}>

                    <Picker.Item label="Demo server - https://demo.effitrac.com" value="https://demo.effitrac.com" />
                    <Picker.Item label="MSME - https://msme.effitrac.com" value="https://msme.effitrac.com" />
                    <Picker.Item label="India - https://live.effigst.com" value="https://live.effigst.com" />
                    <Picker.Item label="Rest of the word - https://live.effitrac.ae" value="https://live.effitrac.ae" />
                    <Picker.Item label="Demo server India - https://demo.effitrac.ae" value="https://demo.effitrac.ae" />
                    <Picker.Item label="Custom server URL" value="" />
                </Picker>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        paddingTop: 150,
        alignItems: 'flex-end',
        flexDirection: 'row-reverse'

    },
    input: {
        fontSize: 25,
        margin: 12,
        borderWidth: 0.2,
        padding: 10,
        marginTop: 15,
        width: 400

    },
})

export default IpConfiguration
