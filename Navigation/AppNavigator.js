import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from '../routes';
import { Home } from '../Screen/Home';
import { Login, Register } from '../Screen/Login Screen';
import Carousel from '../Screen/carousel/Carousel';

const Stack = createStackNavigator()


const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.carousel} screenOptions={{
        headerShown : false
    }}>
        <Stack.Screen name={ROUTES.home} component={Home}/>
        <Stack.Screen name={ROUTES.carousel} component={Carousel}/>
        <Stack.Screen name={ROUTES.loginScreen} component={Login}/>
        <Stack.Screen name={ROUTES.register} component={Register}/>
    </Stack.Navigator>

  )
}

export default AppNavigator

const styles = StyleSheet.create({})