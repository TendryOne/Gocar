import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, {useRef, useState} from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { style } from '../../styles'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../routes'



const List = [
    {
        id : 1,
        image : require('../../assets/adaptive-icon.png'),
        text : "Bienvenue chez KEE, votre destination de confiance pour la location de voitures exceptionnelles. Explorez notre flotte variée de véhicules modernes et confortables, prêts à vous emmener où vous le souhaitez.",
        title : 'KEE',
    },
    {
        id : 2,
        image : require('../../public/images/security.jpg'),
        text : "Votre sécurité est notre priorité absolue chez KEE. Nous prenons des mesures rigoureuses pour assurer que chaque voiture que vous louez est soigneusement entretenue et nettoyée.",
        title : "Voyages Securisé",
    },
    {
        id : 3,
        image : require('../../public/images/policy.jpg'),
        text : "Chez KEE, nous accordons une grande importance à la confidentialité de vos données personnelles. Vos informations sont traitées avec le plus grand respect et conformément aux réglementations en vigueur.",
        title : "Confidentialité",
    },
    {
        id : 4,
        image : require('../../public/images/traveller.jpg'),
        text :"Inscrivez vous sur KEE dès maintenant et ouvrez la porte à une expérience incroyablement pratique et enrichissante !",
        title : "Prêt à commencer ?"

    }

]



const CarouselScreen = () => {
    const navigation = useNavigation()
    const carouselRef = useRef(null);
    const width = useWindowDimensions().width
    const [activeSlide , setActiveSlide] = useState(0)
    const renderItem = ({item, index}) => (
        <>
        <View style={styles.slide}>
        <Image source={item?.image} style={styles.image}/>
        <Text style={{ fontSize : 30, alignSelf : index === 3 ? 'center' : 'flex-end' , marginBottom :  10, marginRight: index === 3 ? 0 : 20}}>
            <Text style={{color : style.primary , fontWeight : 'bold' , fontSize : 35}}>{item?.title[0]}</Text>{item?.title.slice(1)}
        </Text>
        
        <View style={{  marginBottom: 10 , width : index === 3 ? '40%' : 320  , height : 10 , backgroundColor : style.primary ,  alignSelf : index === 3 ? 'center' :'flex-end', borderBottomLeftRadius : 20, borderBottomRightRadius : index === 3 ? 20 : 0}}></View>
        <Text style={{alignSelf : index === 3 ? 'center' : 'flex-end' , textAlign : 'justify', width : 300, marginRight : 20}}>
            {item?.text}
        </Text>

        </View>
        {index === 3 && (
                <Button onPress={()=> {
                        navigation.replace(ROUTES.loginScreen)
                    } }
                    textColor='white'
                    style={{backgroundColor : style.primary, width : 200, alignSelf : 'center'}}
                    >
                    <Text>Commencer</Text>
                </Button>

        )}
     </>
        
    )
    

  return (
    <View style={{flex : 1 , backgroundColor : 'white'}}>

            {activeSlide !== 3 && (
            <Button onPress={()=> {
            const finalSlide = List.length
            carouselRef.current.snapToItem(finalSlide)
            setActiveSlide(finalSlide)  
            } }
            textColor='white'
            style={{backgroundColor : style.secondary, width : 20, position : 'absolute' , top : 40, right : 10, zIndex : 1}}
            >
                <Text>Skip</Text>
            </Button>

            )}




            <Carousel
            layout='default'
            ref={carouselRef}
            data={List}
            renderItem={renderItem}
            sliderWidth={400}
            itemWidth={400} 
            pagingEnabled={true}
            onSnapToItem={(index) => setActiveSlide(index)}
            />




            <Pagination
                dotsLength={List.length}
                activeDotIndex={activeSlide}
                carouselRef={carouselRef}
                dotStyle = {styles.dotStyle}
                inactiveDotScale= {0.6}

                inactiveDotOpacity={0.2}
                inactiveDotStyle={{backgroundColor : 'gray'}}

            />
     </View>
  )
}

export default CarouselScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
    width : 400,
      height: 400,
      borderRadius: 8,
    },
    dotStyle: {
        width: 30,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: style.primary,
      },
  });