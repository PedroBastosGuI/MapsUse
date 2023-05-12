import React, { useEffect,useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';

const{height,width} = Dimensions.get('screen');

const GOOGLE_API_KEY = 'AIzaSyA1Y62ie7t-jwcm7_KRkojSn4fiUgQoqtE';

const ecoPontoJardimTal = {latitude:-16.461715, longitude:-54.638717};
const ecoPontoJardimTal1 = {latitude:-16.461715, longitude:-54.638717};
const ecoPontoJardimTal2 = {latitude:-16.461715, longitude:-54.638717};

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};



export default function App() {

  // estado para armazenar a position 
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState();
  const[coordenadas, setCoordenadas] = useState(null);

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
      setLocation({latitude,longitude, latitudeDelta:0.0922, longitudeDelta:0.0421});
      setCoordenadas({latitude,longitude})
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    })();
  }, []);

  let text = 'Waiting..';
  if (location) {
    text = JSON.stringify(location);
  }

  //const origin = coordenadas;
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
      >
        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
        />
      </MapView>
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

