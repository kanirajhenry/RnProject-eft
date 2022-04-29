// React Native Tab
// https://aboutreact.com/react-native-tab/

// import * as React from 'react';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'

import {
  Text, Switch, View, Image, StyleSheet,
  Button, Linking, PixelRatio, FlatList, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar, Platform, Dimensions, ActivityIndicator, Alert
} from 'react-native'

import {
  fontsize, color, fontfamily,
  width, height, wp, hp, listenOrientationChange
} from '../../../asset/libraries/fontsAndColors'

import RoundButton from '../../../common/component/roundedButton/roundButton'
import * as appColor from '../../../asset/constants/colors'
import * as appImage from "../../../asset/constants/images"
import { Cell, Section, TableView, Separator } from 'react-native-tableview-simple'

import { WorkOrderDTO, WorkOrderItemListDTO } from "../../../model"
import { createAnimatedPropAdapter } from 'react-native-reanimated'


const FirstPage = ({ navigation }) => {

  const [objWoCustomer, setWoCustomer] = useState({ title: "Create WO", buttonTitle: "Create WO", description: "Create your work order invoice" })

  const workOrderFieldData = [
    { id: 101, title: "Customer" + " *", color: 'red', image: appImage.user, value: "", inputRef: useRef(null) },
    { id: 102, title: "Shipment date *", color: 'red', image: appImage.password, value: "", inputRef: useRef(null) },
    { id: 103, title: "Store *", color: 'red', image: appImage.password, value: "", inputRef: useRef(null) },
    { id: 104, title: "Payment term *", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
    { id: 105, title: "Reference No", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
    { id: 106, title: "Transaction Id", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
    { id: 107, title: "Location", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
  ]

  const mainData = [{
    sectionId: 1,
    sectionTitle: objWoCustomer.title,
    sectionFooter: objWoCustomer.description,
    sectionData: workOrderFieldData
  },
  {
    sectionId: 2,
    sectionTitle: "SEGMENTS",
    sectionFooter: "Segments",
    sectionData: [
      { id: 201, title: "Segment 1", value: "" },
      { id: 202, title: "Segment 2", value: "" },
      { id: 203, title: "Segment 3", value: "" },
      { id: 204, title: "Segment 4", value: "" },
      { id: 205, title: "Segment 5", value: "" },
      { id: 206, title: "Segment 6", value: "" },
      { id: 207, title: "Segment 7", value: "" },
      { id: 208, title: "Segment 8", value: "" },
      { id: 209, title: "Segment 9", value: "" },
      { id: 210, title: "Segment 10", value: "" },
    ]
  }]

  const [data, setData] = useState(mainData)

  // TODO: Handlers
  const handleCreateWorkOrder = () => {

    let createWorkOrderInvoiceDTO = new WorkOrderDTO()
    

    data.forEach((element, index, array) => {
      const sectionData = element.sectionData
      switch (element.sectionId) {
        case 1:
          sectionData.forEach((item, i, arr) => {
            switch (item.id) {
              case 101: createWorkOrderInvoiceDTO.customerCode = "CUST-13" // item.value
              case 102: createWorkOrderInvoiceDTO.shipmentDate = Date()
              case 103: createWorkOrderInvoiceDTO.nodeId = "1" // storeId as nodeId
              case 104: createWorkOrderInvoiceDTO.paymentTerms = ""
              case 105: createWorkOrderInvoiceDTO.referenceOrderId = ""
              case 106: // Do some stuff ???
              case 107: // Do some stuff ???
              default:
                createWorkOrderInvoiceDTO.gstin = "33NAEFT119981Z3"
                createWorkOrderInvoiceDTO.referenceOrderId = ""

                createWorkOrderInvoiceDTO.segment1 = ""
                createWorkOrderInvoiceDTO.segment2 = ""
                createWorkOrderInvoiceDTO.segment3 = ""
                createWorkOrderInvoiceDTO.segment4 = ""
                createWorkOrderInvoiceDTO.segment5 = ""
                createWorkOrderInvoiceDTO.segment6 = ""
                createWorkOrderInvoiceDTO.segment7 = ""
                createWorkOrderInvoiceDTO.segment8 = ""
                createWorkOrderInvoiceDTO.segment9 = ""
                createWorkOrderInvoiceDTO.segment10 = ""
                createWorkOrderInvoiceDTO.segment11 = ""
                createWorkOrderInvoiceDTO.segment12 = ""
                createWorkOrderInvoiceDTO.segment13 = ""
                createWorkOrderInvoiceDTO.segment14 = ""
                createWorkOrderInvoiceDTO.segment15 = ""
                createWorkOrderInvoiceDTO.segment16 = ""
                createWorkOrderInvoiceDTO.segment17 = ""
                createWorkOrderInvoiceDTO.segment18 = ""
                createWorkOrderInvoiceDTO.segment19 = ""
                createWorkOrderInvoiceDTO.segment20 = ""
            }
          })
        default: break
      }
    })

    createWorkOrderInvoiceDTO.workOrderItemList = [new WorkOrderItemListDTO()]

    for (i = 0; i < 2; i++) {
      let woListDto = new WorkOrderItemListDTO()
      woListDto.reqQuantity = "1"
      woListDto.productId = "13"
      woListDto.uom = "kg"
      woItemListDto.append(woListDto)
      createWorkOrderInvoiceDTO.workOrderItemList.push(woListDto)
    }

    createWorkOrderInvoiceDTO.workOrderItemList = [...createWorkOrderInvoiceDTO.workOrderItemList, createWorkOrderInvoiceDTO.workOrderItemList]
    console.log(createWorkOrderInvoiceDTO)

  }

  // TODO: Custom View
  const CustomSectionHeader = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '', marginBottom: hp('2%'), justifyContent: 'flex-start', alignItems: 'center' }}>
        {/* <Text style={{ fontSize: fontsize.large, color: '#484D6D' }}>{objWoCustomer.title}</Text> */}
        {/* <Text style={{ fontSize: fontsize.large, color: '#484D6D' }}>{savedUrl ?? "Please configure url"}</Text> */}
        <Text style={{ fontSize: fontsize.largeSmall, color: '#484D6D' }}>{"Work Order Invoice"}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, marginTop: -26, backgroundColor: '' }}>
      <TableView style={{ flex: 9, padding: wp("1%"), }}>
        <FlatList
          style={{ marginHorizontal: wp('5%'), marginVertical: hp('2%') }}
          data={data}
          // keyExtractor={(item, index) => item.sectionId}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index, separators }) => (
            <Section
              headerComponent={<CustomSectionHeader/>}
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
              footer={objWoCustomer.description}>
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
                        style={{ flex: 1, height: hp('3.5%'), fontSize: fontsize.Small, paddingLeft: wp('2%') }}
                        selectionColor={appColor.selectionColor}
                        spellCheck={false}
                        autoCorrect={false}
                        keyboardType={(rowData.id == 105) ? 'numeric' : rowData.id == 104 ? 'email-address' : 'default'}
                        blurOnSubmit={false}
                        placeholder={rowData.title}
                        returnKeyType={"next"}
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
                      <Text style={{ color: rowData.color, fontSize: fontsize.Small, fontWeight: "400", justifyContent: 'center', alignItems: 'center' }}>
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
      <View style={{ flex: 1, backgroundColor: '', height: hp('15%'), marginVertical: hp('2%'), justifyContent: 'space-between', alignItems: 'center' }}>
        <RoundButton
          textColor={appColor.white}
          disabled={false}
          text={objWoCustomer.buttonTitle}
          onPress={handleCreateWorkOrder}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
})

export default FirstPage