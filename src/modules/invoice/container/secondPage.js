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

const SecondPage = ({ navigation }) => {

  const [objAddProduct, setObjLogin] = useState({ title: "ADD PRODUCT", buttonTitle: "Add Product", description: "Create your sales invoice" })

  const workOrderFieldData = [
    { id: 101, title: "Customer" + " *", color: 'red', image: appImage.user, value: "", inputRef: useRef(null) },
    { id: 102, title: "Shipment date *", color: 'red', image: appImage.password, value: "", inputRef: useRef(null) },
    { id: 103, title: "Payment term *", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
    { id: 104, title: "Reference No", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
    { id: 105, title: "Transaction Id", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
    { id: 106, title: "Location", color: 'red', image: appImage.organization, value: "", inputRef: useRef(null) },
  ]

  const mainData = [{
    sectionId: 1,
    sectionTitle: objAddProduct.title,
    sectionFooter: objAddProduct.description,
    sectionData: workOrderFieldData
  }]

  const [data, setData] = useState(mainData)

  // TODO: Handlers
  const handleAddProduct = () => {
    alert("Add Product called")
  }


  // TODO: Custom View
  const CustomSectionHeader = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '', marginBottom: hp('2%'), justifyContent: 'flex-start', alignItems: 'center' }}>
        {/* <Text style={{ fontSize: fontsize.large, color: '#484D6D' }}>{objAddProduct.title}</Text> */}
        {/* <Text style={{ fontSize: fontsize.large, color: '#484D6D' }}>{savedUrl ?? "Please configure url"}</Text> */}
        <Text style={{ fontSize: fontsize.largeSmall, color: '#484D6D' }}>{"Add Product"}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TableView style={{ flex: 9, padding: wp("1%"), }}>
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
              footer={objAddProduct.description}>
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
        text={objAddProduct.buttonTitle}
        onPress={handleAddProduct}
      />
      </View>
    </SafeAreaView>
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

export default SecondPage