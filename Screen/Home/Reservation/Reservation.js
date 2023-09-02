import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View , Pressable, SafeAreaView, Platform, StatusBar, ScrollView, TouchableOpacity  } from 'react-native'
import { Ionicons , FontAwesome } from '@expo/vector-icons'
import { style } from '../../../styles'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const Reservation = () => {
  const navigation = useNavigation()
  const [reservationData, setReservationData] = useState(null) 
  
  const fetchData = async ()=>{
    try {
      const userJSON = await AsyncStorage.getItem('user')
      const user = JSON.parse(userJSON)
        if(user){
          const response = await axios.get(`http://192.168.88.3:3000/api/reservation/${user._id}`)
          if(response.data){
            setReservationData(response.data)
          }
        }

      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchData()
  }, [])


  return (
    <SafeAreaView style={styles.safeView}>
              <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10}}>
        <Pressable onPress={()=> navigation.openDrawer()}>
          <FontAwesome name="bars" size={24} color={style.primary} />
        </Pressable>
        <Pressable>
          <Ionicons name="md-notifications-sharp" size={24} color={style.primary} />
        </Pressable>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator = {false}
      >
        {
          reservationData && (
            reservationData.map(data => {
              return (
                <TouchableOpacity key={data._id} style={styles.Container}>
                  <Text>{data.arrival}</Text>
                  <Text>{data.departure}</Text>
                  <Text>{data.passenger_number}</Text>
                  <Text>{data.totalPrice}</Text>
                </TouchableOpacity>

              )
            })
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Reservation

const styles = StyleSheet.create({
  safeView : {
    flex : 1,
    paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  Container : {
    borderWidth : 1,
    margin : 10,
    padding : 10,
    borderRadius : 10
  }
})