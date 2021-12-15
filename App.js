import * as React from 'react';
import { Text, View, Button, Settings } from 'react-native';
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native-gesture-handler';

import HomeScreen1 from './src/screens/HomeScreen1'
import HomeScreen2 from './src/screens/HomeScreen2'
import HomeScreen3 from './src/screens/HomeScreen3'

import SettingsScreen from './src/screens/SettingsScreen'
import SettingsScreen2 from './src/screens/SettingsScreen2'
import SettingsScreen3 from './src/screens/SettingsScreen3'

import ProfileScreen from './src/screens/ProfileScreen'
import ProfileScreen1 from './src/screens/ProfileScreen1'

import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'

import IpConfiguration from './src/screens/IpConfiguration';

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const Stack = createNativeStackNavigator()
const RootStack = createNativeStackNavigator()

const AuthStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const SettingsStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

// function RootStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="MyTab" component={MyTab} />
//       <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
//     </Stack.Navigator>
//   )
// }

// const RootStackScreen = () => {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator mode="formSheet" >
//         <RootStack.Screen name="Main" component={MyDrawer} options={{ headerShown: true }} />
//         <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} options={{ headerShown: true }} />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

function MyDrawer({ navigation }) {
  return (
    <Drawer.Navigator drawerPosition='left' screenOptions={{ headerShown: false }} >
      <Drawer.Screen name="TabsScreen" component={TabsScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{ title: 'Profile' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Drawer.Screen name="Profile1" component={ProfileScreen1} />
    </Drawer.Navigator>
  )
}

function AuthStackScreen({ navigation }) {
  return (
    <AuthStack.Navigator >
      <AuthStack.Screen name='Login' component={LoginScreen} options={({ navigation }) => ({
        presentation: 'formSheet',
        headerRight: () => <Button onPress={() => navigation.navigate('Register')} title="Register" />,
        headerLeft: () => <Button onPress={() => navigation.navigate('IpConfiguration')} title="IpConfig" />,
      })}
      />
      <AuthStack.Screen name='Register' component={RegisterScreen} options={({ navigation }) => ({
        // presentation: 'formSheet',
        headerRight: () => <Button title="Done" onPress={() => navigation.goBack()} />,
      })}
      />

      <AuthStack.Screen name='IpConfiguration' component={IpConfiguration} options={({ navigation, route }) => ({
        presentation: 'formSheet',
        headerRight: () => <Button title="Done" onPress={() =>
          navigation.goBack()
          // navigation.navigate('Login', {
          //   ip: "Nav bar tapped"
          // })
        }
        />
      })}
      />
    </AuthStack.Navigator>
  )
}

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator screenOptions={({ navigation }) => ({ headerShown: true })} >
      <HomeStack.Screen name='Home1' component={HomeScreen1} options={{
        headerLeft: () => <Button title="Menu" color="green" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer('drawerOpenRight'))} />,
        headerRight: () => <Button title="Logout" color="red" onPress={() => navigation.navigate("AuthStackScreen", {
          screen: 'Login'
        })}
        />
      }}
      />
      <HomeStack.Screen name='AuthStackScreen' component={AuthStackScreen} options={({ navigation }) => ({
        presentation: 'formSheet',
        headerShown: false,
      })}
      />
      <HomeStack.Screen name='Home2' component={HomeScreen2} />
      <HomeStack.Screen name='Home3' component={HomeScreen3} />
    </HomeStack.Navigator>
  )
}


function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: true }}>
      <SettingsStack.Screen name='Settings' component={SettingsScreen} />
      <SettingsStack.Screen name='Settings2' component={SettingsScreen2} />
      <SettingsStack.Screen name='Settings3' component={SettingsScreen3} />
    </SettingsStack.Navigator>
  )
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: true }} >
      <ProfileStack.Screen name='Profile' component={ProfileScreen} />
      <ProfileStack.Screen name='Profile1' component={ProfileScreen1} />
    </ProfileStack.Navigator>
  )
}

function TabsScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{ title: "Home Page " }} />
      <Tab.Screen name="SettingsStackScreen" component={SettingsStackScreen} options={{ title: "Setting Page" }} />
      <Tab.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{ title: "Profile page" }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthStackScreen /> */}
      <MyDrawer />
    </NavigationContainer>

    // <RootStackScreen />
  );
}
