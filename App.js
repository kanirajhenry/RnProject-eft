import * as React from 'react'
import { Text, View, Button, Settings, Image } from 'react-native'
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as constant from './src/asset/constants/keys'
import * as appColor from './src/asset/constants/colors'
import * as storage from './src/asset/utils/asyncStore'
import * as localData from './src/asset/constants/sharedpreference'

import Dashboard from './src/modules/dashboard/container/dashboardContainer'
import HomeScreen2 from './src/modules/home2/container/home2Container'
import HomeScreen3 from './src/modules/home3/container/home3Container'

import SettingsScreen from './src/modules/settingScreen/container/settingContainer'
import SettingsScreen2 from './src/modules/settingScreen2/container/setting2Container'
import SettingsScreen3 from './src/modules/settingScreen3/container/setting3Container'

import Participant from './src/modules/participant/container/participantContainer'
import ProfileScreen1 from './src/modules/profile1/container/profile1Container'

import LoginScreen from './src/modules/login/container/loginContainer'
import RegisterScreen from './src/modules/register/container/registerContainer'


import invoiceContainer from './src/modules/invoice/container/invoiceContainer'
import FirstPage from './src/modules/invoice/container/firstPage'
import SecondPage from './src/modules/invoice/container/secondPage'

import IpConfiguration from './src/modules/ipConfig/container/ipConfigContainer'
import { hp, wp } from './src/asset/libraries'
import { fontsize } from './src/asset/libraries/fontsAndColors'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const Stack = createNativeStackNavigator()
const RootStack = createNativeStackNavigator()

const AuthStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const SettingsStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const InvoiceStack = createNativeStackNavigator()

const TopTab = createMaterialTopTabNavigator();

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
    // headerBlurEffect: 'regular',
    // headerTransparent: true,
    headerShown: isHeaderShown,
    headerTitleAlign: 'center',
    headerLargeTitle: true,
    statusBarStyle: "light",
    headerStyle: { backgroundColor: appColor.overLay },
    headerTitleAlign: 'center',
    headerTintColor: appColor.headerTintColor,
    headerTitleStyle: { fontWeight: 'bold' }
  })
}

// function RootStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="MyTab" component={MyTab} />
//       <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
//     </Stack.Navigator>
//   )
// }

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="formSheet">

        <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen}
          options={({ navigation }) => ({
            headerShown: false,
            // headerRight: () => <Button onPress={() => navigation.navigate('Register')} title="Register" />,
            headerRight: () => <Button onPress={() => navigation.navigate("TabsScreen", { screen: 'HomeStackScreen' })} title="Home" />,
            headerLeft: () => <Button onPress={() => navigation.navigate('IpConfiguration')} title="IpConfig" />,
          })}
        />

      </RootStack.Navigator>
    </NavigationContainer>
  );
}

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
    <AuthStack.Navigator
      //screenOptions={{ headerTitleAlign: 'center' }} 
      screenOptions={customHeader(false)}
    >

      <AuthStack.Group >
        {/* <AuthStack.Screen name="TabsScreen" component={TabsScreen} options={{ headerShown: false, title: 'Home' }} /> */}
        <AuthStack.Screen name="Main" component={MyDrawer} options={{ headerShown: false }} />
      </AuthStack.Group>

      <AuthStack.Group>
        <AuthStack.Screen name='Login' component={LoginScreen} options={({ navigation }) => ({
          presentation: 'fullScreenModal',
          headerShown: false,
          // headerRight: () => <Button onPress={() => navigation.navigate('Register')} title="Register" />,
          headerRight: () => <Button onPress={() => navigation.navigate("TabsScreen", { screen: 'HomeStackScreen' })} title="Home" />,
          headerLeft: () => <Button onPress={() => navigation.navigate('IpConfiguration')} title="IpConfig" />,
        })}
        />

        <AuthStack.Screen name='Register' component={RegisterScreen} options={({ navigation }) => ({
          presentation: 'fullScreenModal',
          headerRight: () => <Button title="Done" onPress={() => navigation.goBack()} />,
        })}
        />

        <AuthStack.Screen name='IpConfiguration' component={IpConfiguration} options={({ navigation, route }) => ({
          headerShown: true,
          presentation: 'fullScreenModal',
          headerRight: () => <Button title="Done" color='#ffff' onPress={() =>
            navigation.goBack()
            // navigation.navigate('Login', {
            //   ip: "Nav bar tapped"
            // })
          }
          />
        })}
        />
      </AuthStack.Group>

    </AuthStack.Navigator>
  )
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
      {/* <HomeStack.Screen name='AuthStackScreen' component={AuthStackScreen} options={({ navigation }) => ({
        presentation: 'formSheet',
        headerShown: false,
      })}
      /> */}
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

function TopTabStack() {
  return (
    <TopTab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#633689',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <TopTab.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          tabBarLabel: 'Customer',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="home"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }}  />
      <TopTab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          tabBarLabel: 'Product',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="settings"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }} />
    </TopTab.Navigator>
  );
}

function InvoiceStackScreen() {
  return (

    <InvoiceStack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: '#633689' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <InvoiceStack.Screen
          name="TopTabStack"
          component={TopTabStack}
          options={{ title: 'CREATE INVOICE' }}
        />
      </InvoiceStack.Navigator>
    )
}

function TabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={customHeader(false), { headerShown: false, tabBarActiveBackgroundColor: appColor.overLay, tabBarActiveTintColor: appColor.white }}>
      <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{ title: "Home Page", }} />
      <Tab.Screen name="SettingsStackScreen" component={SettingsStackScreen} options={{ title: "Setting Page" }} />
      <Tab.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{ title: "Profile page" }} />
      <Tab.Screen name="InvoiceStackScreen" component={InvoiceStackScreen} options={{ title: "Invoice page" }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    // <NavigationContainer>
    //   {/* <AuthStackScreen /> */}
    //   <MyDrawer />
    // </NavigationContainer>

    <RootStackScreen />
  );
}
