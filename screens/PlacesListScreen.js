import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const PlacesListScreen = props => {
    return (
        <View>
            <Text>PlacesList screen</Text>
        </View>
    )
}

PlacesListScreen.navigationOptions = {
    headerTitle: 'All places'
}

const styles = StyleSheet.create({

})

export default PlacesListScreen;