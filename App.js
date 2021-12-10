import * as React from 'react';
import { Text, View, Button, Settings } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button title="navigation.navigate => Home2" onPress={() => navigation.navigate("Home2")} />
      <Button title="navigation.push => Home2" onPress={() => navigation.push("Home2")} />
      <Button title="navigation.push => Home3" onPress={() => navigation.push("Home3")} />
      <Button title="navigation.navigate => Home3" onPress={() => navigation.navigate("Home3")} />
    </View>
  );
}

function HomeScreen2({ navigation }) {
  console.log("I am calling from HomeScreen 2")
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home 2</Text>
      <Button title="navigation.navigate() => Home3 " onPress={() => navigation.navigate("Home3")} />
      <Button title="navigation.push() => Home3 " onPress={() => navigation.push("Home3")} />
      <Button title="navigation.goBack() => Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

function HomeScreen3({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home 3</Text>
      <Button title="navigation.navigate => Home1" onPress={() => navigation.navigate("Home1")} />
      <Button title="navigation.navigate => Home1" onPress={() => navigation.popToTop()} />
      <Button title="navigation.goBack => Home2" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
      <Button title="navigation.push => Settings2" onPress={() => navigation.push("Settings2")} />
    </View>
  );
}

function SettingsScreen2({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings 2</Text>
      <Button title="navigation.navigate => Settings3" onPress={() => navigation.push("Settings3")} />
    </View>
  );
}

function SettingsScreen3({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings 3</Text>
      {/* <Button title="navigation.push => Home1" onPress={() => navigation.push("Home1")} />
      <Button title="navigation.navigate => Home1" onPress={() => navigation.navigate("Home1")} /> */}
      <Button title="navigation.goBack => Settings2" onPress={() => navigation.goBack()} />
      <Button title="navigation.popToTop => Settings" onPress={() => navigation.popToTop()} />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button title="navigation.push => Profile1" onPress={() => navigation.push("Profile1")} />
    </View>
  );
}

function ProfileScreen1() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile 1</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = createNativeStackNavigator()
const SettingsStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTab" component={MyTab} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerPosition='left'
    >
      <Drawer.Screen name="TabsScreen" component={TabsScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={{ title: 'Profile' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Drawer.Screen name="Profile1" component={ProfileScreen1} options={{ headerShown: true, title: 'Profile1' }} />
    </Drawer.Navigator>
  )
}

function HomeStackScreen({ navigation }) {

  let index = null
  const [homeIndex, setHomeIndex] = React.useState(null)

  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: true,
      headerRight: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer('drawerOpenRight'))}
          title="Menu"
          color="purple"
        />
      ),
    }

    } >
      <HomeStack.Screen name='Home' component={HomeScreen} />
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
      <MyDrawer />
    </NavigationContainer>
  );
}