import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet, Text, View } from 'react-native'
import { ROUTES } from '../../routes'
import {Settings, Reservation , VehiculeList , Profile} from './index'
import CustomDrawer from '../../customs/CustomDrawer'
import { AntDesign, Feather , FontAwesome5, Fontisto} from '@expo/vector-icons'
import { style } from '../../styles'
import { VehicleNavigator } from '../../Navigation'

const Drawer = createDrawerNavigator()

const Home = () => {
  return (
    <Drawer.Navigator initialRouteName={ROUTES.Vehicle} drawerContent={props => <CustomDrawer {... props} />}
      
    >
      <Drawer.Screen name={ROUTES.Vehicle} component={VehicleNavigator}
          options={{
            drawerIcon : ({focused})=> ( <AntDesign name="home" size={20} color='white' />),  
            drawerActiveTintColor : 'white',
            drawerInactiveTintColor : 'white',
            drawerActiveBackgroundColor : style.secondary,
            drawerLabel : 'Listes des vehicules',
            headerTitle :'Listes des vehicules'
                      
          }}
      />
      <Drawer.Screen name={ROUTES.reservation} component={Reservation}
      
        options={{
          drawerIcon : ({focused})=> ( <Fontisto name="map" size={20} color='white' />),
          drawerActiveTintColor : 'white',
          drawerInactiveTintColor : 'white',
          drawerActiveBackgroundColor : style.secondary,
          drawerLabel : 'Mes reservations'
                      
        }}    
      />
      <Drawer.Screen name={ROUTES.profile} component={Profile}
       options={{
        drawerIcon : ({focused})=> ( <FontAwesome5 name="user" size={24} color='white' />),
        drawerActiveTintColor : 'white',
        drawerInactiveTintColor : 'white',
        drawerActiveBackgroundColor : style.secondary,
        drawerLabel : 'Mon profil'
           
      }} 
      />
      <Drawer.Screen name={ROUTES.settings} component={Settings}
        options={{
          drawerIcon : ({focused})=> ( <Feather name="settings" size={24} color='white' />),
          drawerActiveTintColor : 'white',
          drawerInactiveTintColor : 'white',
          drawerActiveBackgroundColor : style.secondary,
          drawerLabel : 'Mes parametres'
             
        }}
      />
    </Drawer.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})