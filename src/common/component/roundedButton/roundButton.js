import React from 'react'
import {
    TouchableOpacity,
    Image, StyleSheet, Text
} from 'react-native'
import { fontsize, color, fontfamily, width, height, wp, hp } from '../../../asset/libraries/fontsAndColors';
import * as appColor from "../../../asset/constants/colors"

const RoundButton = ({ text, onPress, disabled, textColor }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.5}
            style={styles.btnContainerStyle}
            onPress={onPress}>
            <Text style={{ fontSize: fontsize.medium, fontWeight: 'bold', color: textColor}}>{text}</Text>
            {/* <Image source={require('../../../asset/images/call.png')} style={styles.btnTextStyle} /> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainerStyle: {
        // position: 'absolute',
        // top: hp('2%'),
        // left: hp('2%'),
        fontSize: fontsize.mediumSmall,
        backgroundColor: appColor.overLay,
        // backgroundColor: "#DDDDDD",
        height: hp('4.5%'),
        width: wp('50%'),
        borderRadius: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextStyle: {
        backgroundColor: 'transparent',
        resizeMode: 'contain',
        height: hp('2%'),
        width: hp('2%'),
        tintColor: '#ffff',
        // tintColor: 'red',
        fontSize: 20
    }
})

export default RoundButton