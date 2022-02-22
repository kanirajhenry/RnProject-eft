import React from 'react'
import {
    TouchableOpacity,
    Image, StyleSheet
} from 'react-native'
import { fontsize, color, fontfamily, width, height, wp, hp } from '../../../asset/libraries/fontsAndColors';
import * as appColor from "../../../asset/constants/colors"

const RoundButton = ({ text, handleGrear }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btnContainerStyle}
            onPress={handleGrear}
        >
            {/* <Image source={require('../../asset/images/gear.png')}
                style={styles.btnTextStyle}
            /> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainerStyle: {
        position: 'absolute',
        top: hp('2%'),
        left: hp('2%'),
        backgroundColor: appColor.primaryColor,
        backgroundColor: "#ffff",
        height: hp('4%'),
        width: hp('4%'),
        borderRadius: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextStyle: {
        backgroundColor: 'transparent',
        resizeMode: 'contain',
        height: hp('2%'),
        width: hp('2%'),
    }
})

export default RoundButton