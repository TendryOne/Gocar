import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer'
import { style } from '../styles'
import { SimpleLineIcons , FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../routes'
import axios from 'axios'


const CustomDrawer = (props) => {
    
    const [rating, setRating] = useState(0);
    const navigation = useNavigation()
    const [user , setUser] = useState(null)
    const [reservation , setReservation] = useState(0)
    const onStarRatingPress = (rating) => {
      setRating(rating);
      // You can also save the rating to a backend or local storage here
    };
    const GetUser = async()=>{
        try {
            const userInStorage = await AsyncStorage.getItem('user')
            if(userInStorage){
                const userObject = JSON.parse(userInStorage)
                setUser(userObject)    
                    const response = await axios.get(`http://192.168.88.3:3000/api/reservation/${userObject._id}`)
                    setReservation(response.data.length)
                
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async ()=>{
        try {
            await AsyncStorage.clear()
            navigation.replace(ROUTES.loginScreen)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        GetUser()
    }, [])


  return (
    <>
    <View style={{flex : 1,}}>
        <View style={{ paddingTop : 30, paddingBottom : 30}}>
            <View style={{ flexDirection : 'column', alignItems : 'center', justifyContent :'center'}}>
                    <Image source={require('./../public/images/default.png')} style={styles.image}/>
                <View style={{marginRight : 10}}>
                <Text style={{color : 'black' , fontWeight :'bold', alignSelf : 'center'}}><Text style={{color : style.secondary , fontWeight : 'bold', fontSize : 20}}>{user ? user.name[0] : 'D'}</Text>{user ? user.name.slice(1) : 'efault'}</Text>
                <Text style={{color : 'black' , alignSelf : 'center' , fontWeight :'bold'}}>{user ? user.firstName : 'user'}</Text>
                </View>   
            </View>   
            <View style={{flexDirection : 'row' ,justifyContent : 'space-around', marginTop : 20}}>
                <View style={styles.statusBar}>
                    <Text style={{color : "white" , fontWeight : 'bold'}}>Reservation</Text>
                    <Text style={{color : "white" , fontWeight : 'bold'}}>{user && reservation}</Text>
                </View>
                <View style={styles.statusBar}>
                    <Text style={{color : "white" , fontWeight : 'bold'}}>compte</Text>
                    <Text style={{color : "white" , fontWeight : 'bold'}}>{user && user.role === 'user' ? 'client' : 'default'}</Text>
                </View>
                <View style={styles.statusBar}>
                      <Text style={{color : "white" , fontWeight : 'bold'}}>Statut</Text>
                      <Text style={{color : "white" , fontWeight : 'bold'}}><MaterialIcons name="verified" size={24} color="white" /></Text>
                </View>
            </View>
        </View>
    <DrawerContentScrollView {... props} style={{backgroundColor : style.primary , position : 'relative'}}>
  
        <DrawerItemList {... props} dr/>


    </DrawerContentScrollView>
    <View style={{justifyContent : 'flex-end', backgroundColor : 'white' }}>
            <View style={{color : 'black'  , margin : 10, padding : 10, borderRadius : 2, flexDirection : 'row', alignItems : 'center'}}>
            <MaterialIcons name="bug-report" size={24} color="black" /> 
            <Text style={{color : 'black' ,fontWeight : 500 , marginLeft : 20}}> Signaler un bug</Text>
            </View> 
            <TouchableOpacity onPress={logout}>
            <View style={{color : 'black'  , margin : 10, padding : 10, borderRadius : 2, flexDirection : 'row', alignItems : 'center'}}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text style={{color : 'black' ,fontWeight : 500 , marginLeft : 20}}> Se deconnecter</Text>
            </View>    
            </TouchableOpacity>   
    </View>

    </View>
    </>
  
  )
}

const styles = StyleSheet.create({
    imageBackground : {
        resizeMode : 'contain',
        width : 50,
         height : 50, 
         alignSelf : 'flex-end'
    },
    image : {
        resizeMode : 'contain',
        width : 100,
         height : 100, 
         alignSelf : 'center',
         borderRadius : 500
    },
    statusBar : {
        alignItems : 'center',
        borderWidth : 1,
        width : "30%",
        backgroundColor : style.primary,
        borderRadius : 5,
        
    }
})
export default CustomDrawer