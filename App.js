import * as React from 'react'
import { Text, View, Button, Settings } from 'react-native'
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native-gesture-handler'

import * as constant from './src/constants/keys'
import * as appColor from './src/constants/colors'
import * as storage from './src/asset/utils/asyncStore'
import * as localData from "./src/constants/sharedpreference"

import Dashboard from './src/screens/dashboard'
import HomeScreen2 from './src/screens/homeScreen2'
import HomeScreen3 from './src/screens/homeScreen3'

import SettingsScreen from './src/screens/SettingsScreen'
import SettingsScreen2 from './src/screens/settingsScreen2'
import SettingsScreen3 from './src/screens/settingsScreen3'

import Participant from './src/screens/Participant'
import ProfileScreen1 from './src/screens/profileScreen1'

import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'

import IpConfiguration from './src/screens/IpConfiguration'

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
    <Drawer.Navigator drawerPosition='left' screenOptions={customHeader(false)} >
      <Drawer.Screen name="TabsScreen" component={TabsScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{ title: "Create Participant" }} />
      {/* <Drawer.Screen name="Participant" component={Participant} options={{ title: "Participant" }} /> */}
      <Drawer.Screen name="Profile1" component={ProfileScreen1} />
    </Drawer.Navigator>
  )
}

function AuthStackScreen({ navigation }) {
  return (
    <AuthStack.Navigator screenOptions={{ headerTitleAlign: 'center' }} >
      <AuthStack.Screen name='Login' component={LoginScreen} options={({ navigation }) => ({
        // presentation: 'formSheet',
        headerShown: false,
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
        // presentation: 'formSheet',
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


const handleLogOut = (navigation) => {

  console.log("++++++++++++++++++++->", storage.userPrivileges)
  console.log("++++++++++++++++++++-> lpmap", storage.licensePortalMap)

  storage.setData(constant.keyIsBaseUrl, null)
  storage.setData(constant.keyIsLoggedIn, false)
  localData.isLoggedIn = false
  localData.tokenDTO = {}
  navigation.navigate("AuthStackScreen", { screen: 'Login' })
}

const customHeader = (isHeaderShown) => {
  return ({
    headerBlurEffect: 'regular',
    headerTransparent: true,
    headerShown: isHeaderShown,
    headerTitleAlign: 'center',
    headerLargeTitle: true,
    statusBarStyle: "light",
    headerStyle: { backgroundColor: appColor.primaryColor },
    headerTitleAlign: 'center',
    headerTintColor: appColor.headerTintColor,
    headerTitleStyle: { fontWeight: 'bold' }
  })
}

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator screenOptions={({ navigation }) => (customHeader(true))} >
      <HomeStack.Screen name='Dashboard' component={Dashboard} options={{
        headerLeft: () => <Button title="Menu" color={appColor.headerLeft} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer('drawerOpenRight'))} />,
        headerRight: () => <Button title="Logout" color={appColor.headerRight} onPress={() => { handleLogOut(navigation) }}
        />
      }}
      />
      <HomeStack.Screen name='AuthStackScreen' component={AuthStackScreen} options={({ navigation }) => ({
       //  presentation: 'formSheet',
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
    <SettingsStack.Navigator screenOptions={customHeader(true)}>
      <SettingsStack.Screen name='Settings' component={SettingsScreen} />
      <SettingsStack.Screen name='Settings2' component={SettingsScreen2} />
      <SettingsStack.Screen name='Settings3' component={SettingsScreen3} />
    </SettingsStack.Navigator>
  )
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={customHeader(true)} >
      <ProfileStack.Screen name="Participant" component={Participant} options={{ title: "Create Participant" }} />
      <ProfileStack.Screen name="Profile1" component={ProfileScreen1} />
    </ProfileStack.Navigator>
  )
}

function TabsScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: appColor.tabBarActiveBackgroundColor, tabBarActiveTintColor: 'white' }}>
      <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{ title: "Home Page", }} />
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
