import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../routes'
import { ReservationForm , Map , VehiculeList} from '../Screen/Home'

const Stack = createStackNavigator()

const VehicleNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.vehiculeList} screenOptions={{ headerShown : false}}>
        <Stack.Screen name={ROUTES.vehiculeList} component={VehiculeList}/>
        <Stack.Screen name={ROUTES.reservationForm} component={ReservationForm} options={{
          presentation : 'modal'
        }}/>
    </Stack.Navigator>
  )
}

export default VehicleNavigator

const styles = StyleSheet.create({})