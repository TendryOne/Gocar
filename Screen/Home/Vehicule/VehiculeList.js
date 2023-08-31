import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, StatusBar , FlatList, Keyboard, SafeAreaView, Platform, Pressable} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Portal, PaperProvider, Button, Searchbar , RadioButton, Modal} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../routes'
import { style } from '../../../styles'
import { MaterialIcons , MaterialCommunityIcons , AntDesign, Ionicons, FontAwesome} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import PopularVehicle from './PopularVehicle'


const VehiculeList = () => {
    const [isModalVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation()
    const [vehicule , setVehicule] = useState([])
    const [searchQuery , SetSearchQuery] = useState('')
    const [priceQuery , setPriceQuery] = useState(5000000)
    const [seatsQuery, setSeatsQuery] = useState(50)
    const [categoryQuery , setCategoryQuery] = useState('Tous')

    
    

    // this is the head modal of the error
    const hideModal = async () => {
      try {
        await AsyncStorage.clear()
        setVisible(false)  
       navigation.replace(ROUTES.loginScreen)
      } catch (error) {
          console.log(error)
      }
    };
    const containerStyle = {backgroundColor: 'white', padding: 20, margin : 50, height : 150, alignItems: 'center' };
    const [error, setError] = useState('')

    const ResetFilter = ()=>{
      setCategoryQuery('Tous')
      setSeatsQuery(50)
      setPriceQuery(5000000)
      SetSearchQuery('')
    }

    const fetchData = async ()=>{
      try {
        let response
        let token = await AsyncStorage.getItem('token')
        
        response = await axios.get(`http://192.168.88.3:3000/api/vehicle`, {
          params : {
            search : searchQuery,
            price : priceQuery  ,
            capacity : seatsQuery,
            category : categoryQuery
          },
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
        })
        if(response.data.token){
          token = response.data.token
          console.log('Nouveau Token:', token);
          await AsyncStorage.setItem('token', token)
             // utilisation du nouveau Token pour les nouvelle requetes , Bien sur dans le backend elle est configurer a 
        response = await axios.get(`http://192.168.88.3:3000/api/vehicle`, {
          params : {
            search : searchQuery,
            price : priceQuery  ,
            capacity : seatsQuery,
            category : categoryQuery
          },
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
        })



          setVehicule(response.data.vehicle)
        }
          setVehicule(response.data)
      } catch (error) {
        if(error.response.status === 403){
          console.log(error.response.data)
          setError(error.response.data)
        }
         
      }
    }

    

    useEffect(()=>{
      fetchData()
    }, [searchQuery, priceQuery, seatsQuery, categoryQuery])


    const handleReservationForm = (id)=>{
        const VehiculeToRent = vehicule.filter(vehicule => vehicule._id === id)
      navigation.navigate(ROUTES.reservationForm, VehiculeToRent)
    }


  return (
    <>

  <SafeAreaView style={!error ? styles.safeView : ""}>
    {
      !error && (
        <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10}}>
        <Pressable onPress={()=> navigation.openDrawer()}>
          <FontAwesome name="bars" size={24} color={style.primary} />
        </Pressable>
        <Pressable>
          <Ionicons name="md-notifications-sharp" size={24} color={style.primary} />
        </Pressable>
      </View>
      )
    }
   

{ (vehicule && !error) && (  
  <>

      {(searchQuery !== '' || priceQuery !== 5000000 || categoryQuery !== 'Tous' || seatsQuery !== 50) && (
                      <TouchableOpacity onPress={ResetFilter} style={{position : 'absolute' , zIndex : 1 , bottom : 30, right : 30 , backgroundColor : style.secondary , padding : 10 , borderRadius : 50}}>
                      <MaterialCommunityIcons name="filter-off" size={30} color="black"  />
                      </TouchableOpacity>
      )}
      
        
                <View style={{flexDirection : 'row', alignItems : 'center'}}>


                    <Searchbar
                    placeholder='Chercher ici ...'
                    iconColor={style.secondary}
                    value={searchQuery}
                    onChangeText={(value)=> SetSearchQuery(value)}
                    style={{
                      marginTop : 10,
                      backgroundColor : 'white',
                      elevation : 5,
                      width : '85%'
                    }}
                  />
                    <TouchableOpacity onPress={()=>{
                      setModalVisible(!isModalVisible)
                      Keyboard.dismiss()
                      } }>
                    <AntDesign name="filter" size={54} color={style.secondary} />
                    </TouchableOpacity>
                      </View>
                  
<ScrollView style={{flex : 1}}>


                    {(searchQuery == '' && priceQuery == 5000000 && categoryQuery == 'Tous' && seatsQuery == 50) && (
                      <>
                                    <View style={{marginTop : 20 , width : '100%' , height : 400}}>
                                    <ImageBackground source={{uri : 'https://digestcars.com/wp-content/uploads/2019/10/rent-a-car.jpg'}} style={{flex : 1 , alignItems :'center', justifyContent :'center'}} >
                                    <Text  style={{color : 'white' , fontWeight : 'bold' , fontSize : 35, fontStyle : 'italic'}} >Roulez avec simplicité et style</Text>
                                    </ImageBackground>
                                </View>
                               <PopularVehicle/>
                                </>
                    )}


                {
                  vehicule.map(item => {
                    return (
                      <TouchableOpacity key={item._id} activeOpacity={0.9} onPress={() => handleReservationForm(item._id)} >
                        <View style={styles.vehiculeContainer}  >
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
                        </TouchableOpacity>
                    )
                  })
                }      
                </ScrollView>
               </> 
                )}
      <Modal
        onDismiss={()=> setModalVisible(!isModalVisible)}
        visible={isModalVisible}
        style={{flex : 1, justifyContent : 'flex-end', }}
      >
        
        <View style={{backgroundColor : 'white' , height : 500, width :'auto' , borderTopLeftRadius : 40, borderTopRightRadius : 40, }}>
         
          <View style={{margin : 20}}>
          <Text style={{alignSelf : 'center', margin : 10, fontSize : 20, fontWeight : 'bold'}}>Filtre <Ionicons name="filter-sharp" size={24} color="black" /></Text>
              <View style={{width : '80%', height : 5, backgroundColor : 'gray', alignSelf : 'center', borderRadius : 20, marginBottom : 15}}></View>
              <ScrollView showsVerticalScrollIndicator={false} style={{height : 400}}>
          <Text style={{fontWeight : 'bold'}}>Filtre par prix</Text>          
          <Text>{priceQuery}</Text>
        <Slider
                        value={priceQuery}
                        maximumValue={5000000}
                        minimumValue={0}
                        step={100000}
                        onValueChange={(value)=>setPriceQuery(value) }
                        maximumTrackTintColor="gray"
                        minimumTrackTintColor={style.secondary}
                        thumbTintColor={style.secondary}
                      
                      />
            <Text style={{fontWeight : 'bold'}}>Filtre par sieges</Text>
            <Text>{seatsQuery}</Text> 
            <Slider
                        value={seatsQuery}
                        maximumValue={50}
                        minimumValue={1}
                        step={1}
                        onValueChange={(value)=>setSeatsQuery(value) }
                        maximumTrackTintColor="gray"
                        minimumTrackTintColor={style.secondary}
                        thumbTintColor={style.secondary}
                      
                      /> 
            <Text style={{fontWeight : 'bold'}}>Filtre par Vehicules</Text>   
            <View>
            <RadioButton.Group onValueChange={(value)=> setCategoryQuery(value)} value={categoryQuery}>
                    <RadioButton.Item label="Tous" value='Tous' />
                    <RadioButton.Item label="Légères" value='Légères' />
                    <RadioButton.Item label="4 x 4" value='4 x 4' />
                    <RadioButton.Item label="Minibus" value='Minibus' />
                    <RadioButton.Item label="SUV" value='SUV' />
            </RadioButton.Group>
            </View>    
            </ScrollView>   
        </View>

        </View>      
  
      </Modal>



          </SafeAreaView>
          {error && (
            <PaperProvider >
            <Portal >   
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Session expire !!!</Text>
                <Button onPress={hideModal} >
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
  safeView : {
    flex : 1, 
    paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
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
    },
})