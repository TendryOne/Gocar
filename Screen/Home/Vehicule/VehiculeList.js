import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Portal, PaperProvider, Button, Searchbar , RadioButton, Modal} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../routes'
import { style } from '../../../styles'
import { MaterialIcons , MaterialCommunityIcons , AntDesign} from '@expo/vector-icons'


const VehiculeList = () => {
    const [isModalVisible, setModalVisible] = useState(true)
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation()
    const [vehicule , setVehicule] = useState([])
    const [searchQuery , SetSearchQuery] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState(false)

    // this is the head modal of the error
    const hideModal = () => {
      navigation.replace(navigation.replace(ROUTES.loginScreen))
      setVisible(false)
    };
    const containerStyle = {backgroundColor: 'white', padding: 20, margin : 50, height : 150, alignItems: 'center'};
    const [error, setError] = useState('')
    const fetchData = async (query, price)=>{

      SetSearchQuery(query)
      if(selectedFilter){
        price = ''
      }
      try {
        const token = await AsyncStorage.getItem('token')
        response = await axios.get(`http://192.168.88.3:3000/api/vehicle`, {
          params : {
            search : query,
            price : price,
          },
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
        })
        if(response.data.token){
          AsyncStorage.setItem('token', response.data.token)
          setVehicule(response.data.vehicle)
        }
          setVehicule(response.data)
      } catch (error) {
        if(error.response.status === 403){
          setError(error.response.data)
        }
         
      }
    }

    useEffect(()=>{
      fetchData()
    }, [])
    const handleFilterChange = (value) => {
      setSelectedFilter(value);
      setModalVisible(false);
    };


  return (
    <>
{ vehicule && (  
  <>
                <View style={{flexDirection : 'row', alignItems : 'center'}}>


                    <Searchbar
                    placeholder='search here'
                    iconColor={style.secondary}
                    value={searchQuery}
                    onChangeText={fetchData}
                    style={{
                      marginTop : 10,
                      backgroundColor : 'white',
                      elevation : 5,
                      width : '80%'
                    }}
                  />
                    <TouchableOpacity onPress={()=> setSelectedFilter(!selectedFilter)}>
                    <AntDesign name="filter" size={54} color={style.secondary} />
                    </TouchableOpacity>
                      </View>
                  
<ScrollView style={{flex : 1}}>

                {
                  vehicule.map(item => {
                    return (

                        <View key={item._id} style={styles.vehiculeContainer}  >
                        <Text style={{color : style.secondary, position : 'absolute', top : 5 , right : 5,}}>{item.rent? <MaterialIcons name="car-rental" size={24} color={style.secondary} /> : ''}</Text>
                          <View style={{marginRight : 10}}>
                            <Image source={{uri : item.image}} style={{width : 100, height : 100 , resizeMode : 'contain'}}/>
                          </View>
                          <View>
                          <Text style={{fontWeight : 'bold'}}>{item.brand} {item.model}</Text>
                          <Text style={{color : style.secondary}}>Ar {item.price.toLocaleString()}</Text>
                          <View style={{flexDirection : 'row', alignItems :'center'}}>
                          <MaterialCommunityIcons name="seat-passenger" size={24} color="gray" />
                          <Text>{item.capacity}</Text>
                          </View>
                          </View>                        
                        </View>
                    )
                  })
                }      
                </ScrollView>
               </> 
                )}
  


        {error && (
            <PaperProvider>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Session expire !!!</Text>
                <Button onPress={()=> navigation.replace(ROUTES.loginScreen)} >
                  <Text>Revenir sur la page de connexion</Text>
                </Button>
              </Modal>
            </Portal>
          </PaperProvider>
          )}
     </>     
  )
}

export default VehiculeList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width : '100%',
    height : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 20,
    color: 'white',
  },
  image: {
      width : 500,
      height: 500,
      borderRadius: 8,
    },
    vehiculeContainer : {
      backgroundColor: 'white',
      margin : 10,
      borderRadius : 8,
      padding : 10,
      elevation: 6, // Cela ajoute une ombre en utilisant l'élévation (fonctionne sur Android)
      flexDirection : 'row',
      alignItems : 'center'
    }
})