import { Platform, SafeAreaView, StyleSheet, Text, View , StatusBar, Pressable, Image, TouchableOpacity, ScrollView} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialIcons, Entypo , MaterialCommunityIcons , FontAwesome, FontAwesome5, AntDesign} from '@expo/vector-icons'
import { style } from '../../../styles'
import { Button, Snackbar } from 'react-native-paper'
import { useState } from 'react'
import { ROUTES } from '../../../routes'

const VehiculeDetails = () => {
  const [visibleSnack, setVisibleSnack] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const vehicleToRent = route.params
  const formattedDate = new Date(vehicleToRent.createdAt)
  const onDismissSnackBar = () => setVisibleSnack(false);
  const AddToFavorites = ()=>{
    setVisibleSnack(true)
  }

  const handleRent = ()=>{
    navigation.navigate(ROUTES.reservationForm , vehicleToRent)
  }

  return (
<SafeAreaView style={styles.safeView}>
    <View style={{flexDirection : 'row', justifyContent : 'space-around', padding : 10, alignItems :'center'}}>
      <Pressable onPress={()=> navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios" size={25} color={style.primary} />
      </Pressable>
      <View style={{alignItems : 'center' , justifyContent: 'center', width : '90%'}}>
      <Text style={styles.Header} >{vehicleToRent.brand} {vehicleToRent.model}</Text>
      </View>
      <TouchableOpacity onPress={AddToFavorites} >
      <AntDesign name="hearto" size={24} color={style.primary} />
      </TouchableOpacity>
    </View>
    <ScrollView 
      showsVerticalScrollIndicator = {false}
    >
    <View style={{ flex : 1 }}>
        {
          (formattedDate.getTime() + 60 * 60 * 1000 * 24 > Date.now() && (
            <Text style={{position : 'absolute' , backgroundColor :style.secondary, padding : 3 , borderRadius : 10, top : 5 , right : 5 , fontWeight : 'bold'}}>Nouveau</Text>
          ))
        }
      <Image source={{ uri : vehicleToRent.image}} style={styles.Image}/>

        <View style={{margin : 10}}>


      <View>
        <View>
        <Text style={{fontSize : 20, fontWeight : 'bold' ,}}>Description</Text>
        <View style={{ width : 75 , height : 5 , backgroundColor : style.primary , marginTop : 10 , borderBottomRightRadius : 10, marginBottom : 2}}></View>
      </View>
        <Text>{vehicleToRent.description}</Text>
        </View>
        <Text style={{fontSize : 20, fontWeight : 'bold' ,}}>Fonctionnalites</Text>
        <View style={{ width : 75 , height : 5 , backgroundColor : style.primary , marginTop : 10 , borderBottomRightRadius : 10, marginBottom : 2}}></View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="air-conditioner" size={24} color="gray" />
          <Text style={styles.cardText}>Climatiseur</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome name="gears" size={24} color="gray" />
          <Text style={styles.cardText}> Manuel</Text>
        </View>
        <View style={styles.card}>
        <MaterialCommunityIcons name="gauge-full" size={24} color="gray" />
        <Text style={styles.cardText}>10.5L / 100</Text>
        </View>
        <View style={styles.card}>
        <MaterialCommunityIcons name="seat-passenger" size={24} color="gray" />
          <Text style={styles.cardText}>{vehicleToRent.capacity}</Text>
        </View>
        <View style={styles.card}>  
        <Entypo name="gauge" size={24} color="gray" />  
          <Text style={styles.cardText}> 180km/h</Text>
        </View>
        <View style={styles.card}>
        <FontAwesome5 name="gas-pump" size={24} color="gray" /> 
          <Text style={styles.cardText}>Diesel</Text>
        </View>
      </View>

      <View>
        <Text style={{fontSize : 20, fontWeight : 'bold' ,}}>Caracteristiques</Text>
        <View style={{ width : 75 , height : 5 , backgroundColor : style.primary , marginTop : 10 , borderBottomRightRadius : 10, marginBottom : 2}}></View>
      </View>
      <View>
        <View>
        <Text><MaterialCommunityIcons name="gas-station-off" size={24} color="gray" /> : Non-inclus</Text>
        </View>
       <View>
       <Text><FontAwesome5 name="id-card-alt" size={24} color="gray" /> : Chauffeur inclus</Text>
       </View>
        <View>
        <Text><FontAwesome name="users" size={24} color="gray" /> : Convoiturage possible ( Selon le Loueur )</Text>
        </View>

      </View>
      </View>

    </View>
      </ScrollView>

      <View style={{ margin : 10, alignItems : 'center'}}>
        <Button
          style={{
            width : '90%'
          }}
          buttonColor={style.primary}
          textColor='white'
          onPress={handleRent}
        >
            <Text>Louer (Ar {vehicleToRent.price.toLocaleString()} / jour)</Text>
        </Button>
      </View>
      <Snackbar
                  visible={visibleSnack}
                  onDismiss={onDismissSnackBar}
                  duration={1000}
                  action={{
                    label: 'Masquer'
                  }}>
                  <Text style={{color : 'white'}}>{vehicleToRent.brand} {vehicleToRent.model} a ete ajoutee aux favoris</Text>
                </Snackbar>
</SafeAreaView>
  )
}

export default VehiculeDetails

const styles = StyleSheet.create({

safeView : {
  backgroundColor: 'white',
  flex : 1,
  paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0
},
Header : {
  fontWeight : 'bold',
  color : style.primary
},
Image : {
  alignItems : 'center', 
  justifyContent: 'center',
  width : '100%',
  height : 300,
  resizeMode : 'contain'
},
card : {
  alignItems : 'center',
  margin : 10,
  width : 100,
  padding : 5,
  backgroundColor : "white",
  elevation : 10,
  borderRadius : 10,
},
cardContainer : {
  flexDirection : 'row' , 
  flexWrap : 'wrap', 
  alignItems :'center', 
  justifyContent : 'space-around',
  borderRadius : 10
}
,
cardText : {
  color : "black",
  fontWeight : 'bold'
}

})