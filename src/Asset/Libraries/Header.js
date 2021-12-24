import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image, Dimensions, Platform
} from 'react-native'

import { wp, hp } from './ResponsiveScreen';
import { MystatusBar_Tran } from "./index"

const { width, height } = Dimensions.get('window');

export class Header extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { menuIcon, searchIcon } = this.props
        return (
            <View>
                {Platform.OS == 'ios' ? <MystatusBar_Tran /> : null}
                <View style={{ height: hp('10%'), flexDirection: 'row', justifyContent: 'center', backgroundColor: "#2d4059", }}>
                    {menuIcon == true ? <TouchableOpacity onPress={() => this.props.onPressMenu()} style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Image source={require("../images/menu.png")} style={{ flex: 0.5, resizeMode: 'contain', tintColor: "white" }} /> */}
                    </TouchableOpacity> : null}
                    {/* <Image source={require("../images/logo3.png")} style={{ flex: 7, height: hp('10%'), resizeMode: "cover" }} /> */}
                    {searchIcon == true ? <TouchableOpacity onPress={() => this.props.onPressSearch()} style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Image source={require("../images/Search-4.png")} style={{ flex: 0.5, resizeMode: 'contain', }} /> */}
                    </TouchableOpacity> : null}
                </View>
            </View>
        )
    }
};