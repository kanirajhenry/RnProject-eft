import React, { useEffect, useRef } from 'react'
// import { Text, View, Button } from 'react-native'

import {
    ActivityIndicator, AppRegistry,
    Button, Dimensions, Image, ScrollView, StyleSheet, Switch,
    Text, TextInput, View, FlatList, Keyboard,
} from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { KeyboardAwareSectionList, KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as appColor from '../constants/colors'
import * as api from "../constants/api"
import { CommonDataModel, UserTokenDTO, ParticipantDTO, ParticipantContactModel, CommentDTO } from '../model'
import { Cell, Section, TableView, Separator } from 'react-native-tableview-simple';
import * as localData from "../constants/sharedpreference"


export default function SettingsScreen({ navigation }) {

    const isLead = true
    const isCustomer = false
    const isVendor = false
    const isSegmentEnabled = true

    const title = isLead ? "LEAD" : isCustomer ? "CUSTOMER" : "VENDOR"

    let data = [
        {
            sectionId: 1,
            sectionTitle: title,
            sectionFooter: "lets create customer",
            sectionData: [
                { id: 101, title: title.toLowerCase() + " *", value: "", inputRef: useRef(null) },
                { id: 102, title: "GSTIN", value: "", inputRef: useRef(null) },
                { id: 103, title: "Place of supply *", value: "", inputRef: useRef(null) },
                { id: 104, title: "Email", value: "", inputRef: useRef(null) },
                { id: 105, title: "Mobile", value: "", inputRef: useRef(null) },
            ]
        },
        {
            sectionId: 2,
            sectionTitle: "LEAD EXTRA FIELDS",
            sectionFooter: "Lead additional Fields",
            sectionData: [
                { id: 201, title: "Probability", value: "" },
                { id: 202, title: "Lead Type", value: "" },
                { id: 203, title: "Lead Territory", value: "" },
                { id: 204, title: "Industry Type", value: "" },
                { id: 205, title: "Tag", value: "" },
                { id: 206, title: "Title", value: "" },
                { id: 207, title: "Lead Designation", value: "" },
                { id: 208, title: "Contact Name", value: "" },
                { id: 209, title: "Phone No", value: "" },
                { id: 210, title: "Value", value: "" },
                { id: 211, title: "Lead Owner", value: "" },
                { id: 212, title: "Lead Source", value: "" },
                { id: 213, title: "Lead Status", value: "" },
            ]
        },

        {
            sectionId: 3,
            sectionTitle: "ADDRESS INFO",
            sectionFooter: "Enter address information about Lead",
            sectionData: [
                { id: 301, title: "Street", value: "" },
                { id: 302, title: "City", value: "" },
                { id: 303, title: "Postal Code", value: "" },
                { id: 304, title: "State", value: "" },
                { id: 305, title: "Country", value: "" },
            ]
        },
        {
            sectionId: 4,
            sectionTitle: "COMMENT",
            sectionFooter: "Enter comment about your lead",
            sectionData: [
                { id: 401, title: "Comment", value: "" }
            ]
        },
        {
            sectionId: 5,
            sectionTitle: "SEGMENTS",
            sectionData: [
                { id: 501, title: "Segment 1", value: "" },
                { id: 502, title: "Segment 2", value: "" },
                { id: 503, title: "Segment 3", value: "" },
                { id: 504, title: "Segment 4", value: "" },
                { id: 505, title: "Segment 5", value: "" },
                { id: 506, title: "Segment 6", value: "" },
                { id: 507, title: "Segment 7", value: "" },
                { id: 508, title: "Segment 8", value: "" },
                { id: 509, title: "Segment 9", value: "" },
                { id: 510, title: "Segment 10", value: "" },
            ]
        }
    ]

    let participantDto = new ParticipantDTO()
    let contactModel = new ParticipantContactModel()
    let gstinDataList = new CommonDataModel()

    const handleSubmit = () => {

        Keyboard.dismiss()

        participantDto.cmpCode = localData.tokenDTO.cmpCode
        participantDto.orgCode = localData.tokenDTO.orgCode
        participantDto.userId = localData.tokenDTO.userId

        if (isCustomer || isVendor && !isLead) {
            participantDto.currencyCodes = "INR"
            participantDto.commContacts = new ParticipantContactModel()
            participantDto.commContacts.province = "37" // "placeOfSupply"
        }

        if (isLead) {
            // if (LeadTabController.status != nil && LeadTabController.status.count > 0) {
            participantDto.leadStatusId = 46 // "Int(LeadTabController.status)"
            participantDto.leadStatus = "NEW"
            // }
        }

        data.forEach((element, index, array) => {

            const sectionData = element.sectionData

            switch (element.sectionId) {
                case 1:
                    sectionData.forEach((item, i, arr) => {
                        switch (item.id) {
                            case 101: participantDto.participantName = item.value
                            case 102:
                                participantDto.gstin = item.value
                                participantDto.tinNum = item.value
                            case 103: participantDto.placeOfSupply = item.value
                            case 104: participantDto.emailId = item.value
                            case 105: participantDto.contactMobile = item.value
                            default:
                                participantDto.isSeller = isCustomer ? "N" : "Y"
                                participantDto.isBuyer = isCustomer ? "Y" : "N"
                        }
                    })
                case 2:
                    sectionData.forEach((item, i, arr) => {
                        switch (item.id) {
                            case 201: participantDto.contactMobile = item.value
                            case 202: participantDto.contactMobile = item.value
                            case 203: participantDto.territory = item.value
                            case 204: participantDto.contactMobile = item.value
                            case 205: participantDto.bankAccHolderName = item.value
                            case 206: participantDto.contactMobile = item.value
                            case 207: participantDto.contactMobile = item.value
                            case 208: participantDto.contactName = item.value
                            case 209: participantDto.phone = item.value
                            case 210: participantDto.contactMobile = item.value
                            case 211: participantDto.contactMobile = item.value
                            case 212: participantDto.contactMobile = item.value
                            case 213: participantDto.contactMobile = item.value

                            default:
                                participantDto.contactTitle = "Miss"
                                participantDto.cstNum = "9865986532"
                                participantDto.fax = ""
                                participantDto.tierId = ""
                                participantDto.contactDesignation = "Staff" // Show Picker
                                participantDto.partType = "Lead"
                                participantDto.leadOwner = localData.tokenDTO.userId
                                participantDto.leadSource = "Partner"
                                participantDto.partiContactList = []
                                participantDto.isContractor = "Y"
                        }
                    })
                case 3:
                    contactModel = new ParticipantContactModel()

                    sectionData.forEach((item, i, arr) => {
                        switch (item.id) {
                            case 301: contactModel.street1 = item.value
                            case 302: contactModel.city = item.value
                            case 303: contactModel.zipCode = item.value
                            case 304: contactModel.province = item.value
                            case 305: contactModel.country = item.value
                            default:
                                contactModel.userId = localData.tokenDTO.userId
                                contactModel.cmpCode = localData.tokenDTO.cmpCode
                                contactModel.orgCode = localData.tokenDTO.orgCode

                                contactModel.addressType = "COMM"
                                contactModel.province = "37" // "placeOfSupply"

                                participantDto.participantContactList = [new ParticipantContactModel()]
                                participantDto.participantContactList = [contactModel]

                                let newContactModel = { ...contactModel, "province": "37", "addressType": "HEADQ" }

                                contactModel = new ParticipantContactModel()

                                participantDto.participantContactList = [...participantDto.participantContactList, newContactModel]
                        }
                    })
                case 4:
                    let commentDto = new CommentDTO()
                    sectionData.forEach((item, i, arr) => {
                        switch (item.id) {
                            case 401: commentDto.comment = item.value
                            default:
                                commentDto.cmpCode = localData.tokenDTO.cmpCode
                                commentDto.orgCode = localData.tokenDTO.orgCode
                                commentDto.user = localData.tokenDTO.userId
                                commentDto.opFlag = "I"
                                commentDto.type = "LEAD"
                                participantDto.commentList = []
                                participantDto.commentList = [commentDto]
                        }
                    })
                case 5:
                    sectionData.forEach((item, i, arr) => {
                        switch (item.id) {
                            case 501: participantDto.segment1 = item.value
                            case 502: participantDto.segment2 = item.value
                            case 503: participantDto.segment3 = item.value
                            case 504: participantDto.segment4 = item.value
                            case 505: participantDto.segment5 = item.value
                            case 506: participantDto.segment6 = item.value
                            case 507: participantDto.segment7 = item.value
                            case 508: participantDto.segment8 = item.value
                            case 509: participantDto.segment9 = item.value
                            case 510: participantDto.segment10 = item.value
                            default:
                                break;
                        }
                    })
            }
        })

        alert(JSON.stringify(participantDto))
        // console.log("*******************************", participantDto)
    }

    return (
        <View style={{ marginTop: 150, flex: 1 }}>
            <Button
                title="Submit"
                onPress={() => handleSubmit(data)}
            />
            <TableView style={{ marginTop: 0 }}>
                <FlatList
                    style={{ marginHorizontal: 30 }}
                    data={data}
                    keyExtractor={(item, index) => item.sectionId}
                    renderItem={({ item, index, separators }) => (
                        <Section
                            hideSurroundingSeparators
                            roundedCorners
                            headerTextStyle={{ fontSize: 20 }}
                            header={item.sectionTitle}
                            footer={item.sectionFooter}>
                            {item.sectionData.map((rowData, rowIndex) => (
                                <Cell
                                    cellStyle="RightDetail"
                                    detail={rowData.title}
                                    // accessory="DisclosureIndicator"
                                    // accessory="DetailDisclosure"
                                    // accessory="Checkmark"
                                    // cellAccessoryView={<Switch />}
                                    contentContainerStyle={{ borderRadius: 20, paddingVertical: 5 }}

                                    cellContentView={
                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                                            <TextInput
                                                selectionColor={appColor.selectionColor}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                keyboardType={(rowData.id == 105 || rowData.id == 114 || rowData.id == 203) ? 'numeric' : rowData.id == 104 ? 'email-address' : 'default'}
                                                blurOnSubmit={false}
                                                style={{ backgroundColor: '#ffff', flex: 1, height: 50, fontSize: 17 }}
                                                placeholder={rowData.title}
                                                returnKeyType={
                                                    (isSegmentEnabled && rowData.id == 410) ? "done" :
                                                        (!isSegmentEnabled && isLead && rowData.id == 301) ? "done" :
                                                            (!isSegmentEnabled && isCustomer || isVendor && rowData.id === 105) ? "done" : "next"
                                                }
                                                onChangeText={(typedText) => rowData.value = typedText}
                                                // onChangeText={(typedText) => item.sectionData[rowIndex].value = typedText}
                                                clearButtonMode='while-editing'
                                                secureTextEntry={rowData.id == 2 || rowData.id == 3 ? true : false}
                                                maxLength={(rowData.id == 105) ? 10 : rowData.id == 203 ? 6 : rowData.id == 114 ? 15 : 1000}
                                                keyboardAppearance='dark'
                                                autoFocus={false}
                                                // onSubmitEditing={() => rowData.gstinRef.current.focus()}
                                                // onSubmitEditing={() => alert("rowData.gstinRef.current.focus()")}
                                                // onSubmitEditing={() => handleSubmit()}
                                                // onSubmitEditing={() => {rowData.inputRef.current.focus()}}
                                                TextInput />
                                            <Text style={{ color: appColor.placeholderColor, fontSize: 17, fontWeight: "500", justifyContent: 'center', alignItems: 'center' }}>
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
        </View>
    )

}

const styles = StyleSheet.create({
    stage: {
        // height: 1000,
        flex: 1,
        marginHorizontal: 0,
        marginVertical: 0,
        backgroundColor: '#EFEFF4',
        backgroundColor: 'yellow',
        paddingTop: 120,
        paddingBottom: -20,
    },
});