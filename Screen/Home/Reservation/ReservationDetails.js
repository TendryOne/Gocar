import { SafeAreaView, StyleSheet, Text, View , Pressable, Platform, StatusBar, ScrollView } from 'react-native'
import { MaterialIcons , AntDesign , Ionicons , MaterialCommunityIcons } from '@expo/vector-icons'
import { style } from '../../../styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ROUTES } from '../../../routes'


const ReservationDetails = () => {
    const navigation = useNavigation()
    const router = useRoute()
    const vehicleToRent = router.params.vehicleToRent
    const dataReservation = router.params.dataReservation
    const date_of_arrival = new Date(dataReservation.date_of_departure).getTime() + (60 * 60 * 24 * 1000 * dataReservation.day_location)
    const date_of_departure = new Date(dataReservation.date_of_departure)
    const totalPrice = vehicleToRent.price * dataReservation.day_location
    const date_of_arrival_to_DB = new Date(date_of_arrival)

    const handleSubmit = async ()=>{
        try {
            const userJSON = await AsyncStorage.getItem('user')
            const user = JSON.parse(userJSON)
            if(user){           
            const newData = {...dataReservation , date_of_departure , date_of_arrival : date_of_arrival_to_DB, totalPrice, car : vehicleToRent._id , user : user._id }
            delete newData.day_location
                axios.post('http://192.168.88.3:3000/api/reservation', newData)
                navigation.replace(ROUTES.vehiculeList)
    
            }
            
        } catch (error) {
            console.log(error)
        }

    }

  return (
        <SafeAreaView style={styles.safeView}>
       <View style={{flexDirection : 'row', justifyContent : 'space-around', padding : 10, alignItems :'center'}}>
      <Pressable onPress={()=> navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios" size={25} color={style.primary} />
      </Pressable>
      <View style={{alignItems : 'center' , justifyContent: 'center', width : '90%'}}>
      <Text style={{color : style.primary}}> Confirmation de reservation </Text>
      </View>
      </View>
    <ScrollView 
        showsVerticalScrollIndicator = {false}
    >

      <View style={styles.Container}>
        <View style ={{ flexDirection : 'row', justifyContent : 'space-between'}}>
        <View style ={{alignItems : 'center'}}>  
            <Text style={styles.title}>
            <Ionicons name="ios-location-sharp" size={24} color="gray" />
            </Text>
            <Text style={{ color : style.primary , fontWeight : 'bold'}}>
                {dataReservation.departure}
            </Text>
        </View>
        <View style ={{alignItems : 'center'}}>  
            <Text style={styles.title}>
            -----<MaterialCommunityIcons name="car-key" size={24} color="gray" />---->
            </Text>
            <Text style={{ color : style.primary , fontWeight : 'bold'}}>
                {vehicleToRent.brand} {vehicleToRent.model}
            </Text>
        </View>
        
        <View style ={{alignItems : 'center'}}>  
            <Text style={styles.title}>
            <Ionicons name="ios-location-sharp" size={24} color="gray" />
            </Text>
            <Text style={{ color : style.primary , fontWeight : 'bold'}}>
                {dataReservation.arrival}
            </Text>
        </View>
        </View>


        <View style={{ justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 20 , marginBottom : 20}}>  
            <Text style={styles.title}>
                Date de depart
            </Text>
            <Text style = {{color : style.primary, }}>
            {date_of_departure.toLocaleDateString()}
            </Text>
        </View>
        <View style={{ justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 20 , marginBottom : 20}}>  
            <Text style={styles.title}>
                Date de retour du vehicule
            </Text>
            <Text style = {{color : style.primary, }}>
                {new Date(date_of_arrival).toLocaleDateString()}
            </Text>
        </View>

        <View style={{ justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 20 , marginBottom : 20}}>  
            <Text style={styles.title}>
                prix de location / jour
            </Text>
            <Text style = {{color : style.primary}}>
                Ar {vehicleToRent.price.toLocaleString()}
            </Text>
        </View>
        <View style={{ justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 20 , marginBottom : 20}}>  
            <Text style={styles.title}>
                Nombre de jour de location
            </Text>
            <Text style = {{color : style.primary}}>
                {dataReservation.day_location}
            </Text>
        </View>
        <View style ={{width : '100%' , height : 5 , backgroundColor : style.primary , alignSelf : 'center', margin : 10}}>

        </View>
        <View style={{ justifyContent : 'space-between' , flexDirection : 'row' ,}}>  
            <Text style={{fontWeight : 'bold'}}>
                Prix Total
            </Text>
            <Text style = {{color : style.primary,  fontWeight : 'bold'}}>
                Ar {totalPrice.toLocaleString()}
            </Text>
        </View>
      </View>
      <View style={styles.conditionContainer}>
        <Text style={{fontWeight : 'bold', textAlign : 'justify' , margin : 5}}>
            <Text style={{fontWeight : 'bold' , }}><AntDesign name="warning" size={15} color="black" /> </Text>Toutes reservations faites seront annulable Gratuitement s'il est annule 3 jours avant la date de depart , 
            tout annulation apres 3 jours se fera aupres du support Technique , 
        </Text>
        <Text style={{fontWeight : 'bold', textAlign : 'justify' , margin : 5}}>
        <Text style={{fontWeight : 'bold' , }}><AntDesign name="warning" size={15} color="black" /> </Text>Apres 3 jours , si une annulation a ete faites , il vous sera rembourse 80% du somme que vous avez verse aupres de KEE
        </Text>
        <Text style={{fontWeight : 'bold', textAlign : 'justify' , margin : 5}}>

        <Text style={{fontWeight : 'bold' , }}><AntDesign name="warning" size={15} color="black" /> </Text>Pour tout degradation de nos vehicules, vous serez tenu responsable et devra reparer le vehicule endommage , 
            vous serez passible de poursuite judiciaire pour tout refus de reparation
        </Text>

      </View>
      <View style={styles.buttonContainer}>
      <Text style={{textAlign : 'center'}}>
            En cliquant sur <Text style={{fontWeight : 'bold'}}> " Confirmer "</Text> , vous acceptez toutes ces conditions citees en haut 
        </Text>
        <Button 
        buttonColor={style.primary}
        textColor='white'
        style={{
            marginTop : 10,
            width : '50%'
        }}
        onPress={handleSubmit}
        >
            <Text>Confirmer</Text>
        </Button>
      </View>
      </ScrollView>
      </SafeAreaView>
  )
}

export default ReservationDetails

const styles = StyleSheet.create({
    safeView : {
        flex : 1,
        paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    Container : {
        margin : 10
    },
    conditionContainer : {
        marginTop : 50,
        margin : 10,
    },
    buttonContainer : {
        flex : 1,
        marginTop : 30,
        alignItems : 'center',
        justifyContent : 'flex-end',
        marginBottom : 20
    },
    title : {
        fontWeight : 'bold',
        color : 'gray'
    }

})