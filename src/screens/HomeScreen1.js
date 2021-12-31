import React from 'react'
import { Text, View, Button } from 'react-native'

class HomeScreen1 extends React.Component {

    constructor(props) {
        super()

        this.state = {
            isLoggedIn: true
        }
    }

    componentDidMount() {
        if (!this.state.isLoggedIn) {
            this.props.navigation.navigate("AuthStackScreen", {
                screen: "Login"
            })
        }
    }

    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home</Text>
                {/* <Button title="navigation.navigate => Home2" onPress={() => navigation.navigate("Home2")} /> */}

                {/* 
                 FIXME: If we use class component < this.props.navigation.navigate > 
                 otherwise we can use v6 navigation directly in functional compont 
                */}

                {/* TODO: Class Component */}
                <Button title="this.props.navigation.navigate => Home2" onPress={() => this.props.navigation.navigate("Home2")} />
                <Button title="this.props.navigation.navigate => Home3" onPress={() => this.props.navigation.navigate("Home2")} />

                {/* TODO: Functional Component */}
                {/* <Button title="navigation.push => Home2" onPress={() => navigation.push("Home2")} />
                <Button title="navigation.push => Home3" onPress={() => navigation.push("Home3")} /> */}
                {/* <Button title="navigation.navigate => Home3" onPress={() => navigation.navigate("Home3")} /> */}
            </View>
        )
    }
}

export default HomeScreen1