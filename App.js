import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {AuthContext} from './context'
import {SignIn,CreateAccount, Profile, Home, Details, Splash, NewParty} from './Screens';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator> 
    <HomeStack.Screen name= 'Home' component ={Home}/>
    <HomeStack.Screen name= 'Details' component ={Details} 
    options ={({ route }) => ({title: route.params.name})}/>
  </HomeStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator> 
    <ProfileStack.Screen name= 'Profile' component ={Profile}/>
  </ProfileStack.Navigator>
)
const NewPartyStackScreen = () => (
  <ProfileStack.Navigator> 
    <ProfileStack.Screen name= 'NewParty' component ={NewParty}/>
  </ProfileStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator>
      <Tabs.Screen name = "Home" component = {HomeStackScreen} />
      <Tabs.Screen name = "Profile" component = {ProfileStackScreen} />
    </Tabs.Navigator>
)

export default() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null)

  const authContext = React.useMemo(() => {
return {
  signIn: () => {
    setIsLoading(false);
    setUserToken('asdf');
  }, 
  signUp:() => {
    setIsLoading(false);
    setUserToken('asdf');
  }, 
  signOut:
  () => {
    setIsLoading(false);
    setUserToken(null);
  }, 
}
  }, [])

  React.useEffect(()=> {
  setTimeout(() => {
    setIsLoading(false);
  }, 1000)
}, []);

  if(isLoading) {
    return <Splash />
  }

  return(
    <AuthContext.Provider value = {authContext}>
      <NavigationContainer>
        {userToken ? (
            <Tabs.Navigator initialRouteName = "Home">
            <Tabs.Screen name = "Home" component = {HomeStackScreen} />
            <Tabs.Screen name = "NewParty" component = {NewPartyStackScreen} />
            <Tabs.Screen name = "Profile" component = {ProfileStackScreen} />
          </Tabs.Navigator>
        ): 
        (
        <AuthStack.Navigator>
          <AuthStack.Screen name = "SignIn" component ={SignIn} options = {{title: 'Sign In'}}/>
          <AuthStack.Screen name = "CreateAccount" component ={CreateAccount} options = {{title: 'Create Account'}}/>
        </AuthStack.Navigator>
        )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
