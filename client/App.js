import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {AuthContext} from './context'
import {SignIn, LoginInfo, CreateAccount, Profile, Home, Details, FriendProfile, Splash, NewParty} from './Screens';

import TabBarIcon from './components/TabBarIcon';
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator> 
    <HomeStack.Screen options={{headerShown: false}} name= 'Home' component ={Home}/>
    <HomeStack.Screen name = 'Details' component ={Details}
    options =
    {{headerShown: false}}
    //, ({ route }) => ({title: route.params.name})}
    
    />
    <HomeStack.Screen name = 'FriendProfile' component ={FriendProfile}
    options =
    {{headerShown: false}}
    //, ({ route }) => ({title: route.params.name})}
    
    />
    
  </HomeStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator> 
    <ProfileStack.Screen options={{headerShown: false}} name= 'Profile' component ={Profile}/>
  </ProfileStack.Navigator>
)
const NewPartyStackScreen = () => (
  <ProfileStack.Navigator> 
    <ProfileStack.Screen options={{headerShown: false}} name= 'NewParty' component ={NewParty}/>
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
      <NavigationContainer theme={MyTheme}>
        {userToken ? (
          
          <Tabs.Navigator initialRouteName = "Home" tabBarOptions={{
            headerShown: false,
            activeTintColor: '#000000',
          }}
          
          >
            <Tabs.Screen 
              name = "Home" 
              component = {HomeStackScreen}
              
              options={
              {
                
                tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} name="md-home" color={color}/>,
              }
              }
            />
            <Tabs.Screen 
              name = "NewParty" 
              component = {NewPartyStackScreen}
              options={{
                
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
              }}
            />
            <Tabs.Screen 
              name = "Profile"
              component = {ProfileStackScreen}
              options={{
                
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
              }} 
             />
          </Tabs.Navigator>
        ): 
        (
        <AuthStack.Navigator>
          <AuthStack.Screen 
          name = "SignIn" 
          component ={SignIn} 
          options={{headerShown: false}}/>

          <AuthStack.Screen 
          name = "CreateAccount" 
          component ={CreateAccount} 
          options = {{title: 'Create Account'}}/>
          
          <AuthStack.Screen 
          name = "LoginInfo" 
          component ={LoginInfo} 
          options={{headerShown: false}}/>
          
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
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MyTheme = {
  dark: false,
  colors: {
    primary: '#000000',
    background: '#000000',
    card: '#00a6ff',
    text: '#000000',
    border: '#000000',
  },
};
