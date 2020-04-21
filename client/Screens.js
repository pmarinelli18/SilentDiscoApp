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
import { SearchBar,Overlay } from 'react-native-elements';
import { SearchableDropdown } from'react-native-searchable-dropdown'
import { Autocomplete } from'react-native-autocomplete-input'
import Collapsible from 'react-native-collapsible';

const {width, height} = Dimensions.get("window"),
vw = width / 100,
vh = height / 100
const ScreenContainer = ({ children }) =>(
<View style ={styles.container}>{children}</View>
);



export const Home =({ navigation }) => {
    const [discos, setDiscos] = useState(trendingDiscos)
    const [inParty, setInParty] = useState(false);
    const updateInParty = (value) => {
        setInParty(value);
    }

    const soundObject = new Audio.Sound();

    const leaveParty = async (setInParty) => 
    {
        setInParty(false);
        await soundObject.pauseAsync();
    }
    //https://docs.expo.io/versions/latest/sdk/audio/?redirected
    const  goToDisco =async (navigation, i, inParty, setInParty) =>
    {
        try {
        await soundObject.loadAsync(require('./assets/songs/goodtimesroll.mp3'));
        } catch (error) {
            console.log("song no find");
        }
        try {
        await soundObject.playAsync();
        // sound work
        } catch (error) {
        console.log("sound no work");
        }
        setInParty(true);
        navigation.push('Details', {currentDisco: discos[i], discos: discos, setDiscos, setDiscos})
    }

    const AudioPlayer = (props) => (
        <View style = {{backgroundColor : "white"}}>
            <TouchableOpacity onPress ={()=> leaveParty(props.setInParty)}> 
                <Text style = {{alignSelf : "center"}}>Leave Party</Text>
            </TouchableOpacity>
        </View>
    )
    const imageSource = (name) =>{

        switch(name){
            case 'cory':
                return(require('./assets/cory.jpg'))
            case 'peyton':
                return(require('./assets/Peyton.png'))
            case 'eric':
                return(require('./assets/Eric.png'))
            case 'anthony':
                return(require('./assets/anthony.jpg'))
            default:
                return(require('./assets/SilentDiscoNew-01.png'))
        }
        
    }
    return (
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
                                    onPress ={()=> goToDisco(navigation, i, inParty, updateInParty)}
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
                <Text style = {styles.topHeader}>Friends</Text>
                <View style = {styles.friendView}>
                    {
                        users.map((item, i)  => {
                            return(
                                <TouchableOpacity
                                    onPress ={()=> navigation.push('FriendProfile', users[i])}
                                    key={i}
                                >
                                    <Image source={imageSource(users[i].name)}
                                        style={styles.friendImage}
                                    />
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        </ScrollView>
        {
        inParty?
        <AudioPlayer setInParty = {setInParty} inParty = {inParty} />
        :null
        }
    </ScreenContainer>
)
}
export const Splash =() => (
    <ScreenContainer>
        <Text>Loading</Text>
    </ScreenContainer>
)

export const Profile =(navigation) => {



    const imageSource = (name) =>{

        switch(name){
            case 'cory':
                return(require('./assets/cory.jpg'))
            case 'peyton':
                return(require('./assets/Peyton.png'))
            case 'eric':
                return(require('./assets/Eric.png'))
            case 'anthony':
                return(require('./assets/anthony.jpg'))
            default:
                return(require('./assets/SilentDiscoNew-01.png'))
        }
        
    }

return(
    
    <ScreenContainer style = {styles.profileContainer}>
        <View style={styles.songsContainer}>
        <Image source={imageSource(users[0].name)}
            style={styles.profileImage}
        />
        <Text style = {styles.profileTitle}>{users[0].name}</Text>
        <View style ={styles.row}>
            <View style ={styles.row2}>
            <Text style = {styles.followersText2}>162</Text>
        <Text style = {styles.followersText}>F O L L O W E R S</Text>
        </View>
        <View style ={styles.row2}>
        <Text style = {styles.followersText2}>54</Text>
        <Text style = {styles.followersText}>F O L L O W I N G</Text>
       
        </View>

        <View style ={styles.row2}>
        <Text style = {styles.followersText2}>4</Text>
        <Text style = {styles.followersText}>D I S C O S</Text>
        
        </View>

        </View>
        </View>
        <ScrollView style ={styles.profContain}>
                {
                  

                    trendingDiscos.map((item, i)  => {
                        return(
                            <TouchableOpacity
                                onPress ={() => queue(i)}
                                key={i}
                            >
                               
                                <View style = {styles.searchItem} key={i}>
                                    <View style = {styles.songText}>
                                        <Text style = {styles.searchSongName2}>{item.name}</Text>
                                       
                                        <Text style = {styles.searchSongName2}>{item.songs.artist}</Text>
                                    </View>
                                    <Image style={styles.searchAlbumCover}source={{uri: item.albumCover}}/>
                                    
                                </View>
                                
                            </TouchableOpacity>
                );
                    })
                }

            </ScrollView>
    </ScreenContainer>
)

}
export const FriendProfile =({route, navigation}) => {

    const imageSource = (name) =>{

        switch(name){
            case 'cory':
                return(require('./assets/cory.jpg'))
            case 'peyton':
                return(require('./assets/Peyton.png'))
            case 'eric':
                return(require('./assets/Eric.png'))
            case 'anthony':
                return(require('./assets/anthony.jpg'))
            default:
                return(require('./assets/SilentDiscoNew-01.png'))
        }
        
    }
return(
    
    <ScreenContainer style = {styles.profileContainer}>
        <View style={styles.songsContainer}>
        <Image source={imageSource(route.params.name)}
            style={styles.profileImage}
        />
        <Text style = {styles.profileTitle}>{route.params.name}</Text>
        <View style ={styles.row}>
            <View style ={styles.row2}>
            <Text style = {styles.followersText2}>162</Text>
        <Text style = {styles.followersText}>F O L L O W E R S</Text>
        </View>
        <View style ={styles.row2}>
        <Text style = {styles.followersText2}>54</Text>
        <Text style = {styles.followersText}>F O L L O W I N G</Text>
       
        </View>

        <View style ={styles.row2}>
        <Text style = {styles.followersText2}>4</Text>
        <Text style = {styles.followersText}>D I S C O S</Text>
        
        </View>

        </View>
        </View>
        <ScrollView style ={styles.profContain}>
                {
                  

                    trendingDiscos.map((item, i)  => {
                        return(
                            <TouchableOpacity
                                onPress ={() => queue(i)}
                                key={i}
                            >
                               
                                <View style = {styles.searchItem} key={i}>
                                    <View style = {styles.songText}>
                                        <Text style = {styles.searchSongName}>{item.name}</Text>
                                       
                                        <Text style = {styles.searchSongName}>{item.songs.artist}</Text>
                                    </View>
                                    <Image style={styles.searchAlbumCover}source={{uri: item.albumCover}}/>
                                    
                                </View>
                                
                            </TouchableOpacity>
                );
                    })
                }

            </ScrollView>
    </ScreenContainer>
)
}
export const Songs =({route, navigation}) => {
    const [search, setSearch] = useState('')
    const [newSongs, setSongs] = useState(route.params.songs)

    const data = songs.filter(song => (song.name.toLowerCase().includes(search.toLowerCase())) 
                                        || (song.artist.toLowerCase().includes(search.toLowerCase())))

    const updateSearch = (text) => {
        setSearch(text)
    }

    const queue = (i) => {
        let tempArr = newSongs
        tempArr.push(data[i])
        console.log(tempArr)
        navigation.push('Details', {currentDisco: trendingDiscos[route.params.ID]})
        // {currentDisco: discos[i], discos: discos, setDiscos, setDiscos}
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
                                onPress ={() => queue(i)}
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
export const AddSongs =({route, navigation}) => {
    const [search, setSearch] = useState('')

    const data = songs.filter(song => (song.name.toLowerCase().includes(search.toLowerCase())) 
                                        || (song.artist.toLowerCase().includes(search.toLowerCase())))

    const updateSearch = (text) => {
        setSearch(text)
    }

    const queue = (item) => {
        
        navigation.navigate('NewParty', {name: item.name, artist: item.artist, votes: 0})
        
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
                                onPress ={() => queue(item)}
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
export const AddContributor =({route, navigation}) => {
    const [search, setSearch] = useState('')

    const data = users.filter(user => (user.name.toLowerCase().includes(search.toLowerCase()))) 
                                       

    const updateSearch = (text) => {
        setSearch(text)
    }

    const queue = (item) => {
        
        navigation.navigate('NewParty', {contributor: item.name})
        
    }
    const imageSource = (name) =>{

        switch(name){
            case 'cory':
                return(require('./assets/cory.jpg'))
            case 'peyton':
                return(require('./assets/Peyton.png'))
            case 'eric':
                return(require('./assets/Eric.png'))
            case 'anthony':
                return(require('./assets/anthony.jpg'))
            default:
                return(require('./assets/SilentDiscoNew-01.png'))
        }
        
    }
    return(
    <ScreenContainer>
        <View style={styles.songsContainer}>
            <TextInput
                style={{ height: 40, borderColor: '#00a6ff',borderRadius: 20 , borderWidth: 1, color: '#FFFFFF', backgroundColor: 'rgba(100, 100, 100, 0.5)', marginTop: 60}}
                placeholderTextColor = "#00a6ff"
                onChangeText={text => updateSearch(text)}
                placeholder="Search User..."
                textAlign= 'center'
            />
            <ScrollView >
                {
                    data.map((item, i)  => {
                        return(
                            <TouchableOpacity
                                onPress ={() => queue(item)}
                                key={i}
                            >
                                <View style = {styles.searchItem} key={i}>
                                    <View style = {styles.songText}>
                                        <Text style = {styles.searchSongName}>{item.name}</Text>
                                        
                                    </View>
                                    <Image style={styles.searchUserImage} source={imageSource(item.name)}/>
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

export const SongList = (props) => {
    // newSongList[props.i].votes
    let thisDisco = props.route.params.currentDisco;
    let newSongList = thisDisco.songs;
    const [newVotes, setNewVotes] = useState(newSongList[props.i].votes)

    const upVote = (index) => { 
        setNewVotes(newSongList[index].votes + 1);
        newSongList[index].votes = newSongList[index].votes + 1;
        // console.log(thisDisco.songs);
        props.route.params.currentDisco = thisDisco;
    }

    return (
        <View style = {styles.songItem} key={props.i}>
            <View style = {styles.songText}>
                <Text style = {styles.songName}>{props.item.name}</Text>
                <Text style = {styles.artistText}>{props.item.artist}</Text>
            </View>
            <Text style = {styles.songVotes}>{newVotes}</Text>
            <TouchableOpacity style = {styles.upvote} onPress={()=>upVote(props.i)}>
            <Icon name="arrowup" size = {20} color="#3ae0d5"/>
            </TouchableOpacity>
        </View>  
    )
}

export const Details = ({route, navigation}) => {
    const [collapseUsers, setCollapseUsers] = useState(true)
    const[songData, setSongData] = useState(route.params.currentDisco.songs.sort(GetSortOrder('votes')))
    
    const updateCollapse = () => {
        setCollapseUsers(!collapseUsers)
    }

    function GetSortOrder(prop) {  
        return function(a, b) {  
            if (a[prop] < b[prop]) {  
                return 1;  
            } else if (a[prop] > b[prop]) {  
                return -1;  
            }  
            return 0;  
        }  
    } 

    return(    
        <ScreenContainer >
            <View style = {styles.discoHeadContainer}>
                <View style = {styles.behind}>
                    <View style={styles.discoContainer}>
                        <TouchableOpacity
                            style={styles.queueButton}
                            onPress ={()=> navigation.push('Songs', route.params.currentDisco)}
                        >
                            <Text style = {styles.queueText}>Queue a Song</Text>
                        </TouchableOpacity>
                        <Image source={{uri: trendingDiscos[0].songs[0].albumCover}}
                            style={styles.discoPageImage}
                        />
                        <Text style = {styles.discoTitle}>{route.params.currentDisco.name}</Text>
                    </View>
                    <ScrollView style = {styles.songList}>
                        {
                            songData.map((item, i)  => {
                                return(
                                    <SongList
                                        item = {item}
                                        i = {i}
                                        route = {route}
                                    />

                                );
                            })
                        }
                    </ScrollView>
                </View>
                
                <View stlye = {styles.front}>
                    <TouchableOpacity onPress = {()=>updateCollapse()} style = {styles.toggleCollapse}>
                        <Text >Contributers</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed = {collapseUsers}>
                    <View style = {styles.friendList}>
                    <ScrollView style = {styles.contributorList}>
                            {
                                route.params.currentDisco.users.map((item, i)  => {
                                    return( 
                                    <Text style = {styles.contributorName} key={i}>{item}</Text>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
                    </Collapsible>
                </View>
                            
                        
            </View>                       
        </ScreenContainer>
    )
}

export const NewParty = ({route, navigation}) => {
        
    const [collapseUsers, setCollapseUsers] = useState(true)
    {
        if(route.params == null)
        route.params = {name:'', artist:'', votes: 0}
        
    }
    const updateCollapse = () => {
        setCollapseUsers(!collapseUsers)
    }

    const [disco,setDisco] = useState({Name : "New Disco",songs: [],contributors: [users[0].name]})
        
    
    const updateName = (text) => {
        if(route == null){
            setDisco({Name : text,songs: [],contributors: [users[0].name]})
        }
        else{
            setDisco({Name : text,songs: disco.songs, contributors: disco.contributors})
        }
    }
    const[contributor, setContributor] = useState('')
    
    const updateContributors = (text) => {
        if(route.params.contributor!=null){
            setDisco({Name : disco.Name,songs: disco.songs, contributors: disco.contributors.concat([text.contributor])})
        }
        navigation.push('AddContributor')
    }
    const updateSongs = (item) => {
        if(route == null){
            setDisco({Name : "New Disco",songs: [item],contributors: [users[0].name]})
        }
        else if(route.name == null){

        }
        else{
            setDisco({Name : disco.Name,songs: disco.songs.concat([item]), contributors: disco.contributors})
        }
        navigation.push('AddSongs')
    }
    const updateVotes = (i) =>{
        if(i == -1){
            route.params.votes = route.params.votes + 1;
        }
        else{
            disco.songs[i].votes = disco.songs[i].votes+1;
        }
        setDisco({Name : disco.Name,songs: disco.songs, contributors: disco.contributors})
    }
    const showSong = (song, i) =>{
        if(song.name!='')
        return(
            <View style = {styles.songItem}>
                <View style = {styles.songText}>
                <Text style = {styles.songName}>{song.name}</Text>
                <Text style = {styles.artistText}>{song.artist}</Text>
            </View>
            <Text style = {styles.songVotes}>{song.votes}</Text>
            <TouchableOpacity style = {styles.upvote} onPress = {() => updateVotes(i)}>
            <Icon name="arrowup" size = {20} color="#3ae0d5"/>
            </TouchableOpacity>
            </View>
            
                                
        )
    }
    const showContributor = (user) =>{
        
        if(user.contributor != null)
        return(<Text style = {styles.contributorName}>{user.contributor}</Text>)
    }

    return(
    
    <ScreenContainer>
        <View style = {styles.discoHeadContainer}>
            <View style = {styles.behind}>
                <View style = {styles.discoContainer}>
                    <TextInput style ={styles.newDiscoName}
                    value = {disco.Name}
                    onChangeText = {text=>updateName(text)}
                    />
                    <TouchableOpacity
                        style={styles.button2}
                        onPress ={()=> updateSongs({name:route.params.name, artist: route.params.artist, votes: route.params.votes})}
                    >
                        <Text style = {styles.queueText}>Queue a Song</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                     style = {styles.button2}
                     onPress = {() => updateContributors(route.params)}
                    >
                        <Text style = {styles.buttonText}>Add Contributer</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style = {styles.songList}>
                            {
                                disco.songs.map((item, i)  => {
                                    return(
                                        <View style = {styles.songItem} key={i}>
                                            {showSong(disco.songs[i],i)}
                                        </View>

                                    );
                                })
                            }
                            <View style = {styles.songItem}>
                                {showSong(route.params,-1)}
                            </View>
                                
                                
                            
                            
                        </ScrollView>
            </View>
            <View stlye = {styles.front}>
                    <TouchableOpacity onPress = {()=>updateCollapse()} style = {styles.toggleCollapse}>
                        <Text >Contributers</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed = {collapseUsers}>
                        <View style = {styles.friendList}>
                        <ScrollView style = {styles.contributorList}>
                                {
                                    disco.contributors.map((item, i)  => {
                                        return( 
                                        <Text style = {styles.contributorName} key={i}>{disco.contributors[i]}</Text>
                                        );
                                    })
                                }
                                <View>
                                    {showContributor(route.params)}
                                </View>
                                
                            </ScrollView>
                        </View>
                    </Collapsible>
                </View>
            </View>
    </ScreenContainer>
    )
    
    
}

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
            <Text style = {styles.welcome}>S T A R T  Y O U R  D I S C O</Text>
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
                style={styles.button2}
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
        //flexDirection: 'column-reverse'
        justifyContent: 'center',
        //alignContent: 'center'
    },
    discoHeadContainer:{
        flex: 1, 
        backgroundColor: '#09090a',
        flexDirection: 'column-reverse'
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
        alignSelf: 'center',
        backgroundColor:'#00a6ff',
        borderRadius:18,
        width:230,
        height:50,
        
       
       
      },
    buttonText:{
        fontSize:18,
        fontWeight:"400",
      },
      followersText:{
        fontSize:13,
        fontWeight:"400",
        color: "#ffffff",
     
      },

      followersText2:{
        fontSize:13,
        fontWeight:"600",
        color: "#ffffff"
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

    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },

    row2:{
        alignItems: 'center',
        
    },
    loginInput:{
        
        height: 45,
        width: 228,
        color: '#fff',
        borderColor: '#00a6ff',
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2,
        paddingLeft: 10
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

    welcome:{
        color: '#ffffff',
        fontSize: 20,
        // fontFamily: 'normal',
        fontWeight: '100',
        marginTop: -10,
        marginBottom: 80
       
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
    profileContainer: {
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
        borderRadius:300,
        resizeMode: 'contain',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        flex: 1
    },

    profileImage:{
            width: 120,
            height: 120,
            borderRadius:300,
            marginTop: 120,
            alignSelf: "center",
            
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
        width: '100%',
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
        //alignSelf:"center",
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
        marginTop:10,
        marginBottom:20,
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

    profContain:{
        marginTop:100
    },
    searchAlbumCover:{
        width: 40,
        height: 40,
        marginTop: 8,
    },
    searchUserImage:{
        width: 40,
        height: 40,
        marginTop: 8,
        borderRadius: 300
    },
    searchSongName:{
        marginTop: 10,
        marginBottom:5,
        flex:1,
        color: '#FFFFFF',
        fontSize: 15,
    },
    searchSongName2:{
        marginTop: 10,
        marginBottom:0,
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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    toggleCollapse:{
        width: 250,
        height: 0,
        borderBottomColor: "#00BCD4",
        borderBottomWidth: 28,
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderTopEndRadius:15,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        flex:1,
        
        alignSelf:'center'
    },
    
    songList:{
        width:"100%",
        height: "30%"
    },
    behind:{
        alignItems: 'center',
        //justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
        
    },
    front:{
        
       height: 200,
       width: 100, 
    },
    friendList:{
        height: 200,
        width:250,
        alignSelf:'center',
        flex: 2,
        backgroundColor: "#00BCD4"
    },
    contributorList:{
        width: '100%',
        height: 100,
        alignSelf: "center"
    },
    contributorName:{
        borderRadius: 15,
        alignItems:'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        color: '#000',
        height: 30,
        backgroundColor: '#00a6ff',
        paddingLeft: 15,
        paddingTop: 5
    },
    newDiscoName:{
        fontSize: 25,
        letterSpacing: 8,
        marginTop: 80,
        width: 300,
        textAlign: 'center',
        alignSelf: 'flex-start',
        color: 'white',
        borderColor: "grey",
        borderWidth: 1,
        
    },
    addContributor:{
        alignSelf: 'center',
        width: 200,
        marginTop: 15,
        borderWidth: 1,
        color: 'white',
        borderColor: 'white',
        paddingLeft: 10,
    }

});