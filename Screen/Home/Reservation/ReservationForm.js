import { Image, Pressable, StyleSheet, Text, View , Platform, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native'
import React ,{useState} from 'react'
import { style } from '../../../styles'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ROUTES } from '../../../routes'
import { useForm , Controller } from 'react-hook-form'
import CustomInputs from '../../../customs/CustomInputs'
import {zodResolver} from '@hookform/resolvers/zod'
import { date, z } from 'zod'
import KeyboardAvoidWrapper from '../../../customs/KeyboardAvoidWrapper'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import  axios  from 'axios'

const ReservationForm = () => {
    const navigation = useNavigation()
    const router = useRoute()
    const vehicleToRent = router.params
    const REQUIRED = 'Ce champ est requis'
    const [error , setError] = useState(false)
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const schema = z.object({
      departure : z.string({required_error : REQUIRED}).min(1, REQUIRED),
      arrival: z.string({required_error : REQUIRED}).min(1, REQUIRED),
      passenger_number : z.string({required_error : REQUIRED}),
      day_location: z.string({required_error : REQUIRED}).min(1, REQUIRED),
      date_of_departure : z.date()
    })
  
    const { handleSubmit , control , setValue , reset} = useForm({resolver : zodResolver(schema)})
    const onSubmit =  (data)=>{
      if(vehicleToRent.capacity < data.passenger_number ){
        setError(true)
      }else{
        setError(false)
        const DateInString = data.date_of_departure.toString()
        const dataReservation = {... data , date_of_departure : DateInString  }
        navigation.navigate(ROUTES.reservationDetails, {dataReservation, vehicleToRent})
      }

    }
  
    const handleDateChange = (event, selected) => {
      setShowPicker(Platform.OS === 'ios');
      if (selected) {
        setSelectedDate(selected);
        setValue('date_of_departure', selected);
      }
    };

  return (
    <SafeAreaView style={styles.safeView}>
         <View style={{flexDirection : 'row', justifyContent : 'space-around', padding : 10, alignItems :'center'}}>
      <Pressable onPress={()=> navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios" size={25} color={style.primary} />
      </Pressable>
      <View style={{alignItems : 'center' , justifyContent: 'center', width : '90%'}}>
      <Text style={styles.Header} > Reservation du {vehicleToRent.model}</Text>
      </View>
    </View>

      <View style={styles.inputContainer}>
      <CustomInputs
          control={control}
          name="departure"
          mode="outlined"
          label="Lieu de depart"
          placeholder="Lieu de depart"
          InputIcon={<TextInput.Icon icon={() => <Entypo name="user" size={24} color="gray" />} />} 
        />
        <CustomInputs
          control={control}
          mode="outlined"
          label="Lieu d'arrivee"
          name="arrival"
          placeholder="Lieu d'arrivee"
          InputIcon={<TextInput.Icon icon={() => <Entypo name="user" size={24} color="gray" />} />} 
        />
        <CustomInputs
          control={control}
          mode="outlined"
          label="Nombre de passager"
          name="passenger_number"
          keyboardType="numeric"
          placeholder="Nombre de passager"
          InputIcon={<TextInput.Icon icon={() => <MaterialIcons name="email" size={24} color="gray" />} />} 
        />
        { error && (
                    <Text style={{marginLeft : 20, color : style.error}}>
                    La voiture ne peut contenir que {vehicleToRent.capacity} passagers
                  </Text>
        )}


                <CustomInputs
          control={control}
          mode="outlined"
          label="Nombre de jour de location"
          name="day_location"
          placeholder="Nombre de jour de location "
          keyboardType="numeric"
          InputIcon={<TextInput.Icon icon={() => <MaterialIcons name="email" size={24} color="gray" />} />} 
        />

<Controller
        control={control}
        name="date_of_departure"

        render={({ field: { onChange, onBlur, value } }) => (
          <>
            {showPicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            )}
          <TouchableOpacity style={{width : '100%' ,alignItems: 'center'}} onPress={()=> setShowPicker(true)}>
          <TextInput 
            mode='outlined'
            label="Date de depart"
            value={value? value.toLocaleDateString() : ''} 
            editable={false}
            placeholder='DD - MM - YYYY'
            style={{width : '90%',backgroundColor: 'white'}}
            left={<TextInput.Icon icon="calendar" color="gray"/>}
            outlineColor="gray"
            />
          </TouchableOpacity>
              
          </>
        )}
        />
      
      </View >
              <View style ={{width : '100%' , alignItems : 'center'}}>
              <Button buttonColor={style.primary} textColor='white' style={{marginTop : 40, marginBottom: 30 , width :'50%'}} onPress={handleSubmit(onSubmit)}>
        <Text>Reserver</Text>
      </Button>
              </View>



    
    </SafeAreaView>
  )
}

export default ReservationForm

const styles = StyleSheet.create({
    safeView : {
        backgroundColor: 'white',
        flex : 1,
        paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0
      },

})