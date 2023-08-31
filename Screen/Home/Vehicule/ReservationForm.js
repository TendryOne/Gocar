import { Platform, SafeAreaView, StyleSheet, Text, View , StatusBar, Pressable, Image} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { style } from '../../../styles'

const ReservationForm = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const vehicleToRent = route.params[0]
  const formattedDate = new Date(vehicleToRent.createdAt)


  return (
<SafeAreaView style={styles.safeView}>
    <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10, alignItems :'center'}}>
      <Pressable onPress={()=> navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios" size={25} color={style.primary} />
      </Pressable>
      <View style={{alignItems : 'center' , justifyContent: 'center', width : '90%'}}>
      <Text style={styles.Header} >{vehicleToRent.brand} {vehicleToRent.model}</Text>
      </View>
    </View>

    <View style={{ flex : 1 }}>
        {
          (formattedDate.getTime() + 60 * 60 * 1000 * 24 > Date.now() && (
            <Text style={{position : 'absolute' , backgroundColor :style.secondary, padding : 3 , borderRadius : 10, top : 5 , right : 5 , fontWeight : 'bold'}}>Nouveau</Text>
          ))
        }
      <Image source={{ uri : vehicleToRent.image}} style={styles.Image}/>
      <View>
        <Text>{vehicleToRent.category}</Text>
        <Text>{vehicleToRent.capacity}</Text>
        <Text>{vehicleToRent.description}</Text>
        <Text>Ar {vehicleToRent.price.toLocaleString()}</Text>

      </View>
    </View>


</SafeAreaView>
  )
}

export default ReservationForm

const styles = StyleSheet.create({

safeView : {
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
}

})