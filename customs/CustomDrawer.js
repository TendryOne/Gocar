import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer'
import { style } from '../styles'
import { SimpleLineIcons , FontAwesome, MaterialIcons} from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'


const CustomDrawer = (props) => {

    const [rating, setRating] = useState(0);

    const onStarRatingPress = (rating) => {
      setRating(rating);
      // You can also save the rating to a backend or local storage here
    };
  return (
    <>
    <View style={{flex : 1,}}>
        <View style={{ paddingTop : 30, paddingBottom : 30}}>
            <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent :'space-between'}}>
                    <Image source={require('./../public/images/default.jpg')} style={styles.image}/>
                <View style={{marginRight : 10}}>
                <Text style={{color : 'black'}}><Text style={{color : style.secondary , fontWeight : 'bold', fontSize : 20}}>R</Text>ANAIVOSON</Text>
                <Text style={{color : 'black'}}>Alain Tendry Nomena</Text>
                </View>   
            </View>   
            <View style={{flexDirection : 'row' ,justifyContent : 'space-around', marginTop : 20}}>
                <View style={styles.statusBar}>
                    <Text style={{color : "white" , fontWeight : 'bold'}}>Reservation</Text>
                    <Text style={{color : style.secondary , fontWeight : 'bold'}}>5</Text>
                </View>
                <View style={styles.statusBar}>
                    <Text style={{color : "white" , fontWeight : 'bold'}}>Role</Text>
                    <Text style={{color : style.secondary , fontWeight : 'bold'}}>Client</Text>
                </View>
                <View style={styles.statusBar}>
                      <Text style={{color : "white" , fontWeight : 'bold'}}>Statut</Text>
                      <Text style={{color : style.secondary , fontWeight : 'bold'}}><MaterialIcons name="verified" size={24} color={style.secondary} /></Text>
                </View>
            </View>
        </View>
    <DrawerContentScrollView {... props} style={{backgroundColor : 'black' , position : 'relative'}}>
  
        <DrawerItemList {... props} dr/>


    </DrawerContentScrollView>
    <View style={{justifyContent : 'flex-end', backgroundColor : 'white' }}>
            <View style={{color : 'black'  , margin : 10, padding : 10, borderRadius : 2, flexDirection : 'row', alignItems : 'center'}}>
            <MaterialIcons name="bug-report" size={24} color="black" /> 
            <Text style={{color : 'black' ,fontWeight : 500 , marginLeft : 20}}> Signaler un bug</Text>
            </View>       
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
        backgroundColor : "black",
        borderRadius : 5,
        
    }
})
export default CustomDrawer