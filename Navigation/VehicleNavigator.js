import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../routes'
import { VehiculeDetails , Map , VehiculeList, ReservationForm} from '../Screen/Home'
import ReservationDetails from '../Screen/Home/Reservation/ReservationDetails'

const Stack = createStackNavigator()

const VehicleNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.vehiculeList} screenOptions={{ headerShown : false}}>
        <Stack.Screen name={ROUTES.vehiculeList} component={VehiculeList}/>
        <Stack.Screen name={ROUTES.VehiculeDetails} component={VehiculeDetails} options={{
          presentation : 'modal'
        }}/>
        <Stack.Screen name={ROUTES.reservationForm} component={ReservationForm} options={{
          presentation : 'modal'
        }}/>
        <Stack.Screen name={ROUTES.reservationDetails} component={ReservationDetails} options={{
          presentation : 'modal'
        }}/>
    </Stack.Navigator>
  )
}

export default VehicleNavigator

const styles = StyleSheet.create({})