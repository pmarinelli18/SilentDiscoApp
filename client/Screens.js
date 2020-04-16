import React from 'react';
import {Image, View, Text, StyleSheet, Button,TouchableOpacity} from 'react-native';

import { AuthContext } from './context';
import trendingDiscos from './data/trendingDiscos.json';

const ScreenContainer = ({ children }) =>(
<View style ={styles.container}>{children}</View>
);

export const Home =({ navigation }) => (
    <ScreenContainer style = {styles.container}>
        <View style={styles.homeContainer}> 
            <Text style = {styles.topHeader}>Explore More</Text>
            <Text style = {styles.subHeader1}>Trending</Text>
            <View>
                {
                    trendingDiscos.map((item, i)  => {
                        return(
                            <TouchableOpacity
                                onPress ={()=> navigation.push('Details', trendingDiscos[i])}
                                key={i}
                            >
                                <Image source={{uri: trendingDiscos[i].songs[0].albumCover}}
                                    style={styles.discoImage}
                                />
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
            <Text style = {styles.subHeader1}>Nearby Discos</Text>
            <Text style = {styles.subHeader2}>Friends</Text>
        </View>
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

export const NewParty = () => (
    <ScreenContainer>
        <Text>NewParty</Text>
    </ScreenContainer>
)

const getLogin = async () => {
    const response = await fetch(`/login`, {
    });
    const body = await response;
}

export const SignIn = ({ navigation }) => {
    const {signIn} = React.useContext(AuthContext);

    return (
        <ScreenContainer style = {styles.container}>
            <View style={styles.welcomeContainer}> 
                <Text style = {styles.welcomeText}>Silent Disco</Text>
                <Image
                source={
                    __DEV__
                    ? require('./assets/SilentDiscoLogo.png')
                    : require('./assets/SilentDiscoLogo.png')
                }
                style={styles.welcomeImage}
                />
            </View>
    
            <View style={styles.getStartedContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> getLogin()}
            >
            <Text style = {styles.buttonText}>Test Spotify Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> signIn()}
            >
            <Text style = {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> navigation.push('CreateAccount')}
            >
                <Text style = {styles.buttonText}>Create New Account</Text>
            </TouchableOpacity>
            </View>

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


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#212121',
        justifyContent: 'center',
        alignContent: 'center'
    },
    button: {
 
        marginTop:30,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:40,
        paddingRight: 40,
        alignItems: "center",
        backgroundColor:'#008272',
        borderRadius:50,
        borderWidth: 1,
        borderColor: '#000000'
      },
    buttonText:{
        fontSize:18,
        
      },
      loginContainer:{
        alignItems:'center',
        marginTop: 10,
        marginBottom: 20
      },
      OvalShapeView: {
        marginTop: 20,
        width: 100,
        height: 100,
        backgroundColor: '#00BCD4',
        borderRadius: 50,
        transform: [
          {scaleX: 2}
        ]
      },
      welcomeText:{
        color: '#ff8b3d',
        fontSize: 40,
        // fontFamily: 'normal',
        fontWeight: '100',
        marginBottom: 50
      },
      welcomeContainer: {
          alignItems: 'center',
          marginBottom: 20,
        },
      welcomeImage: {
        width: 200,
        height: 160,
        alignItems: "center",
        resizeMode: 'contain',
        marginTop: 10,
        
      },
      getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
      },
      topHeader:{
        color: '#ff8b3d',
        fontSize: 40,
        fontWeight: '100',
        marginBottom: 20
      },
      subHeader1:{
        color: '#008272',
        fontSize: 35,
        fontWeight: '100',
        marginBottom: 20
      },
      subHeader2:{
        color: '#ff8b3d',
        fontSize: 35,
        fontWeight: '100',
        marginBottom: 20
      },
      homeContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
      },
      discoImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,  
      },
});