import React, { useEffect,useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from "expo-location";


const{height,width} = Dimensions.get('screen');



const initialRegion = {
  latitude: -15.5989,
  longitude: -56.0949,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function App() {

  // estado para armazenar a position 
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let{
        coords:{latitude,longitude}
      } = await Location.getCurrentPositionAsync();
      setLocation({latitude,longitude, latitudeDelta:100, longitudeDelta:100});
      
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 3,
        longitudeDelta: 3,
      })
    })();
  }, []);

  let text = 'Waiting..';

  if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }






 
  return (
    <View style={styles.container}>
      <MapView
        style={{width:width, height:height}}
        onMapReady={() => {
          Platform.OS === 'android' ? PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then(() => {
            console.log('Sucesss')
          })
          : '';
        }}
        initialRegion={region}
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000',
  }
})

