import React from 'react';
import {FlatList, ScrollView, Image, View, Text, StyleSheet, Button,TouchableOpacity} from 'react-native';
import { AuthContext } from './context';
import trendingDiscos from './data/trendingDiscos.json';
import Icon from 'react-native-vector-icons/AntDesign';


const ScreenContainer = ({ children }) =>(
<View style ={styles.container}>{children}</View>
);

export const Home =({ navigation }) => (
    
    <ScreenContainer style = {styles.container}>
        <View style={styles.homeContainer}> 
            <Text style = {styles.topHeader}>Explore</Text>
            <Text style = {styles.subHeader1}>Trending</Text>
            <ScrollView horizontal = {true}>
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
            </ScrollView>
            <Text style = {styles.subHeader1}>Nearby Discos</Text>
            <ScrollView horizontal = {true}>
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
            </ScrollView>
            <Text style = {styles.topHeader}>Friends</Text>
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
    
    <ScreenContainer style = {styles.homeContainer}>
        <Image source={{uri: trendingDiscos[0].songs[0].albumCover}}
                                    style={styles.discoPageImage}
                                />
        <Text style = {styles.discoTitle}>{route.params.name}</Text>
        <ScrollView>
                {
                    route.params.songs.map((item, i)  => {
                        return(
                            <View style = {styles.songItem} key={i}>
                                <View style = {styles.songText}>
                                    <Text style = {styles.songName}>{route.params.songs[i].name}</Text>
                                    <Text style = {styles.artistText}>{route.params.songs[i].artist}</Text>
                                </View>
                                <Text style = {styles.songVotes}>{route.params.songs[i].votes}</Text>
                                <TouchableOpacity style = {styles.upvote}>
                                <Icon name="arrowup" size = {20} color="#008272"/>
                                </TouchableOpacity>
                            </View>

                        );
                    })
                }
            </ScrollView>
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
            <View style={styles.loginContainer}> 
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
        //justifyContent: 'center',
        //alignContent: 'center'
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
        justifyContent: 'center',
        alignItems:'center',
        marginTop:100,
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
        borderBottomColor:"#000000",
        borderBottomWidth: 3,
        width: '80%',
        color: '#ff8b3d',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    subHeader1:{
        color: '#008272',
        fontSize: 25,
        fontWeight: '100',
        //fontFamily: 'monospace',
        marginBottom: 20
    },
    subHeader2:{
        borderBottomColor:"#000000",
        borderBottomWidth: 3,
        color: '#ff8b3d',
        fontSize: 35,
        fontWeight: '100',
        marginBottom: 20
    },
    homeContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        marginTop: 80,
    },
    discoImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,  
    },
    displayAsRow:{
        flexDirection: 'row',
    },
    songItem:{
        flex: 1,  
        height: 60,
        alignSelf: 'center',
        alignContent: 'space-between',
        width: '90%',
        marginLeft:10,
        marginRight: 10,
        
        flexDirection:'row',
        //backgroundColor: '#333333',
        borderTopColor: "#000000",
        borderTopWidth: 1,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        
    },
    songVotes:{
        flex: 1,
        alignSelf: 'center',
        color: '#FFF',
        fontSize: 20,

    },
    songText:{
        flex: 9
    },
    songName:{
        marginTop: 10,
        marginBottom:5,
        flex:1,
        //fontFamily: 'monospace',
        color: '#FFFFFF',
        fontSize: 15,
        marginLeft:20,
        
        
    },
    artistText:{
        marginBottom:5,
        flex:1,
        //fontFamily: 'monospace',
        color: '#AAA',
        fontSize: 12,
        marginLeft:20,
        marginRight: 10,
        
        
        
    },
    upvote:{
        flex:1,
        width: 20,
        height: 20,
        alignSelf:'center',
        //flexDirection: 'row-reverse',
        
    },
    discoPageImage:{
        width: 150,
        height: 150,
        alignSelf: "center",
        marginTop:80,
        marginBottom: 30,

    },
    discoTitle:{

        //fontFamily: 'sans-serif-medium',
        alignSelf:"center",
        fontSize: 40,
        color: '#008272',
        marginTop: 10,
        marginBottom: 30

    },
      
});