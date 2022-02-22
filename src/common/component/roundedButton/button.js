import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { fontfamily, fontsize, wp } from '../../../asset/libraries/fontsAndColors'
import * as appColor from '../../../asset/constants/colors'

const width = Dimensions.get('window').width

const Button = ({ text, onPress, disabled, textColor }) => {
    return (
        <TouchableOpacity
            activeOpacity={disabled ? 0.7 : 1}
            disabled={disabled}
            onPress={onPress}>
            <View style={styles.btnContainerStyle}>
                <Text style={[styles.btnTextStyle, { color: textColor }]}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainerStyle: {
        backgroundColor: '#3F51B5',
        backgroundColor: appColor.primaryColor,
        backgroundColor: appColor.overLay,
        paddingVertical: 12,
        // width: width / 1.2,
        width: wp('50%'),
        borderRadius: 5
    },
    btnTextStyle: {
        fontSize: fontsize.Small,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        // fontFamily: 'Quicksand-Medium'
    }
})

export default Button
