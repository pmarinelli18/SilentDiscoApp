import React, {useState} from 'react';
import {Image, View, Text, StyleSheet, Button,TouchableOpacity} from 'react-native';
// import Carousel from 'react-native-anchor-carousel';
import {Dimensions, Grid, AsyncStorage, TextInput, ScrollView,FlatList, Platform, Picker} from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from './context';
import users from './data/users.json';
import trendingDiscos from './data/trendingDiscos.json';
import songs from './data/songs.json';
import { bold } from 'colorette';
import { processFontFamily } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/AntDesign';
import { SearchBar } from 'react-native-elements';
import { SearchableDropdown } from'react-native-searchable-dropdown'
import { Autocomplete } from'react-native-autocomplete-input'

const {width, height} = Dimensions.get("window"),
vw = width / 100,
vh = height / 100
const ScreenContainer = ({ children }) =>(
<View style ={styles.container}>{children}</View>
);
//sadf
const  goToDisco =async (navigation, i) =>
{
    Audio.requestPermissionsAsync()
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/goodtimesroll.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }

    navigation.push('Details', trendingDiscos[i])
}

export const Home =({ navigation }) => (
    
    <ScreenContainer style = {styles.container}>
        <ScrollView>
            <View style={styles.homeContainer}> 
                <Text style = {styles.topHeader}>Explore More</Text>
                <Text style = {styles.subHeader1}>Trending</Text>
                <ScrollView horizontal = {true}>
                    {
                        trendingDiscos.map((item, i)  => {
                            return(
                                <TouchableOpacity
                                    onPress ={()=> goToDisco(navigation, i)}
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
                <View style = {styles.friendView}>
                    {
                        users.map((item, i)  => {
                            return(
                                <TouchableOpacity
                                    onPress ={()=> navigation.push('FriendProfile', users[i])}
                                    key={i}
                                >
                                    <Image source={{uri: users[i].image}}
                                        style={styles.friendImage}
                                    />
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        </ScrollView>
    </ScreenContainer>
)
export const Splash =() => (
    <ScreenContainer>
        <Text>Loading</Text>
    </ScreenContainer>
)

export const Profile =(navigation) => (
    <ScreenContainer style = {styles.homeContainer}>
        <Image source={{uri: users[0].image}}
                                    style={styles.profileImage}
                                />
        <Text style = {styles.profileTitle}>{users[0].name}</Text>
        <ScrollView>
                {
                    
                }
            </ScrollView>
    </ScreenContainer>
)
export const FriendProfile = ({route})=>(


    <View>

    </View>
)

export const Songs =({route, navigation}) => {
    const [search, setSearch] = useState('')

    const data = songs.filter(song => (song.name.toLowerCase().includes(search.toLowerCase())) 
                                        || (song.artist.toLowerCase().includes(search.toLowerCase())))

    const updateSearch = (text) => {
        setSearch(text)
    }

    const queue = () => {
        navigation.push('Details', trendingDiscos[route.params])
    }

    return(
    <ScreenContainer>
        <View style={styles.songsContainer}>
            <TextInput
                style={{ height: 40, borderColor: '#00a6ff',borderRadius: 20 , borderWidth: 1, color: '#FFFFFF', backgroundColor: 'rgba(100, 100, 100, 0.5)', marginTop: 60}}
                placeholderTextColor = "#00a6ff"
                onChangeText={text => updateSearch(text)}
                placeholder="Search Song..."
                textAlign= 'center'
            />
            <ScrollView >
                {
                    data.map((item, i)  => {
                        return(
                            <TouchableOpacity
                                onPress ={queue}
                                key={i}
                            >
                                <View style = {styles.searchItem} key={i}>
                                    <View style = {styles.songText}>
                                        <Text style = {styles.searchSongName}>{item.name}</Text>
                                        <Text style = {styles.searchArtistText}>{item.artist}</Text>
                                    </View>
                                    <Image style={styles.searchAlbumCover}source={{uri: item.albumCover}}/>
                                </View>
                            </TouchableOpacity>
                );
                    })
                }

            </ScrollView>
        </View>
    </ScreenContainer>
    );
};

export const Details = ({route, navigation}) => {
    const upVote = () => {
        
    }
    
    return(    
        <ScreenContainer>
            <View style={styles.discoContainer}>
                <TouchableOpacity
                    style={styles.queueButton}
                    onPress ={()=> navigation.push('Songs', route.params.ID)}
                >
                    <Text style = {styles.queueText}>Queue a Song</Text>
                </TouchableOpacity>
                <Image source={{uri: trendingDiscos[0].songs[0].albumCover}}
                    style={styles.discoPageImage}
                />
                <Text style = {styles.discoTitle}>{route.params.name}</Text>
            </View>
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
                                        <TouchableOpacity style = {styles.upvote} onPress={upVote}>
                                        <Icon name="arrowup" size = {20} color="#3ae0d5"/>
                                        </TouchableOpacity>
                                    </View>

                                );
                            })
                        }
                    </ScrollView>                
        </ScreenContainer>
    )
}

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
export const LoginInfo = () =>{
    
    const {signIn} = React.useContext(AuthContext);

    
    return (
        <ScreenContainer style = {styles.container}>
            
    
            <View style={styles.getStartedContainer}>
            <TextInput style ={styles.loginInput}
            
            placeholder = "username"
            placeholderTextColor = "#555"
            //onChangeText = {}
            />
            <TextInput style ={styles.loginInput}
            placeholder = "password"
            placeholderTextColor = "#555"
            //onChangeText = {}
            />
            <TouchableOpacity
                style={styles.button}
                onPress ={() => signIn()}
            >
            <Text style = {styles.buttonText}>L O G I N</Text>
            </TouchableOpacity>
            
            </View>

          </ScreenContainer>
    )

}
export const SignIn = ({ navigation }) => {
    const {signIn} = React.useContext(AuthContext);

    return (
        <ScreenContainer style = {styles.container}>
            <View style={styles.welcomeContainer}> 
                <Text style = {styles.welcomeText}>S I L E N T  D I S C O</Text>
                <Image
                source={
                    __DEV__
                    ? require('./assets/SilentDiscoNew-01.png')
                    : require('./assets/SilentDiscoNew-01.png')
                }
                style={styles.welcomeImage}
                />
            </View>
    
            <View style={styles.getStartedContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> getLogin()}
            >
            <Text style = {styles.buttonText}>S P O T I F Y</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> navigation.push('LoginInfo')}
            >
            <Text style = {styles.buttonText}>L O G I N</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button2}
                onPress={()=> navigation.push('CreateAccount')}
            >
                <Text style = {styles.buttonText}>S I G N  U P</Text>
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
        backgroundColor: '#09090a',
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
        backgroundColor:'#3ae0d5',
        borderRadius:18,
        width:230,
        height:50,
        
       
      },

      button2: {
 
        marginTop:30,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:40,
        paddingRight: 40,
        alignItems: "center",
        backgroundColor:'#00a6ff',
        borderRadius:18,
        width:230,
        height:50,
        
       
       
      },
    buttonText:{
        fontSize:18,
        fontWeight:"400",
      },
      loginContainer:{
        alignItems:'center',
        marginTop: 10,
        marginBottom: 20
      },
    loginContainer:{
        justifyContent: 'center',
        alignItems:'center',
        marginTop:10,
        marginBottom: 20
    },
    loginInput:{
        
        height: 40,
        width: 150,
        color: '#fff',
        borderColor: '#00a6ff',
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2 
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
        color: '#ffffff',
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
        color: '#00a6ff',
        fontSize: 35,
        fontWeight: '500',
        marginTop:10,
        marginBottom: 20
      },
      subHeader1:{
        color: '#3ae0d5',
        fontSize: 25,
        fontWeight: '400',
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
    friendImage: {
        width: 90,
        height: 90,
        borderRadius:150,
        resizeMode: 'contain',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        flex: 1
    },

    profileImage:{
            width: 120,
            height: 120,
            borderRadius:50,
            resizeMode: 'contain',
            alignSelf: "center",
            flex: 1
    },

    followers:{
        flexDirection: "row",
        flexWrap: "wrap"
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
        marginTop:40,
        marginBottom: 30,

    },
    discoTitle:{

        //fontFamily: 'sans-serif-medium',
        alignSelf:"center",
        fontSize: 40,
        color: '#3ae0d5',
        marginTop: 10,
        marginBottom: 30

    },
    profileTitle:{

        //fontFamily: 'sans-serif-medium',
        alignSelf:"center",
        fontSize: 25,
        color: '#3ae0d5',
        marginTop: -160,
        marginBottom: 30,
        fontWeight: "bold"
    },
    discoContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        marginTop: 20,
        alignItems: "center"
    },
    songsButton:{
        marginTop:30,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:40,
        paddingRight: 40,
        alignItems: "center",
        backgroundColor:'#3ae0d5',
        borderRadius:18,
        width:350,
        height:50,
    },
    songsText:{
        fontSize:18,
        fontWeight:"400",
    },    
    songsContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 70,
        flex: 1,
    }, 
    queueButton:{
        marginTop:30,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:40,
        paddingRight: 40,
        alignItems: "center",
        backgroundColor:'#00a6ff',
        borderRadius:50,
        width:250,
        height:50,
    },
    queueText:{
        fontSize:22,
        fontWeight:"400",
    }, 
    searchItem:{
        flex: 1,  
        height: 60,
        alignSelf: 'center',
        alignContent: 'space-between',
        width: '90%',
        marginLeft:10,
        marginRight: 10,       
        flexDirection:'row',
        borderTopColor: "#000000",
        borderTopWidth: 1,
        borderBottomColor: '#3ae0d5',
        borderBottomWidth: 1,
        
    },
    searchAlbumCover:{
        width: 40,
        height: 40,
        marginTop: 8,
    },
    searchSongName:{
        marginTop: 10,
        marginBottom:5,
        flex:1,
        color: '#FFFFFF',
        fontSize: 15,
    },
    searchArtistText:{
        marginBottom:5,
        flex:1,
        color: '#AAA',
        fontSize: 12,
        marginRight: 10,
    },
    friendView:{
        width:'100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    } 
});