import React from 'react';
import { View, ActivityIndicator, Modal, Text } from 'react-native';

const Spinner = ({ size, visibility }) => {
    return (
        <Modal
            animationType={"none"}
            transparent
            visible={visibility}
            onRequestClose={() => { }}>
            <View style={styles.spinnerStyle}>
                <ActivityIndicator
                    visible={true}
                    animating={true}
                    color='#1d2938' size={size || 'large'}
                    style={[styles.activityIndicator, { transform: [{ scale: 1.5 }] }]}
                />
            </View>
        </Modal>
    )
}
const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'

    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    }
}
export { Spinner };