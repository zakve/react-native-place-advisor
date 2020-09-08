import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import Config from "react-native-config";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const MapPreview = (props) => {
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    return <View>
        {
            props.location
                ?
                <MapView
                    provider={PROVIDER_GOOGLE}
                    region={mapRegion}
                    style={styles.mapView}
                />
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