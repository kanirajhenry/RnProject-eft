import React from 'react';
import { StatusBar, View, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
import { wp, hp } from './ResponsiveScreen';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[{ height: hp('3%'), justifyContent: 'center' }, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const MystatusBar_Tran = () => {


    return (
        Platform.OS == "android" ?
            // <MyStatusBar backgroundColor={ color.appThemePink} barStyle="default" />
            null
            : <View style={{ height: hp("4%"), backgroundColor: "#1d2938" }} >

                <MyStatusBar barStyle="light-content" />

            </View>
    )
}

export { MystatusBar_Tran };