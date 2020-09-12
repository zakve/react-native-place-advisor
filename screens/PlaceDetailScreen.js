import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'

// Components
import MapPreview from "../components/MapPreview";

// Constants
import Colors from "../constants/Colors";

const PlaceDetailScreen = props => {
    const placeId = props.navigation.getParam('placeId');
    const selectedPlace = useSelector(state =>
        state.places.places.find(place => place.id === placeId)
    );

    return (
        <ScrollView>
            <View style={styles.form}>
                <Image
                    source={{ uri: selectedPlace.imageUri }}
                    style={styles.image}
                />
                <Text style={styles.title}>
                    {selectedPlace.title}
                </Text>
                <View style={styles.address}>
                    <Icon name='place' color={Colors.primary} />
                    <Text>{`Lat ${selectedPlace.lat}, Lng ${selectedPlace.lng}`}</Text>
                </View>
            </View>
            <MapPreview
                location={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                style={styles.mapContainer}
            />
        </ScrollView>
    )
}

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        //width: '100%',
        height: 300
    },
    form: {
        padding: 20
    },
    title: {
        fontSize: 30,
        paddingVertical: 20
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 20
    },
    address: {
        flexDirection: "row",
        alignItems: "center"
    }
})

export default PlaceDetailScreen;