import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView from 'react-native-maps';

const MapScreen = props => {
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    return (
        <MapView
            region={mapRegion}
            style={styles.mapView}
        />
    )
}

MapScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Pick place',
    }
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1
    }
})

export default MapScreen;