import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Picker, PickerIOS } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

export default function IpConfiguration({ navigation }) {

    const pickerRef = React.useRef()

    // FIXME: Both open() close() methods I think it works only for android.
    // FIXME: Dont know how to close and open picker for IOS.

    function open() {
        pickerRef.current.focus()
    }

    function close() {
        pickerRef.current.blur()
    }

    // MSME - https://msme.effitrac.com
    // India - https://live.effigst.com
    // Rest of the word - https://live.effitrac.ae
    // Demo server India - https://demo.effitrac.ae
    // Custom server URL

    const [selectedValue, setSelectedValue] = React.useState("")
    const [text, onChangeText] = React.useState("")
    const [number, onChangeNumber] = React.useState(null)

    function handleIpChange(itemValue, itemIndex) {
        setSelectedValue(itemValue)
        onChangeText("")
    }
    
    function handleIpConfig() {
        
        navigation.navigate('Login', { ip: selectedValue === "" ? text : selectedValue })
        // console.log("Selcted Value: >>>>", selectedValue, "------> Custom Text: ====> ", text)
        // alert("Selcted Value: >>>>", selectedValue, "------> Custom Text: ====> ", text)
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
                                onChangeText={text => onChangeText(text)}
                                value={text}
                                placeholder="Enter valid url"
                                keyboardType='url'
                                blurOnSubmit={true}
                                clearButtonMode='while-editing'
                                autoCapitalize='none'
                                autoComplete='off'
                                textContentType='URL'
                            />
                        </View>
                        :
                        <Text style={{ fontSize: 25 }}>{selectedValue}</Text>
                }
            </View>
            <Button style={{ marginBottom: 150 }} title="Config IP" onPress={() => { handleIpConfig() }} />
            <View style={{ flex: 8.5, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 8 }}>

                <Picker
                    enabled="false"
                    mode='dropdown'
                    style={{ fontSize: 12 }}
                    ref={pickerRef}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => { handleIpChange(itemValue, itemIndex) }}>
                    <Picker.Item style={{ fontSize: 12 }} label="MSME - https://msme.effitrac.com" value="https://msme.effitrac.com" />
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
        color: 'white',
        height: 40,
        margin: 12,
        borderWidth: 0.2,
        padding: 10,
        marginTop: 15,
        width: 300

    },
});
