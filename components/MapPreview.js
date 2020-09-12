import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import Config from "react-native-config";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const MapPreview = (props) => {
    let mapRegion = {
        latitude: 37.32,
        longitude: -122.01,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    let markerCoordinates;

    if (props.location) {
        markerCoordinates = {
            latitude: parseInt(props.location.lat),
            longitude: parseInt(props.location.lng)
        }

        mapRegion.latitude = parseInt(props.location.lat);
        mapRegion.longitude = parseInt(props.location.lng)
    }

    return <View>
        {
            props.location
                ?
                <MapView
                    provider={PROVIDER_GOOGLE}
                    region={mapRegion}
                    style={styles.mapView}
                >
                    <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>
                </MapView>
                :
                props.children
        }
    </View>
}

const styles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: '100%'
    },
    mapView: {
        width: Dimensions.get('window').width,
        height: 300
    }
})

export default MapPreview;