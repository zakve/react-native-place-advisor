import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState()

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            return;
        }
        props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
    }, [selectedLocation])

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler })
    }, [savePickedLocationHandler])

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        })
    }

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <MapView
            region={mapRegion}
            style={styles.mapView}
            onPress={selectLocationHandler}
        >
            {
                markerCoordinates &&
                <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>
            }
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');

    return {
        headerTitle: 'Pick place',
        headerRight: <Text style={styles.headerIcon} onPress={saveFn}>Save</Text>
    }
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1
    },
    headerIcon: {
        paddingHorizontal: 20
    }
})

export default MapScreen;