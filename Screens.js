import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import { AuthContext } from './context';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignContent: 'center'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
    }
});

const ScreenContainer = ({ children }) =>(
<View style ={styles.container}>{children}</View>
);

export const Home =({ navigation }) => (
    <ScreenContainer>
        <Text>Master List Screen</Text>
        <Button title="React Native by Example" onPress ={()=> navigation.push('Details', {name: "John"})}/>
    </ScreenContainer>
)
export const Splash =() => (
    <ScreenContainer>
        <Text>Loading</Text>
    </ScreenContainer>
)

export const Profile =(navigation) => {
    const {signOut} = React.useContext(AuthContext);
    return(
    <ScreenContainer>
        <Text>Profile Screen</Text>
        <Button title ="Test Navigate"
        onPress={()=> { 
            navigation.navigate(
            'Home', {
            screen: 'Details',
            params: {name: "steve"}
            })
        }}
        />
        <Button title ="Sign Out"
        onPress={()=> { signOut()
        }} />
    </ScreenContainer>
    );
    };

export const Details = ({route}) => (
    <ScreenContainer>
        <Text>Details Screen</Text>
        {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
)

export const SignIn = ({ navigation }) => {
    const {signIn} = React.useContext(AuthContext);

    return (
        <ScreenContainer>
            <Text> Sign In Screen</Text>
            <Button title ="Sign In" onPress ={()=> signIn()}/>
            <Button title ="CreateAccount" onPress ={()=> navigation.push('CreateAccount')}/>
        </ScreenContainer>
    )
}

export const CreateAccount = () => {

    const {signUp} = React.useContext(AuthContext);
    return (
        <ScreenContainer>
            <Text>Create Account Screen</Text>
            <Button title ="Sign Up" 
            onPress ={() => signUp()}/>
        </ScreenContainer> 
    )
}
